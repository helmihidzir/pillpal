# frozen_string_literal: true

class MedicationLog < ApplicationRecord
  STATUSES = %w[pending taken missed].freeze

  belongs_to :medication_schedule

  validates :log_date, presence: true
  validates :status, presence: true, inclusion: {in: STATUSES}
  validates :medication_schedule_id, uniqueness: {scope: :log_date}

  def mark_taken!
    update!(status: "taken", taken_at: Time.current)
  end

  def mark_pending!
    update!(status: "pending", taken_at: nil)
  end
end
