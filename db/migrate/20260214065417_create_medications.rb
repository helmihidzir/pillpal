# frozen_string_literal: true

class CreateMedications < ActiveRecord::Migration[8.1]
  def change
    create_table :medications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :dosage
      t.string :instructions

      t.timestamps
    end
  end
end
