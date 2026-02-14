# frozen_string_literal: true

class MedicationSchedule < ApplicationRecord
  TIMES_OF_DAY = %w[morning afternoon evening].freeze

  belongs_to :medication
  has_many :medication_logs, dependent: :destroy

  validates :time_of_day, presence: true, inclusion: {in: TIMES_OF_DAY}
end
