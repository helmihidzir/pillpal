# frozen_string_literal: true

class CreateCaregiverPatients < ActiveRecord::Migration[8.1]
  def change
    create_table :caregiver_patients do |t|
      t.references :caregiver, null: false, foreign_key: {to_table: :users}
      t.references :patient, null: false, foreign_key: {to_table: :users}

      t.timestamps
    end

    add_index :caregiver_patients, [:caregiver_id, :patient_id], unique: true
  end
end
