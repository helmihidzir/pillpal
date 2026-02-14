# PillPal

Medication reminder app for Malaysian families. Helps elderly patients stay on track with their medications while keeping caregivers informed in real-time.

**Built for Krackathon Q1 2026** by KrackedDevs, Malaysia.

**Prompt:** Solve One Real Malaysian Problem — Healthcare

## Problem

Many elderly Malaysians struggle to take medications on time, especially those managing multiple prescriptions. Family caregivers — often living far from their parents — have no easy way to monitor compliance.

## Solution

PillPal provides:

- **Simple Medication Reminders** — Add medications with morning/afternoon/evening schedules. Mark as taken with one tap.
- **Caregiver Dashboard** — Caregivers link to patients via a 6-digit share code and monitor medication compliance remotely.
- **AI Medicine Scan** — Scan medicine labels with your phone camera. Gemini 2.5 extracts medication name, dosage, and instructions automatically.

## Tech Stack

- **Backend:** Ruby on Rails 8.1
- **Frontend:** React 19 + TypeScript + Inertia.js
- **UI:** shadcn/ui + Tailwind CSS v4
- **Database:** PostgreSQL
- **AI:** Gemini 2.5 Flash via ruby_llm gem
- **Deployment:** Railway

## AI Disclosure

This project uses AI in two ways:

1. **In-app:** Google Gemini 2.5 Flash for medicine label scanning (image-to-text extraction)
2. **Development:** Claude Code (Claude Opus) assisted with code generation during the hackathon

## Setup

```bash
bin/setup
bin/rails db:seed
```

Open http://localhost:3000

## Environment Variables

```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://... (production only)
```

## Demo Accounts

All seed accounts use password: `password`

### Caregiver

| Email | Role | Description |
|---|---|---|
| helmi@mail.com | Caregiver | Linked to all 5 patients below. Can view medication compliance for each patient from the caregiver dashboard. |

### Patients

| Email | Role | Medications | Pre-marked as Taken |
|---|---|---|---|
| brother@mail.com | Patient | Metformin, Amlodipine, Atorvastatin, Aspirin, Vitamin D3 | Metformin, Amlodipine |
| nenek@mail.com | Patient | Metformin, Lisinopril, Calcium + Vitamin D, Glucosamine, Simvastatin, Omeprazole | Metformin, Lisinopril, Omeprazole |
| mak@mail.com | Patient | Thyroxine, Calcium Carbonate, Vitamin B12, Iron Supplement | Thyroxine, Vitamin B12, Calcium Carbonate, Iron Supplement |
| makcik@mail.com | Patient | Metformin, Amlodipine, Atorvastatin | Amlodipine |
| pakcik@mail.com | Patient | Gliclazide, Losartan, Aspirin, Omeprazole | Gliclazide, Losartan, Omeprazole |

### Testing as a Patient

1. Log in with any patient email above (e.g. `brother@mail.com` / `password`)
2. View medication dashboard grouped by morning/afternoon/evening
3. Tap a medication card to toggle taken/pending status
4. Tap the "..." menu on a card to edit or delete a medication
5. Add a new medication manually or scan a medicine label with the camera

### Testing as a Caregiver

1. Log in as `helmi@mail.com` / `password`
2. View the caregiver dashboard showing all linked patients
3. See each patient's medication list and today's compliance progress
4. Link to a new patient using their 6-digit share code (shown on the patient's dashboard)

## License

MIT
