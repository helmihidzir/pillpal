# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end

  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end

  has_many :sessions, dependent: :destroy
  has_many :medications, dependent: :destroy

  has_many :caregiver_links, class_name: "CaregiverPatient", foreign_key: :caregiver_id, dependent: :destroy
  has_many :patients, through: :caregiver_links, source: :patient

  has_many :patient_links, class_name: "CaregiverPatient", foreign_key: :patient_id, dependent: :destroy
  has_many :caregivers, through: :patient_links, source: :caregiver

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :password, allow_nil: true, length: {minimum: 6}
  validates :role, presence: true, inclusion: {in: %w[patient caregiver]}
  validates :share_code, uniqueness: true, allow_nil: true

  normalizes :email, with: -> { _1.strip.downcase }

  before_create :generate_share_code

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  def patient? = role == "patient"
  def caregiver? = role == "caregiver"

  def today_medication_logs
    MedicationLog
      .joins(medication_schedule: :medication)
      .where(medications: {user_id: id})
      .where(log_date: Date.current)
  end

  private

  def generate_share_code
    loop do
      self.share_code = SecureRandom.random_number(100_000..999_999).to_s
      break unless User.exists?(share_code: share_code)
    end
  end
end
