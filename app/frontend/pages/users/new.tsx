import { Form, Head } from "@inertiajs/react"
import { Heart, Pill } from "lucide-react"
import { useState } from "react"

import InputError from "@/components/input-error"
import TextLink from "@/components/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import AuthLayout from "@/layouts/auth-layout"
import { signInPath, signUpPath } from "@/routes"

export default function Register() {
  const [role, setRole] = useState<"patient" | "caregiver">("patient")

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />
      <Form
        method="post"
        action={signUpPath()}
        resetOnSuccess={["password", "password_confirmation"]}
        disableWhileProcessing
        className="flex flex-col gap-6"
      >
        {({ processing, errors }) => (
          <>
            <div className="grid gap-6">
              {/* Role Selection */}
              <div className="grid gap-2">
                <Label className="text-sm">I am a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      role === "patient"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <Pill
                      className={`h-6 w-6 ${role === "patient" ? "text-emerald-600" : "text-stone-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${role === "patient" ? "text-emerald-700" : "text-stone-600"}`}
                    >
                      Patient
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("caregiver")}
                    className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                      role === "caregiver"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-stone-200 hover:border-stone-300"
                    }`}
                  >
                    <Heart
                      className={`h-6 w-6 ${role === "caregiver" ? "text-emerald-600" : "text-stone-400"}`}
                    />
                    <span
                      className={`text-sm font-medium ${role === "caregiver" ? "text-emerald-700" : "text-stone-600"}`}
                    >
                      Caregiver
                    </span>
                  </button>
                </div>
                <input type="hidden" name="role" value={role} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  required
                  autoFocus
                  tabIndex={1}
                  autoComplete="name"
                  disabled={processing}
                  placeholder="Full name"
                />
                <InputError messages={errors.name} className="mt-2" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  placeholder="email@example.com"
                />
                <InputError messages={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  placeholder="Password"
                />
                <InputError messages={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation">Confirm password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  placeholder="Confirm password"
                />
                <InputError messages={errors.password_confirmation} />
              </div>

              <Button type="submit" className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700" tabIndex={5}>
                {processing && <Spinner />}
                Create account
              </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
              Already have an account?{" "}
              <TextLink href={signInPath()} tabIndex={6}>
                Log in
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
