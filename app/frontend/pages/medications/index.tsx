import { Head, Link, router, usePage } from "@inertiajs/react"
import {
  Camera,
  Check,
  CircleCheck,
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
  morning: { label: "Morning", icon: Sunrise, order: 0 },
  afternoon: { label: "Afternoon", icon: Sun, order: 1 },
  evening: { label: "Evening", icon: Moon, order: 2 },
} as const

function getCurrentTimeOfDay() {
  const hour = new Date().getHours()
  if (hour < 12) return "morning"
  if (hour < 18) return "afternoon"
  return "evening"
}

function getGreeting(name: string) {
  const firstName = name.split(" ")[0]
  const time = getCurrentTimeOfDay()
  if (time === "morning") return `Good Morning, ${firstName}!`
  if (time === "afternoon") return `Good Afternoon, ${firstName}!`
  return `Good Evening, ${firstName}!`
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
            toast("Marked as taken!", {
              description: medication.name,
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
    <button
      onClick={handleToggle}
      className={`w-full flex items-center gap-4 rounded-2xl p-5 transition-all text-left ${
        isTaken
          ? "bg-[#F5EFE6] border-2 border-[#C4954A]"
          : "bg-white border-2 border-gray-200 hover:border-[#C4954A] active:scale-[0.98]"
      }`}
    >
      <div
        className={`shrink-0 h-14 w-14 rounded-xl flex items-center justify-center ${
          isTaken
            ? "bg-[#2D2926] text-white"
            : "bg-gray-100 text-gray-400"
        }`}
      >
        {isTaken ? (
          <Check className="h-7 w-7" strokeWidth={3} />
        ) : (
          <Pill className="h-7 w-7" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-[18px] font-bold ${isTaken ? "text-[#2D2926] line-through" : "text-gray-900"}`}>
          {medication.name}
        </p>
        {medication.dosage && (
          <p className={`text-[15px] mt-0.5 ${isTaken ? "text-[#B8860B]" : "text-gray-500"}`}>
            {medication.dosage}
          </p>
        )}
        {medication.instructions && (
          <p className={`text-[14px] mt-0.5 ${isTaken ? "text-[#B8860B]" : "text-gray-400"}`}>
            {medication.instructions}
          </p>
        )}
      </div>
      {isTaken && (
        <span className="text-[13px] font-bold text-[#B8860B] uppercase tracking-wide">
          Done
        </span>
      )}
    </button>
  )
}

function ShareCodeBadge({ code }: { code: string }) {
  function handleCopy() {
    navigator.clipboard.writeText(code)
    toast("Code copied!", {
      description: "Share this with your caregiver",
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-xl bg-white border border-gray-200 px-3.5 py-2 hover:bg-gray-50 active:scale-[0.97] transition-all"
      title="Click to copy share code"
    >
      <span className="text-[13px] text-gray-500">Share Code</span>
      <span className="text-[14px] font-bold font-mono tracking-wider text-gray-900">{code}</span>
      <Copy className="h-3.5 w-3.5 text-gray-400" />
    </button>
  )
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white border-2 border-gray-200 p-10 text-center">
      <div className="h-20 w-20 rounded-2xl bg-[#C4954A]/15 flex items-center justify-center mx-auto mb-5">
        <Pill className="h-10 w-10 text-[#B8860B]" />
      </div>
      <h3 className="text-[22px] font-bold text-gray-900 mb-2">
        No Medications Yet
      </h3>
      <p className="text-[16px] text-gray-500 mb-8">
        Add your first medication to start tracking
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild className="bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl px-6 h-14 text-[16px] font-bold inline-flex items-center justify-center gap-2">
          <Link href={newMedicineScanPath()}>
            <Camera className="h-5 w-5" />
            Scan Medicine
          </Link>
        </Button>
        <Button asChild variant="outline" className="rounded-xl px-6 h-14 text-[16px] font-bold border-2 border-gray-300 hover:bg-gray-50 inline-flex items-center justify-center gap-2">
          <Link href={newMedicationPath()}>
            <CirclePlus className="h-5 w-5" />
            Add Manually
          </Link>
        </Button>
      </div>
    </div>
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

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        {/* Greeting */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-[28px] md:text-[32px] font-bold text-gray-900">
              {getGreeting(auth.user.name)}
            </h1>
            {share_code && <ShareCodeBadge code={share_code} />}
          </div>
          <p className="text-[16px] text-gray-500 mt-1">
            {new Date().toLocaleDateString("en-MY", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Progress */}
        {totalLogs > 0 && (
          <div className="rounded-2xl bg-white border-2 border-gray-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-bold text-gray-600">
                Today's Progress
              </span>
              <span className="text-[18px] font-bold text-gray-900">
                {takenLogs} / {totalLogs}
              </span>
            </div>
            <Progress value={progressPercent} className="h-3 rounded-full" />
            {progressPercent === 100 && (
              <div className="flex items-center gap-2 mt-3 text-[#B8860B]">
                <CircleCheck className="h-5 w-5" />
                <span className="text-[15px] font-bold">All done for today!</span>
              </div>
            )}
          </div>
        )}

        {/* Medications */}
        {medications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {sortedTimes.map((time) => {
              const config = TIME_CONFIG[time as keyof typeof TIME_CONFIG]
              const Icon = config?.icon || Sun
              const isCurrent = time === getCurrentTimeOfDay()
              return (
                <div
                  key={time}
                  className={`space-y-3 rounded-2xl p-4 -mx-4 transition-colors ${
                    isCurrent
                      ? "bg-white border-2 border-[#C4954A]/30"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-2.5 px-1">
                    <Icon className={`h-5 w-5 ${isCurrent ? "text-[#B8860B]" : "text-gray-400"}`} />
                    <h2 className={`text-[16px] font-bold ${isCurrent ? "text-[#B8860B]" : "text-gray-500"}`}>
                      {config?.label || time}
                      {isCurrent && <span className="ml-2 text-[12px] font-medium text-[#C4954A]">Now</span>}
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

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                className="flex-1 bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl h-14 text-[16px] font-bold inline-flex items-center justify-center gap-2"
              >
                <Link href={newMedicineScanPath()}>
                  <Camera className="h-5 w-5" />
                  Scan Medicine
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 rounded-xl h-14 text-[16px] font-bold border-2 border-gray-300 hover:bg-gray-50 inline-flex items-center justify-center gap-2"
              >
                <Link href={newMedicationPath()}>
                  <CirclePlus className="h-5 w-5" />
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
