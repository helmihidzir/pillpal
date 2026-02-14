import { Head, Link, usePage } from "@inertiajs/react"
import { Check, CircleCheck, Heart, Moon, Pill, Sun, Sunrise, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/layouts/app-layout"
import { newCaregiverPath } from "@/routes"
import type { Medication, PatientSummary, SharedProps } from "@/types"

interface CaregiversPageProps extends SharedProps {
  patients: PatientSummary[]
}

const TIME_CONFIG = {
  morning: { label: "Morning", icon: Sunrise },
  afternoon: { label: "Afternoon", icon: Sun },
  evening: { label: "Evening", icon: Moon },
} as const

function PatientCard({ patient }: { patient: PatientSummary }) {
  const percent =
    patient.total_medications > 0
      ? (patient.taken_medications / patient.total_medications) * 100
      : 0
  const allDone = percent === 100

  return (
    <div className={`rounded-2xl border-2 p-5 space-y-4 ${allDone ? "bg-white border-[#C4954A]/30" : "bg-white border-gray-200"}`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[18px] font-bold text-gray-900">
            {patient.name}
          </h3>
          <p className="text-[14px] text-gray-500 mt-0.5">
            {patient.taken_medications} of {patient.total_medications} taken
          </p>
        </div>
        <div
          className={`h-10 w-10 rounded-lg flex items-center justify-center ${
            allDone
              ? "bg-[#2D2926] text-white"
              : percent > 0
                ? "bg-[#C4954A]/15 text-[#B8860B]"
                : "bg-gray-100 text-gray-400"
          }`}
        >
          {allDone ? (
            <CircleCheck className="h-5 w-5" />
          ) : (
            <Pill className="h-5 w-5" />
          )}
        </div>
      </div>

      <Progress value={percent} className="h-2 rounded-full" />

      <div className="space-y-1">
        {patient.medications.flatMap((med) =>
          med.schedules.map((sched) => {
            const config =
              TIME_CONFIG[sched.time_of_day as keyof typeof TIME_CONFIG]
            const Icon = config?.icon || Sun
            const isTaken = sched.log?.status === "taken"

            return (
              <div
                key={sched.id}
                className="flex items-center gap-2.5 py-2 px-2.5 rounded-lg"
              >
                {isTaken ? (
                  <Check className="h-4 w-4 shrink-0 text-[#B8860B]" strokeWidth={3} />
                ) : (
                  <Icon className="h-4 w-4 shrink-0 text-gray-300" />
                )}
                <span
                  className={`flex-1 text-[14px] truncate ${isTaken ? "text-gray-400 line-through" : "text-gray-900 font-medium"}`}
                >
                  {med.name}
                  {med.dosage && (
                    <span className="text-gray-400 font-normal"> {med.dosage}</span>
                  )}
                </span>
                <span className={`text-[12px] shrink-0 ${isTaken ? "text-gray-300" : "text-gray-400"}`}>
                  {config?.label}
                </span>
              </div>
            )
          }),
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white border-2 border-gray-200 p-10 text-center">
      <div className="h-20 w-20 rounded-2xl bg-rose-100 flex items-center justify-center mx-auto mb-5">
        <Heart className="h-10 w-10 text-rose-500" />
      </div>
      <h3 className="text-[22px] font-bold text-gray-900 mb-2">
        No Patients Linked Yet
      </h3>
      <p className="text-[16px] text-gray-500 mb-8">
        Enter your family member's share code to start monitoring
      </p>
      <Button asChild className="bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl px-6 h-14 text-[16px] font-bold inline-flex items-center justify-center gap-2">
        <Link href={newCaregiverPath()}>
          <UserPlus className="h-5 w-5" />
          Link a Patient
        </Link>
      </Button>
    </div>
  )
}

export default function CaregiversIndex() {
  const { patients } = usePage<CaregiversPageProps>().props

  return (
    <AppLayout>
      <Head title="Caregiver Dashboard" />

      <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900">
              Your Patients
            </h1>
            <p className="text-[16px] text-gray-500 mt-1">
              Monitor medication compliance
            </p>
          </div>
          {patients.length > 0 && (
            <Button
              asChild
              variant="outline"
              className="rounded-xl h-12 px-5 text-[15px] font-bold border-2 border-gray-300 hover:bg-gray-50 hover:border-[#C4954A] inline-flex items-center justify-center gap-2"
            >
              <Link href={newCaregiverPath()}>
                <UserPlus className="h-5 w-5" />
                Link Patient
              </Link>
            </Button>
          )}
        </div>

        {patients.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
