import { Head, Link, usePage } from "@inertiajs/react"
import { Camera, Heart, Pill, Shield } from "lucide-react"

import AppLogoIcon from "@/components/app-logo-icon"
import { Button } from "@/components/ui/button"
import { medicationsPath, signInPath, signUpPath } from "@/routes"

export default function Welcome() {
  const { auth } = usePage().props as { auth?: { user?: unknown } }

  return (
    <>
      <Head title="PillPal - Medication Reminder for Malaysians" />

      <div className="flex min-h-screen flex-col bg-stone-50">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white flex size-9 items-center justify-center rounded-lg">
              <AppLogoIcon className="size-5" />
            </div>
            <span className="text-xl font-bold text-stone-900">PillPal</span>
          </div>
          <nav className="flex items-center gap-3">
            {auth?.user ? (
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href={medicationsPath()}>Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href={signInPath()}>Log in</Link>
                </Button>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href={signUpPath()}>Sign up</Link>
                </Button>
              </>
            )}
          </nav>
        </header>

        {/* Hero */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Pill className="h-4 w-4 mr-2" />
              Built for Malaysian families
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
              Never miss a dose.
              <br />
              <span className="text-emerald-600">Keep family connected.</span>
            </h1>

            <p className="text-lg text-stone-600 max-w-xl mx-auto">
              PillPal helps elderly Malaysians track their medications, while
              giving caregivers peace of mind that their loved ones are taking
              their medicine on time.
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-base h-12 px-8"
              >
                <Link href={signUpPath()}>Get Started Free</Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto mt-16">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-100">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Pill className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Simple Reminders
              </h3>
              <p className="text-sm text-stone-500">
                Track morning, afternoon, and evening medications with one tap.
                Large buttons designed for elderly users.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-100">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Heart className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                Caregiver Dashboard
              </h3>
              <p className="text-sm text-stone-500">
                Family members can monitor medication compliance remotely. Get
                peace of mind even when you're in another city.
              </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-stone-100">
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Camera className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-stone-900 mb-2">
                AI Medicine Scan
              </h3>
              <p className="text-sm text-stone-500">
                Snap a photo of your medicine label and let AI extract the
                details automatically. Supports English and Bahasa Melayu.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-sm text-stone-400">
          <p>
            PillPal &mdash; Built for Krackathon Q1 2026. Solving healthcare
            for Malaysian families.
          </p>
        </footer>
      </div>
    </>
  )
}
