# frozen_string_literal: true

class CreateMedicationLogs < ActiveRecord::Migration[8.1]
  def change
    create_table :medication_logs do |t|
      t.references :medication_schedule, null: false, foreign_key: true
      t.date :log_date, null: false
      t.string :status, default: "pending", null: false
      t.datetime :taken_at

      t.timestamps
    end

    add_index :medication_logs, [:medication_schedule_id, :log_date], unique: true
  end
end
