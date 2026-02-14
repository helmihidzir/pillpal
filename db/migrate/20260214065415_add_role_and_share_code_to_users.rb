# frozen_string_literal: true

class AddRoleAndShareCodeToUsers < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :role, :string, default: "patient", null: false
    add_column :users, :share_code, :string
    add_index :users, :share_code, unique: true
  end
end
