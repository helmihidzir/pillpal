---
title: PillPal - Medication Reminder for Elderly Malaysians
type: feat
status: active
date: 2026-02-14
hackathon: Krackathon Q1 2026
prompt: "Prompt 01 - Solve One Real Malaysian Problem"
deadline: 2026-02-14 21:00 MYT
---

# PillPal - Medication Reminder & Caregiver Support

## What We're Building

A medication reminder app that helps elderly Malaysians take their medicines on time, with a caregiver dashboard so family members (children/siblings) can monitor whether their parents have taken their medication.

## The Problem

Millions of elderly Malaysians manage multiple medications daily, often prescribed from government clinics (KKM/hospital kerajaan). The reality:

- Medicine comes in plastic bags with handwritten/printed labels that are hard to read
- Complex schedules: "this one before food, that one after food, this one at night"
- Elderly patients forget doses, double-dose, or stop taking meds
- Adult children working in KL/Penang/JB can't check on parents in kampung
- No simple, accessible way for caregivers to get visibility

## Why This Approach

- **Real pain point**: Every Malaysian family with elderly parents deals with this
- **Practical utility**: Judges reward features people actually use (not gimmicks)
- **Clear community impact**: Measurable benefit for elderly healthcare compliance
- **Tech showcase**: Camera/AI scanning shows technical ambition (moonshot points)

## Key Decisions

1. **Stack**: Rails 8 + Inertia.js + React + TypeScript + Tailwind/shadcn
2. **Target users**: Elderly patients (simple UI) AND their caregivers (dashboard)
3. **Deployment**: Fresh codebase, deploy to Render/Railway for live URL
4. **AI disclosure**: Claude Code (Claude Opus) for development assistance

## MVP Features (Priority Order)

### P0 - Core Reminder System
- Add medications (name, dosage, frequency)
- Set schedules: morning / afternoon / evening / night
- Dashboard showing today's medications with "Mark as Taken" buttons
- Visual indicators: taken, missed, upcoming
- Large, accessible UI for elderly users

### P1 - Caregiver Dashboard
- Invite system: patient shares a code/link with family member
- Caregiver can see patient's medication compliance
- Visual summary: "Mak took 3/4 medications today"
- Alert/notification if medication is missed (past schedule window)

### P2 - Medicine Scan (Moonshot)
- Use phone camera to photograph medicine packaging/label
- AI extracts: medicine name, dosage, frequency
- Auto-populate the "Add Medication" form
- Supports both English and Malay medicine labels

## Target User Flows

### Flow 1: Patient Setup
1. Sign up / Sign in
2. Add medications manually OR scan medicine label
3. Set schedule for each medication
4. See today's dashboard with medication timeline
5. Tap "Taken" when they take each dose

### Flow 2: Caregiver
1. Sign up / Sign in
2. Enter patient's share code to link accounts
3. See caregiver dashboard with patient's compliance
4. Receive alerts for missed medications

### Flow 3: Medicine Scan
1. Tap "Scan Medicine" button
2. Camera opens, take photo of medicine label
3. AI processes image, extracts info
4. Review and confirm extracted details
5. Medication added to schedule

## Design Considerations

- **Large text, high contrast** - elderly-friendly UI
- **Bilingual**: English + Bahasa Melayu (at minimum, labels)
- **Mobile-first** - most Malaysians use phones
- **Simple navigation** - minimal clicks to core actions
- **Warm, trustworthy design** - not clinical/cold

## Technical Notes

- Use browser Push Notifications for reminders
- Camera access via `getUserMedia` API for medicine scanning
- AI processing: Claude API or similar for image-to-text on medicine labels
- SQLite for hackathon simplicity, easy to deploy
- Caregiver linking via unique share codes (no complex auth needed)

## Open Questions

None - scope is clear, time to execute!

## Hackathon Strategy

Given ~10 hours (11am - 9pm):
- **Hours 1-2**: Fresh Rails setup, auth, medication CRUD
- **Hours 3-4**: Reminder dashboard, today's view, mark as taken
- **Hours 5-6**: Caregiver system (linking + dashboard)
- **Hours 7-8**: Medicine scan feature (camera + AI)
- **Hours 9-10**: Polish UI, deploy, test live URL, screenshots/video
