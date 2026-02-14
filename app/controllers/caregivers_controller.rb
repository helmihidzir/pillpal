# frozen_string_literal: true

class CaregiversController < InertiaController
  def index
    patients_data = Current.user.patients.map { |patient| serialize_patient(patient) }
    render inertia: {patients: patients_data}
  end

  def new
  end

  def create
    patient = User.find_by(share_code: params[:share_code], role: "patient")

    if patient.nil?
      redirect_to new_caregiver_path, inertia: {errors: {share_code: "Code not found. Please check with your family member."}}
    elsif patient.id == Current.user.id
      redirect_to new_caregiver_path, inertia: {errors: {share_code: "You cannot link to yourself"}}
    elsif Current.user.patients.include?(patient)
      redirect_to new_caregiver_path, inertia: {errors: {share_code: "You are already linked to this patient"}}
    else
      Current.user.caregiver_links.create!(patient: patient)
      redirect_to caregivers_path, notice: "Successfully linked to #{patient.name}"
    end
  end

  private

  def serialize_patient(patient)
    today_logs = patient.today_medication_logs
    total = today_logs.count
    taken = today_logs.where(status: "taken").count

    {
      id: patient.id,
      name: patient.name,
      total_medications: total,
      taken_medications: taken,
      medications: patient.medications
        .includes(medication_schedules: :medication_logs)
        .map { |med| serialize_medication(med) }
    }
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
