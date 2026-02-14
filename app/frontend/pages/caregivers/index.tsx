import { Head, Link, usePage } from "@inertiajs/react"
import { Check, Heart, Moon, Pill, Sun, Sunrise, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
    <Card className="bg-white">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-stone-900">
              {patient.name}
            </h3>
            <p className="text-sm text-stone-500">
              {patient.taken_medications} of {patient.total_medications}{" "}
              medications taken
            </p>
          </div>
          <div
            className={`h-12 w-12 rounded-full flex items-center justify-center ${
              percent === 100
                ? "bg-emerald-100 text-emerald-600"
                : percent > 0
                  ? "bg-amber-100 text-amber-600"
                  : "bg-stone-100 text-stone-400"
            }`}
          >
            {percent === 100 ? (
              <Check className="h-6 w-6" />
            ) : (
              <Pill className="h-6 w-6" />
            )}
          </div>
        </div>

        <Progress value={percent} className="h-3" />

        {patient.medications.map((med) => (
          <div key={med.id} className="space-y-1">
            {med.schedules.map((sched) => {
              const config =
                TIME_CONFIG[sched.time_of_day as keyof typeof TIME_CONFIG]
              const Icon = config?.icon || Sun
              const isTaken = sched.log?.status === "taken"

              return (
                <div
                  key={sched.id}
                  className={`flex items-center gap-3 rounded-lg p-3 ${
                    isTaken ? "bg-emerald-50" : "bg-stone-50"
                  }`}
                >
                  <Icon className="h-4 w-4 text-stone-400 shrink-0" />
                  <span
                    className={`flex-1 ${isTaken ? "text-emerald-700 line-through" : "text-stone-700"}`}
                  >
                    {med.name}
                    {med.dosage && (
                      <span className="text-stone-400 ml-1">
                        ({med.dosage})
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-stone-400">
                    {config?.label}
                  </span>
                  {isTaken && (
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-stone-300">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <Heart className="h-12 w-12 text-stone-400 mb-4" />
        <h3 className="text-lg font-semibold text-stone-700 mb-2">
          No patients linked yet
        </h3>
        <p className="text-stone-500 mb-4">
          Enter your family member&apos;s share code to start monitoring their
          medications
        </p>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href={newCaregiverPath()}>
            <UserPlus className="h-5 w-5 mr-2" />
            Link a Patient
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function CaregiversIndex() {
  const { patients, auth } = usePage<CaregiversPageProps>().props

  return (
    <AppLayout>
      <Head title="Caregiver Dashboard" />

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            Caregiver Dashboard
          </h1>
          <p className="text-stone-500">
            Monitor your family&apos;s medication compliance
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
              className="w-full border-dashed border-2"
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
