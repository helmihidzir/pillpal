import { Head, Link, router, usePage } from "@inertiajs/react"
import {
  Camera,
  Check,
  CirclePlus,
  Copy,
  Moon,
  Pill,
  Sun,
  Sunrise,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AppLayout from "@/layouts/app-layout"
import {
  medicationLogPath,
  newMedicationPath,
  newMedicineScanPath,
} from "@/routes"
import type { Medication, SharedProps } from "@/types"

interface MedicationsPageProps extends SharedProps {
  medications: Medication[]
  share_code: string
}

const TIME_CONFIG = {
  morning: { label: "Pagi (Morning)", icon: Sunrise, order: 0 },
  afternoon: { label: "Petang (Afternoon)", icon: Sun, order: 1 },
  evening: { label: "Malam (Evening)", icon: Moon, order: 2 },
} as const

function getGreeting(name: string) {
  const hour = new Date().getHours()
  if (hour < 12) return `Selamat pagi, ${name}`
  if (hour < 18) return `Selamat petang, ${name}`
  return `Selamat malam, ${name}`
}

function MedicationCard({
  medication,
  schedule,
}: {
  medication: Medication
  schedule: Medication["schedules"][0]
}) {
  const [optimisticStatus, setOptimisticStatus] = useState(
    schedule.log?.status || "pending",
  )
  const isTaken = optimisticStatus === "taken"

  function handleToggle() {
    if (!schedule.log) return

    const newStatus = isTaken ? "pending" : "taken"
    setOptimisticStatus(newStatus)

    router.patch(
      medicationLogPath(schedule.log.id),
      { status: newStatus },
      {
        preserveScroll: true,
        onSuccess: () => {
          if (newStatus === "taken") {
            toast("Medication taken!", {
              description: `${medication.name} marked as taken`,
              action: {
                label: "Undo",
                onClick: () => {
                  setOptimisticStatus("pending")
                  router.patch(
                    medicationLogPath(schedule.log!.id),
                    { status: "pending" },
                    { preserveScroll: true },
                  )
                },
              },
            })
          }
        },
        onError: () => {
          setOptimisticStatus(isTaken ? "taken" : "pending")
        },
      },
    )
  }

  return (
    <Card
      className={`transition-all ${isTaken ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-white"}`}
    >
      <CardContent className="flex items-center gap-4 p-4">
        <div className="flex-1 min-w-0">
          <p
            className={`text-lg font-semibold ${isTaken ? "text-emerald-700 line-through" : "text-stone-900"}`}
          >
            {medication.name}
          </p>
          {medication.dosage && (
            <p className="text-sm text-stone-500">{medication.dosage}</p>
          )}
          {medication.instructions && (
            <p className="text-sm text-stone-400 italic">
              {medication.instructions}
            </p>
          )}
        </div>
        <Button
          variant={isTaken ? "default" : "outline"}
          size="lg"
          className={`shrink-0 h-14 w-14 rounded-full ${
            isTaken
              ? "bg-emerald-600 hover:bg-emerald-700"
              : "border-2 border-stone-300 hover:border-emerald-500 hover:bg-emerald-50"
          }`}
          onClick={handleToggle}
        >
          {isTaken ? (
            <Check className="h-6 w-6" />
          ) : (
            <Pill className="h-6 w-6" />
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

function ShareCodeCard({ code }: { code: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(code)
    toast("Code copied!", {
      description: "Share this code with your family caregiver",
    })
  }

  return (
    <Card className="border-emerald-200 bg-emerald-50">
      <CardContent className="p-4">
        <p className="text-sm font-medium text-emerald-700 mb-2">
          Share with Caregiver
        </p>
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-[0.3em] text-emerald-900 font-mono">
            {code}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="border-emerald-300"
          >
            <Copy className="h-4 w-4 mr-1" />
            Copy
          </Button>
        </div>
        <p className="text-xs text-emerald-600 mt-1">
          Your caregiver enters this code to monitor your medications
        </p>
      </CardContent>
    </Card>
  )
}

function EmptyState() {
  return (
    <Card className="border-dashed border-2 border-stone-300">
      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
        <Pill className="h-12 w-12 text-stone-400 mb-4" />
        <h3 className="text-lg font-semibold text-stone-700 mb-2">
          No medications yet
        </h3>
        <p className="text-stone-500 mb-4">
          Add your first medication to start tracking
        </p>
        <div className="flex gap-3">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
            <Link href={newMedicineScanPath()}>
              <Camera className="h-5 w-5 mr-2" />
              Scan Medicine
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={newMedicationPath()}>
              <CirclePlus className="h-5 w-5 mr-2" />
              Add Manually
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MedicationsIndex() {
  const { medications, share_code, auth } =
    usePage<MedicationsPageProps>().props

  const allSchedules = medications.flatMap((med) =>
    med.schedules.map((sched) => ({ medication: med, schedule: sched })),
  )
  const totalLogs = allSchedules.filter((s) => s.schedule.log).length
  const takenLogs = allSchedules.filter(
    (s) => s.schedule.log?.status === "taken",
  ).length
  const progressPercent = totalLogs > 0 ? (takenLogs / totalLogs) * 100 : 0

  const grouped = allSchedules.reduce(
    (acc, item) => {
      const time = item.schedule.time_of_day
      if (!acc[time]) acc[time] = []
      acc[time].push(item)
      return acc
    },
    {} as Record<string, typeof allSchedules>,
  )

  const sortedTimes = Object.keys(grouped).sort(
    (a, b) =>
      (TIME_CONFIG[a as keyof typeof TIME_CONFIG]?.order ?? 99) -
      (TIME_CONFIG[b as keyof typeof TIME_CONFIG]?.order ?? 99),
  )

  return (
    <AppLayout>
      <Head title="My Medications" />

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-stone-900">
            {getGreeting(auth.user.name)}
          </h1>
          <p className="text-stone-500">
            {new Date().toLocaleDateString("ms-MY", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Progress */}
        {totalLogs > 0 && (
          <Card className="bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-600">
                  Today&apos;s Progress
                </span>
                <span className="text-sm font-bold text-emerald-700">
                  {takenLogs}/{totalLogs} taken
                </span>
              </div>
              <Progress value={progressPercent} className="h-3" />
            </CardContent>
          </Card>
        )}

        {/* Share Code */}
        {share_code && <ShareCodeCard code={share_code} />}

        {/* Medications */}
        {medications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {sortedTimes.map((time) => {
              const config = TIME_CONFIG[time as keyof typeof TIME_CONFIG]
              const Icon = config?.icon || Sun
              return (
                <div key={time} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-stone-500" />
                    <h2 className="text-lg font-semibold text-stone-700">
                      {config?.label || time}
                    </h2>
                  </div>
                  {grouped[time].map(({ medication, schedule }) => (
                    <MedicationCard
                      key={schedule.id}
                      medication={medication}
                      schedule={schedule}
                    />
                  ))}
                </div>
              )
            })}

            <div className="pt-4 flex gap-3">
              <Button
                asChild
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href={newMedicineScanPath()}>
                  <Camera className="h-5 w-5 mr-2" />
                  Scan Medicine
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1"
              >
                <Link href={newMedicationPath()}>
                  <CirclePlus className="h-5 w-5 mr-2" />
                  Add Manually
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  )
}
