import { Form, Head } from "@inertiajs/react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { newIdentityPasswordResetPath, signInPath, signUpPath } from "@/routes"

export default function Login() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your email and password to continue"
    >
      <Head title="Log In" />
      <Form
        method="post"
        action={signInPath()}
        resetOnSuccess={["password"]}
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[15px] font-bold text-gray-700">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="email"
                  placeholder="email@example.com"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-[15px] font-bold text-gray-700">Password</Label>
                  <TextLink
                    href={newIdentityPasswordResetPath()}
                    className="ml-auto text-[14px] text-[#B8860B] font-medium hover:underline"
                    tabIndex={5}
                  >
                    Forgot password?
                  </TextLink>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={2}
                  autoComplete="current-password"
                  placeholder="Password"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.password} />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full h-13 bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl text-[16px] font-bold"
                tabIndex={4}
                disabled={processing}
              >
                {processing && <Spinner />}
                Log In
              </Button>
            </div>

            <div className="text-center text-[15px] text-gray-500">
              Don&apos;t have an account?{" "}
              <TextLink href={signUpPath()} tabIndex={5} className="text-[#B8860B] font-bold hover:underline">
                Sign Up
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
