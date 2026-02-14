# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_02_14_065421) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "caregiver_patients", force: :cascade do |t|
    t.integer "caregiver_id", null: false
    t.datetime "created_at", null: false
    t.integer "patient_id", null: false
    t.datetime "updated_at", null: false
    t.index ["caregiver_id", "patient_id"], name: "index_caregiver_patients_on_caregiver_id_and_patient_id", unique: true
    t.index ["caregiver_id"], name: "index_caregiver_patients_on_caregiver_id"
    t.index ["patient_id"], name: "index_caregiver_patients_on_patient_id"
  end

  create_table "medication_logs", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.date "log_date", null: false
    t.integer "medication_schedule_id", null: false
    t.string "status", default: "pending", null: false
    t.datetime "taken_at"
    t.datetime "updated_at", null: false
    t.index ["medication_schedule_id", "log_date"], name: "index_medication_logs_on_medication_schedule_id_and_log_date", unique: true
    t.index ["medication_schedule_id"], name: "index_medication_logs_on_medication_schedule_id"
  end

  create_table "medication_schedules", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.integer "medication_id", null: false
    t.string "time_of_day", null: false
    t.datetime "updated_at", null: false
    t.index ["medication_id"], name: "index_medication_schedules_on_medication_id"
  end

  create_table "medications", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "dosage"
    t.string "instructions"
    t.string "name", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_medications_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "ip_address"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "role", default: "patient", null: false
    t.string "share_code"
    t.datetime "updated_at", null: false
    t.boolean "verified", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["share_code"], name: "index_users_on_share_code", unique: true
  end

  add_foreign_key "caregiver_patients", "users", column: "caregiver_id"
  add_foreign_key "caregiver_patients", "users", column: "patient_id"
  add_foreign_key "medication_logs", "medication_schedules"
  add_foreign_key "medication_schedules", "medications"
  add_foreign_key "medications", "users"
  add_foreign_key "sessions", "users"
end
