import { Form, Head, Link } from "@inertiajs/react"
import { ArrowLeft, Moon, Sun, Sunrise } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AppLayout from "@/layouts/app-layout"
import { medicationsPath } from "@/routes"

const SCHEDULE_OPTIONS = [
  { value: "morning", label: "Morning", icon: Sunrise },
  { value: "afternoon", label: "Afternoon", icon: Sun },
  { value: "evening", label: "Evening", icon: Moon },
] as const

export default function NewMedication() {
  return (
    <AppLayout>
      <Head title="Add Medication" />

      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Link
            href={medicationsPath()}
            className="h-10 w-10 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-[24px] font-bold text-gray-900">
            Add Medication
          </h1>
        </div>

        <Form
          method="post"
          action={medicationsPath()}
          className="space-y-6"
        >
          {({ processing, errors }) => (
            <>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[15px] font-bold text-gray-700">
                  Medication Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoFocus
                  placeholder="e.g. Metformin"
                  className="text-[16px] h-13 rounded-xl border-2 border-gray-200 bg-white focus:border-[#B8860B] focus:ring-[#B8860B]"
                  disabled={processing}
                />
                <InputError messages={errors.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage" className="text-[15px] font-bold text-gray-700">
                  Dosage
                </Label>
                <Input
                  id="dosage"
                  name="dosage"
                  type="text"
                  placeholder="e.g. 500mg"
                  className="text-[16px] h-13 rounded-xl border-2 border-gray-200 bg-white focus:border-[#B8860B] focus:ring-[#B8860B]"
                  disabled={processing}
                />
                <InputError messages={errors.dosage} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions" className="text-[15px] font-bold text-gray-700">
                  Instructions
                </Label>
                <Input
                  id="instructions"
                  name="instructions"
                  type="text"
                  placeholder="e.g. After food"
                  className="text-[16px] h-13 rounded-xl border-2 border-gray-200 bg-white focus:border-[#B8860B] focus:ring-[#B8860B]"
                  disabled={processing}
                />
                <InputError messages={errors.instructions} />
              </div>

              <div className="space-y-3">
                <Label className="text-[15px] font-bold text-gray-700">
                  When to Take *
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {SCHEDULE_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <label
                      key={value}
                      className="flex flex-col items-center gap-2 rounded-xl border-2 border-gray-200 bg-white p-4 cursor-pointer hover:border-[#C4954A] transition-colors has-[:checked]:border-[#B8860B] has-[:checked]:bg-[#F5EFE6]"
                    >
                      <Checkbox
                        name="schedules[]"
                        value={value}
                        className="sr-only"
                      />
                      <Icon className="h-6 w-6 text-gray-400" />
                      <span className="text-[15px] font-semibold text-gray-700">{label}</span>
                    </label>
                  ))}
                </div>
                <InputError messages={errors.schedules} />
              </div>

              <Button
                type="submit"
                className="w-full h-14 text-[17px] font-bold bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl"
                disabled={processing}
              >
                {processing && <Spinner className="mr-2" />}
                Add Medication
              </Button>
            </>
          )}
        </Form>
      </div>
    </AppLayout>
  )
}
