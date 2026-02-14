import { Form, Head, Link } from "@inertiajs/react"
import { ArrowLeft, UserPlus } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AppLayout from "@/layouts/app-layout"
import { caregiversPath } from "@/routes"

export default function NewCaregiver() {
  return (
    <AppLayout>
      <Head title="Link a Patient" />

      <div className="mx-auto max-w-2xl px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href={caregiversPath()}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-stone-900">
            Link a Patient
          </h1>
        </div>

        <Card>
          <CardContent className="p-6">
            <p className="text-stone-500 mb-6">
              Ask your family member for their 6-digit share code. You can find
              it on their medication dashboard.
            </p>

            <Form
              method="post"
              action={caregiversPath()}
              className="space-y-6"
            >
              {({ processing, errors }) => (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="share_code" className="text-base">
                      Share Code
                    </Label>
                    <Input
                      id="share_code"
                      name="share_code"
                      type="text"
                      required
                      autoFocus
                      placeholder="Enter 6-digit code"
                      className="text-2xl h-14 text-center tracking-[0.3em] font-mono"
                      maxLength={6}
                      disabled={processing}
                    />
                    <InputError messages={errors.share_code} />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base bg-emerald-600 hover:bg-emerald-700"
                    disabled={processing}
                  >
                    {processing && <Spinner className="mr-2" />}
                    <UserPlus className="h-5 w-5 mr-2" />
                    Link Patient
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
