import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { identityPasswordResetPath, signInPath } from "@/routes"

export default function ForgotPassword() {
  return (
    <AuthLayout
      title="Forgot Password"
      description="Enter your email to receive a password reset link"
    >
      <Head title="Forgot Password" />

      <div className="space-y-6">
        <Form method="post" action={identityPasswordResetPath()}>
          {({ processing, errors }) => (
            <>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[15px] font-bold text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  placeholder="email@example.com"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.email} />
              </div>

              <div className="my-6 flex items-center justify-start">
                <Button
                  className="w-full h-13 bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl text-[16px] font-bold"
                  disabled={processing}
                >
                  {processing && <Spinner />}
                  Send Reset Link
                </Button>
              </div>
            </>
          )}
        </Form>
        <div className="text-center text-[15px] text-gray-500">
          <span>Or, return to </span>
          <TextLink href={signInPath()} className="text-[#B8860B] font-bold hover:underline">Log In</TextLink>
        </div>
      </div>
    </AuthLayout>
  )
}
