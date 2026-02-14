import type { LucideIcon } from "lucide-react"

export interface Auth {
  user: User
  session: Pick<Session, "id">
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon | null
  isActive?: boolean
}

export interface FlashData {
  alert?: string
  notice?: string
}

export interface SharedProps {
  auth: Auth
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  verified: boolean
  role: "patient" | "caregiver"
  share_code: string
  created_at: string
  updated_at: string
  [key: string]: unknown
}

export interface MedicationLog {
  id: number
  status: "pending" | "taken" | "missed"
  taken_at: string | null
}

export interface MedicationSchedule {
  id: number
  time_of_day: "morning" | "afternoon" | "evening"
  log: MedicationLog | null
}

export interface Medication {
  id: number
  name: string
  dosage: string | null
  instructions: string | null
  schedules: MedicationSchedule[]
}

export interface PatientSummary {
  id: number
  name: string
  total_medications: number
  taken_medications: number
  medications: Medication[]
}

export interface Session {
  id: string
  user_agent: string
  ip_address: string
  created_at: string
}
