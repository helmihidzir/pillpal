# frozen_string_literal: true

class MedicationsController < InertiaController
  def index
    ensure_today_logs!
    medications = load_today_medications
    render inertia: {medications: medications, share_code: Current.user.share_code}
  end

  def new
  end

  def create
    medication = Current.user.medications.build(medication_params.except(:schedules))
    schedules = medication_params[:schedules] || []

    if schedules.empty?
      redirect_to new_medication_path, inertia: {errors: {schedules: "Please select at least one time"}}
      return
    end

    Medication.transaction do
      medication.save!
      schedules.each { |time| medication.medication_schedules.create!(time_of_day: time) }
      medication.ensure_today_logs!
    end

    redirect_to medications_path, notice: "Medication added successfully"
  rescue ActiveRecord::RecordInvalid
    redirect_to new_medication_path, inertia: {errors: medication.errors}
  end

  def edit
    medication = Current.user.medications.includes(:medication_schedules).find(params[:id])
    render inertia: {
      medication: {
        id: medication.id,
        name: medication.name,
        dosage: medication.dosage,
        instructions: medication.instructions,
        schedules: medication.medication_schedules.map(&:time_of_day)
      }
    }
  end

  def update
    medication = Current.user.medications.find(params[:id])
    schedules = medication_params[:schedules] || []

    if schedules.empty?
      redirect_to edit_medication_path(medication), inertia: {errors: {schedules: "Please select at least one time"}}
      return
    end

    Medication.transaction do
      medication.update!(medication_params.except(:schedules))
      medication.medication_schedules.where.not(time_of_day: schedules).destroy_all
      schedules.each do |time|
        medication.medication_schedules.find_or_create_by!(time_of_day: time)
      end
      medication.ensure_today_logs!
    end

    redirect_to medications_path, notice: "Medication updated successfully"
  rescue ActiveRecord::RecordInvalid
    redirect_to edit_medication_path(medication), inertia: {errors: medication.errors}
  end

  def destroy
    medication = Current.user.medications.find(params[:id])
    medication.destroy!
    redirect_to medications_path, notice: "Medication removed"
  end

  private

  def medication_params
    params.permit(:name, :dosage, :instructions, schedules: [])
  end

  def ensure_today_logs!
    Current.user.medications.includes(:medication_schedules).each(&:ensure_today_logs!)
  end

  def load_today_medications
    Current.user.medications
      .includes(medication_schedules: :medication_logs)
      .map { |med| serialize_medication(med) }
  end

  def serialize_medication(med)
    {
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      instructions: med.instructions,
      schedules: med.medication_schedules.map { |sched|
        log = sched.medication_logs.find { |l| l.log_date == Date.current }
        {
          id: sched.id,
          time_of_day: sched.time_of_day,
          log: log ? {id: log.id, status: log.status, taken_at: log.taken_at} : nil
        }
      }
    }
  end
end
