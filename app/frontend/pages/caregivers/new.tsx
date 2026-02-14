import { Form, Head, Link } from "@inertiajs/react"
import { ArrowLeft, UserPlus } from "lucide-react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AppLayout from "@/layouts/app-layout"
import { caregiversPath } from "@/routes"

export default function NewCaregiver() {
  return (
    <AppLayout>
      <Head title="Link a Patient" />

      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href={caregiversPath()}
            className="h-12 w-12 rounded-xl bg-white border-2 border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-[24px] font-bold text-gray-900">
            Link a Patient
          </h1>
        </div>

        <div className="rounded-2xl bg-white border-2 border-gray-200 p-6 md:p-8">
          <p className="text-[16px] text-gray-600 mb-6">
            Ask your family member for their 6-digit share code.
            You can find it on their medication dashboard.
          </p>

          <Form
            method="post"
            action={caregiversPath()}
            className="space-y-6"
          >
            {({ processing, errors }) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor="share_code" className="text-[15px] font-bold text-gray-700">
                    Share Code
                  </Label>
                  <Input
                    id="share_code"
                    name="share_code"
                    type="text"
                    required
                    autoFocus
                    placeholder="ABC123"
                    className="text-[28px] h-20 text-center tracking-[0.3em] font-mono font-bold rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                    maxLength={6}
                    disabled={processing}
                  />
                  <InputError messages={errors.share_code} />
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-[17px] font-bold bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl"
                  disabled={processing}
                >
                  {processing && <Spinner className="mr-2" />}
                  <UserPlus className="h-5 w-5 mr-2" />
                  Link Patient
                </Button>
              </>
            )}
          </Form>
        </div>
      </div>
    </AppLayout>
  )
}
