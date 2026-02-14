# frozen_string_literal: true

class CaregiverPatient < ApplicationRecord
  belongs_to :caregiver, class_name: "User"
  belongs_to :patient, class_name: "User"

  validates :caregiver_id, uniqueness: {scope: :patient_id}
  validate :cannot_link_to_self

  private

  def cannot_link_to_self
    errors.add(:patient, "cannot be yourself") if caregiver_id == patient_id
  end
end
