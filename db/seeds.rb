# frozen_string_literal: true

puts "Seeding PillPal demo data..."

# Helper to create a user with medications and today's logs
def create_patient_with_meds(name:, email:, medications:, taken: [])
  user = User.find_or_create_by(email: email) do |u|
    u.name = name
    u.password = "password123"
    u.role = "patient"
  end

  medications.each do |med_data|
    med = Medication.find_or_create_by(user_id: user.id, name: med_data[:name]) do |m|
      m.dosage = med_data[:dosage]
      m.instructions = med_data[:instructions]
    end

    med_data[:times].each do |time|
      sched = MedicationSchedule.find_or_create_by(medication_id: med.id, time_of_day: time)
      status = taken.include?(med_data[:name]) ? "taken" : "pending"
      MedicationLog.find_or_create_by(medication_schedule_id: sched.id, log_date: Date.today) do |l|
        l.status = status
        l.taken_at = Time.current if status == "taken"
      end
    end
  end

  puts "  Patient: #{user.name} (#{user.email}) — #{medications.size} medications"
  user
end

# === Users ===

# Helmi — Caregiver (already exists in production)
helmi_caregiver = User.find_by(email: "helmi@mail.com")
unless helmi_caregiver
  helmi_caregiver = User.create(
    name: "Helmi", email: "helmi@mail.com",
    password: "password123", role: "caregiver"
  )
end
puts "  Caregiver: #{helmi_caregiver.name} (#{helmi_caregiver.email})"

# Helmi — Patient
helmi_patient = create_patient_with_meds(
  name: "Helmi", email: "helmi.patient@mail.com",
  medications: [
    { name: "Vitamin C", dosage: "1000mg", instructions: "After breakfast", times: ["morning"] },
    { name: "Fish Oil", dosage: "1000mg", instructions: "With food", times: ["morning", "evening"] },
    { name: "Cetirizine", dosage: "10mg", instructions: "Before bed", times: ["evening"] },
  ]
)

# Brother
brother = create_patient_with_meds(
  name: "Brother", email: "brother@mail.com",
  medications: [
    { name: "Metformin", dosage: "500mg", instructions: "After food", times: ["morning"] },
    { name: "Amlodipine", dosage: "5mg", instructions: "Before breakfast", times: ["morning"] },
    { name: "Atorvastatin", dosage: "20mg", instructions: "Before bed", times: ["evening"] },
    { name: "Aspirin", dosage: "100mg", instructions: "After lunch", times: ["afternoon"] },
    { name: "Vitamin D3", dosage: "1000 IU", instructions: "With food", times: ["morning"] },
  ],
  taken: ["Metformin", "Amlodipine"]
)

# Nenek
nenek = create_patient_with_meds(
  name: "Nenek", email: "nenek@mail.com",
  medications: [
    { name: "Metformin", dosage: "500mg", instructions: "After food", times: ["morning", "evening"] },
    { name: "Lisinopril", dosage: "10mg", instructions: "Morning on empty stomach", times: ["morning"] },
    { name: "Calcium + Vitamin D", dosage: "600mg", instructions: "After lunch", times: ["afternoon"] },
    { name: "Glucosamine", dosage: "1500mg", instructions: "With food", times: ["morning"] },
    { name: "Simvastatin", dosage: "20mg", instructions: "Before bed", times: ["evening"] },
    { name: "Omeprazole", dosage: "20mg", instructions: "Before breakfast", times: ["morning"] },
  ],
  taken: ["Metformin", "Lisinopril", "Omeprazole"]
)

# Atuk
atuk = create_patient_with_meds(
  name: "Atuk", email: "atuk@mail.com",
  medications: [
    { name: "Warfarin", dosage: "5mg", instructions: "Same time daily", times: ["evening"] },
    { name: "Losartan", dosage: "50mg", instructions: "Morning before food", times: ["morning"] },
    { name: "Paracetamol", dosage: "500mg", instructions: "When needed, max 4x daily", times: ["morning", "evening"] },
  ],
  taken: ["Losartan"]
)

# Mak
mak = create_patient_with_meds(
  name: "Mak", email: "mak@mail.com",
  medications: [
    { name: "Thyroxine", dosage: "50mcg", instructions: "Empty stomach, 30min before food", times: ["morning"] },
    { name: "Calcium Carbonate", dosage: "500mg", instructions: "After meals", times: ["morning", "afternoon"] },
    { name: "Vitamin B12", dosage: "1000mcg", instructions: "With breakfast", times: ["morning"] },
    { name: "Iron Supplement", dosage: "200mg", instructions: "With orange juice", times: ["afternoon"] },
  ],
  taken: ["Thyroxine", "Vitamin B12", "Calcium Carbonate", "Iron Supplement"]
)

# Ayah
ayah = create_patient_with_meds(
  name: "Ayah", email: "ayah@mail.com",
  medications: [
    { name: "Gliclazide", dosage: "80mg", instructions: "Before meals", times: ["morning", "evening"] },
    { name: "Metformin", dosage: "850mg", instructions: "After food", times: ["morning", "afternoon", "evening"] },
    { name: "Perindopril", dosage: "4mg", instructions: "Morning on empty stomach", times: ["morning"] },
  ],
  taken: ["Gliclazide", "Perindopril"]
)

# Tok Wan
tok_wan = create_patient_with_meds(
  name: "Tok Wan", email: "tokwan@mail.com",
  medications: [
    { name: "Donepezil", dosage: "10mg", instructions: "Before bed", times: ["evening"] },
    { name: "Memantine", dosage: "10mg", instructions: "With or without food", times: ["morning"] },
    { name: "Amlodipine", dosage: "10mg", instructions: "Once daily", times: ["morning"] },
    { name: "Aspirin", dosage: "150mg", instructions: "After food", times: ["afternoon"] },
    { name: "Omeprazole", dosage: "20mg", instructions: "Before breakfast", times: ["morning"] },
  ]
)

# === Caregiver Links ===
puts "\nLinking patients to caregiver..."
[brother, nenek, atuk, mak, ayah, tok_wan, helmi_patient].each do |patient|
  CaregiverPatient.find_or_create_by(caregiver_id: helmi_caregiver.id, patient_id: patient.id)
  puts "  #{helmi_caregiver.name} (caregiver) -> #{patient.name} (patient)"
end

# === Summary ===
puts "\n=== Seed Summary ==="
puts "Users: #{User.count}"
puts "Medications: #{Medication.count}"
puts "Schedules: #{MedicationSchedule.count}"
puts "Today's Logs: #{MedicationLog.where(log_date: Date.today).count}"
puts "Caregiver Links: #{CaregiverPatient.count}"
puts "\nDone!"
