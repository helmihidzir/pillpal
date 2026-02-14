# frozen_string_literal: true

class Medication < ApplicationRecord
  belongs_to :user
  has_many :medication_schedules, dependent: :destroy
  has_many :medication_logs, through: :medication_schedules

  validates :name, presence: true

  accepts_nested_attributes_for :medication_schedules, allow_destroy: true

  def ensure_today_logs!
    medication_schedules.each do |schedule|
      schedule.medication_logs.find_or_create_by!(log_date: Date.current)
    end
  end
end
