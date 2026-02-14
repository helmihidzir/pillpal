import { Form, Head, Link } from "@inertiajs/react"
import { ArrowLeft, Moon, Sun, Sunrise } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AppLayout from "@/layouts/app-layout"
import { medicationsPath } from "@/routes"

const SCHEDULE_OPTIONS = [
  { value: "morning", label: "Pagi (Morning)", icon: Sunrise },
  { value: "afternoon", label: "Petang (Afternoon)", icon: Sun },
  { value: "evening", label: "Malam (Evening)", icon: Moon },
] as const

export default function NewMedication() {
  return (
    <AppLayout>
      <Head title="Add Medication" />

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={medicationsPath()}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-stone-900">
            Add Medication
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <Form
              method="post"
              action={medicationsPath()}
              className="space-y-6"
            >
              {({ processing, errors }) => (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-base">
                      Medication Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoFocus
                      placeholder="e.g. Metformin"
                      className="text-lg h-12"
                      disabled={processing}
                    />
                    <InputError messages={errors.name} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dosage" className="text-base">
                      Dosage
                    </Label>
                    <Input
                      id="dosage"
                      name="dosage"
                      type="text"
                      placeholder="e.g. 500mg"
                      className="text-lg h-12"
                      disabled={processing}
                    />
                    <InputError messages={errors.dosage} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions" className="text-base">
                      Instructions
                    </Label>
                    <Input
                      id="instructions"
                      name="instructions"
                      type="text"
                      placeholder="e.g. After food"
                      className="text-lg h-12"
                      disabled={processing}
                    />
                    <InputError messages={errors.instructions} />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base">
                      When to take *
                    </Label>
                    <div className="grid gap-3">
                      {SCHEDULE_OPTIONS.map(({ value, label, icon: Icon }) => (
                        <label
                          key={value}
                          className="flex items-center gap-3 rounded-lg border-2 border-stone-200 p-4 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-colors has-[:checked]:border-emerald-500 has-[:checked]:bg-emerald-50"
                        >
                          <Checkbox
                            name="schedules[]"
                            value={value}
                            className="h-5 w-5"
                          />
                          <Icon className="h-5 w-5 text-stone-500" />
                          <span className="text-base font-medium">
                            {label}
                          </span>
                        </label>
                      ))}
                    </div>
                    <InputError messages={errors.schedules} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700"
                    disabled={processing}
                  >
                    {processing && <Spinner className="mr-2" />}
                    Add Medication
                  </Button>
                </>
              )}
            </Form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
