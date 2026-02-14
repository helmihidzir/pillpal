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
      title="Create an Account"
      description="Enter your details below to get started"
    >
      <Head title="Sign Up" />
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
                <Label className="text-[15px] font-bold text-gray-700">I am a...</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("patient")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
                      role === "patient"
                        ? "border-[#B8860B] bg-[#F5EFE6] text-[#2D2926]"
                        : "border-gray-200 hover:border-[#C4954A]"
                    }`}
                  >
                    <Pill className="h-7 w-7" />
                    <span className="text-[15px] font-bold">Patient</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("caregiver")}
                    className={`flex flex-col items-center gap-3 rounded-xl border-2 p-5 transition-all ${
                      role === "caregiver"
                        ? "border-[#B8860B] bg-[#F5EFE6] text-[#2D2926]"
                        : "border-gray-200 hover:border-[#C4954A]"
                    }`}
                  >
                    <Heart className="h-7 w-7" />
                    <span className="text-[15px] font-bold">Caregiver</span>
                  </button>
                </div>
                <input type="hidden" name="role" value={role} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[15px] font-bold text-gray-700">Name</Label>
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
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.name} className="mt-1" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[15px] font-bold text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  required
                  tabIndex={2}
                  autoComplete="email"
                  placeholder="email@example.com"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.email} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-[15px] font-bold text-gray-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  tabIndex={3}
                  autoComplete="new-password"
                  placeholder="Password"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.password} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirmation" className="text-[15px] font-bold text-gray-700">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  name="password_confirmation"
                  required
                  tabIndex={4}
                  autoComplete="new-password"
                  placeholder="Confirm password"
                  className="h-13 text-[16px] rounded-xl border-2 border-gray-300 focus:border-[#B8860B] focus:ring-[#B8860B]"
                />
                <InputError messages={errors.password_confirmation} />
              </div>

              <Button
                type="submit"
                className="mt-2 w-full h-13 bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-xl text-[16px] font-bold"
                tabIndex={5}
              >
                {processing && <Spinner />}
                Create Account
              </Button>
            </div>

            <div className="text-center text-[15px] text-gray-500">
              Already have an account?{" "}
              <TextLink href={signInPath()} tabIndex={6} className="text-[#B8860B] font-bold hover:underline">
                Log In
              </TextLink>
            </div>
          </>
        )}
      </Form>
    </AuthLayout>
  )
}
