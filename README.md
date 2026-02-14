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
```

Open http://localhost:3000

## Environment Variables

```
GEMINI_API_KEY=your_gemini_api_key
DATABASE_URL=postgresql://... (production only)
```

## License

MIT
