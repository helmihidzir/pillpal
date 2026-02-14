import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { identityPasswordResetPath } from "@/routes"

interface ResetPasswordProps {
  sid: string
  email: string
}

export default function ResetPassword({ sid, email }: ResetPasswordProps) {
  return (
    <AuthLayout
      title="Reset Password"
      description="Enter your new password below"
    >
      <Head title="Reset Password" />
      <Form
        method="put"
        action={identityPasswordResetPath()}
        transform={(data) => ({ ...data, sid, email })}
        resetOnSuccess={["password", "password_confirmation"]}
      >
        {({ processing, errors }) => (
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[15px] font-bold text-gray-700">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                className="h-13 text-[16px] rounded-xl border-2 border-gray-200 bg-gray-100 text-gray-500"
                readOnly
              />
              <InputError messages={errors.email} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-[15px] font-bold text-gray-700">New Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                autoFocus
                placeholder="New password"
              />
              <InputError messages={errors.password} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password_confirmation" className="text-[15px] font-bold text-gray-700">Confirm Password</Label>
              <Input
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                autoComplete="new-password"
                className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                placeholder="Confirm password"
              />
              <InputError messages={errors.password_confirmation} />
            </div>

            <Button
              type="submit"
              className="mt-2 w-full h-13 bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl text-[16px] font-bold"
              disabled={processing}
            >
              {processing && <Spinner />}
              Reset Password
            </Button>
          </div>
        )}
      </Form>
    </AuthLayout>
  )
}
