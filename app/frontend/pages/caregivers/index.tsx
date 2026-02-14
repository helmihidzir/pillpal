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
  morning: { label: "Pagi", icon: Sunrise },
  afternoon: { label: "Petang", icon: Sun },
  evening: { label: "Malam", icon: Moon },
} as const

function PatientCard({ patient }: { patient: PatientSummary }) {
  const percent =
    patient.total_medications > 0
      ? (patient.taken_medications / patient.total_medications) * 100
      : 0

  return (
    <div className="rounded-2xl bg-white border-2 border-gray-200 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[20px] font-bold text-gray-900">
            {patient.name}
          </h3>
          <p className="text-[15px] text-gray-500 mt-0.5">
            {patient.taken_medications} of {patient.total_medications} taken
          </p>
        </div>
        <div
          className={`h-12 w-12 rounded-xl flex items-center justify-center ${
            percent === 100
              ? "bg-[#2D2926] text-white"
              : percent > 0
                ? "bg-amber-100 text-amber-600"
                : "bg-gray-100 text-gray-400"
          }`}
        >
          {percent === 100 ? (
            <CircleCheck className="h-6 w-6" />
          ) : (
            <Pill className="h-6 w-6" />
          )}
        </div>
      </div>

      <Progress value={percent} className="h-3 rounded-full" />

      {patient.medications.map((med) => (
        <div key={med.id} className="space-y-2">
          {med.schedules.map((sched) => {
            const config =
              TIME_CONFIG[sched.time_of_day as keyof typeof TIME_CONFIG]
            const Icon = config?.icon || Sun
            const isTaken = sched.log?.status === "taken"

            return (
              <div
                key={sched.id}
                className={`flex items-center gap-3 rounded-xl p-4 ${
                  isTaken ? "bg-[#F5EFE6] border border-[#D4C4A8]" : "bg-gray-50 border border-gray-200"
                }`}
              >
                <Icon className={`h-5 w-5 shrink-0 ${isTaken ? "text-[#B8860B]" : "text-gray-400"}`} />
                <span
                  className={`flex-1 text-[16px] font-medium ${isTaken ? "text-[#2D2926] line-through" : "text-gray-900"}`}
                >
                  {med.name}
                  {med.dosage && (
                    <span className={`ml-1.5 font-normal ${isTaken ? "text-[#B8860B]" : "text-gray-400"}`}>
                      ({med.dosage})
                    </span>
                  )}
                </span>
                <span className={`text-[13px] font-bold ${isTaken ? "text-[#B8860B]" : "text-gray-400"}`}>
                  {config?.label}
                </span>
                {isTaken && (
                  <Check className="h-5 w-5 shrink-0 text-[#B8860B]" strokeWidth={3} />
                )}
              </div>
            )
          })}
        </div>
      ))}
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
      <Button asChild className="bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl px-6 h-14 text-[16px] font-bold">
        <Link href={newCaregiverPath()}>
          <UserPlus className="h-5 w-5 mr-2" />
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

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900">
            Your Patients
          </h1>
          <p className="text-[16px] text-gray-500 mt-1">
            Monitor medication compliance
          </p>
        </div>

        {patients.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}

            <Button
              asChild
              variant="outline"
              className="w-full rounded-xl h-14 text-[16px] font-bold border-2 border-dashed border-gray-300 hover:bg-gray-50 hover:border-[#C4954A]"
            >
              <Link href={newCaregiverPath()}>
                <UserPlus className="h-5 w-5 mr-2" />
                Link Another Patient
              </Link>
            </Button>
          </>
        )}
      </div>
    </AppLayout>
  )
}
