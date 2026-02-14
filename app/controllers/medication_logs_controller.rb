# frozen_string_literal: true

class MedicationLogsController < InertiaController
  def update
    log = find_user_log
    if params[:status] == "taken"
      log.mark_taken!
    else
      log.mark_pending!
    end
    redirect_to medications_path
  end

  private

  def find_user_log
    MedicationLog
      .joins(medication_schedule: :medication)
      .where(medications: {user_id: Current.user.id})
      .find(params[:id])
  end
end
