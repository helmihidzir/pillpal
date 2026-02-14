import { Head, Link, usePage } from "@inertiajs/react"
import { ArrowRight, Camera, Eye, Heart, Pill, Scan, Share2, UserPlus } from "lucide-react"
import { useState } from "react"
import AppLogoIcon from "@/components/app-logo-icon"
import { Button } from "@/components/ui/button"
import { medicationsPath, signInPath, signUpPath } from "@/routes"

export default function Welcome() {
  const { auth } = usePage().props as { auth?: { user?: unknown } }
  const [activeTab, setActiveTab] = useState<"patient" | "caregiver">("patient")

  const steps = {
    patient: [
      { icon: UserPlus, step: "Step 1", title: "Create Account", desc: "Sign up as a patient and receive a unique share code for your caregiver." },
      { icon: Scan, step: "Step 2", title: "Add Medications", desc: "Scan medicine labels with AI or type them in. Set your daily schedule." },
      { icon: Pill, step: "Step 3", title: "Mark as Taken", desc: "Tap the big button each time you take your medication. Simple as that." },
    ],
    caregiver: [
      { icon: UserPlus, step: "Step 1", title: "Create Account", desc: "Sign up as a caregiver and enter your family member's share code." },
      { icon: Share2, step: "Step 2", title: "Link Patient", desc: "Connect to your parent or grandparent's account using their unique code." },
      { icon: Eye, step: "Step 3", title: "Monitor Progress", desc: "See real-time updates when medications are taken. Get peace of mind." },
    ],
  }

  return (
    <>
      <Head title="PillPal — Medication Reminders for Malaysian Families" />

      <div className="flex min-h-screen flex-col bg-[#FAF6EE]">
        <main className="flex-1">
          {/* Hero with nav — hims style */}
          <section className="px-6 pb-12 md:pb-16">
            {/* Nav */}
            <div className="max-w-6xl mx-auto flex items-center justify-between py-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="bg-[#2D2926] text-white flex size-10 items-center justify-center rounded-xl">
                  <AppLogoIcon className="size-5" />
                </div>
                <span className="text-[20px] font-bold text-[#2D2926]">PillPal</span>
              </Link>
              <nav className="flex items-center gap-2">
                {auth?.user ? (
                  <Button asChild className="bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-full px-7 h-12 text-[16px] font-semibold">
                    <Link href={medicationsPath()}>Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="text-[#2D2926] hover:bg-[#2D2926]/5 rounded-full h-12 px-5 text-[16px] font-medium">
                      <Link href={signInPath()}>Log In</Link>
                    </Button>
                    <Button asChild className="bg-[#2D2926] hover:bg-[#1a1715] text-white rounded-full px-7 h-12 text-[16px] font-semibold">
                      <Link href={signUpPath()}>Get Started</Link>
                    </Button>
                  </>
                )}
              </nav>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Headline — hims style */}
              <div className="mb-10 md:mb-14 pt-10 md:pt-16">
                <p className="text-[clamp(3rem,8vw,5.2rem)] font-normal leading-[1] tracking-tight text-[#C4954A]">
                  Never miss
                </p>
                <h1 className="text-[clamp(3rem,8vw,5.2rem)] font-bold leading-[1] tracking-tight text-[#2D2926]">
                  a single dose.
                </h1>
              </div>

              {/* Feature cards grid — hims style */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Main card — warm gradient */}
                <Link
                  href={auth?.user ? medicationsPath() : signUpPath()}
                  className="group md:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4A84B] via-[#C49540] to-[#A07830] p-8 md:p-10 min-h-[260px] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-white/80 mb-1">Track medications</p>
                    <p className="text-[14px] text-white/60">for your whole family</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-[16px] font-semibold text-white">Get started free</p>
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </Link>

                {/* AI Scan card */}
                <Link
                  href={auth?.user ? "/medicine_scans/new" : signUpPath()}
                  className="group relative overflow-hidden rounded-2xl bg-[#2D2926] p-8 min-h-[260px] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-white/80 mb-1">AI Medicine Scan</p>
                    <p className="text-[14px] text-white/50">Snap a label, auto-fill details</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-[#C4954A]" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </Link>

                {/* Caregiver card */}
                <Link
                  href={auth?.user ? "/caregivers" : signUpPath()}
                  className="group relative overflow-hidden rounded-2xl bg-[#F0E8DA] p-8 min-h-[260px] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-[#2D2926] mb-1">Caregiver Dashboard</p>
                    <p className="text-[14px] text-[#6B5D4F]">Monitor family in real-time</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="h-12 w-12 rounded-xl bg-[#2D2926]/10 flex items-center justify-center">
                      <Heart className="h-6 w-6 text-[#2D2926]" />
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#2D2926]/10 flex items-center justify-center group-hover:bg-[#2D2926]/20 transition-colors">
                      <ArrowRight className="h-5 w-5 text-[#2D2926]" />
                    </div>
                  </div>
                </Link>
              </div>

            </div>
          </section>

          {/* How it works — white bg, tabs for patient/caregiver */}
          <section className="px-6 py-16 md:py-24 bg-white">
            <div className="max-w-6xl mx-auto">
              {/* Centered header */}
              <div className="text-center mb-10">
                <span className="inline-block rounded-full border border-[#C4954A] px-4 py-1.5 text-[13px] font-semibold text-[#C4954A] mb-5">
                  How it works
                </span>
                <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-tight text-[#2D2926] mb-4">
                  How <span className="text-[#C4954A]">PillPal</span> Works
                </h2>
                <p className="text-[16px] leading-relaxed text-[#6B5D4F] max-w-lg mx-auto">
                  Managing medications for your family is simple, fast, and takes just a few easy steps.
                </p>
              </div>

              {/* Role tabs */}
              <div className="flex justify-center mb-10">
                <div className="inline-flex rounded-full bg-[#F0E8DA] p-1">
                  <button
                    onClick={() => setActiveTab("patient")}
                    className={`rounded-full px-7 py-3 text-[15px] font-semibold transition-all ${
                      activeTab === "patient"
                        ? "bg-[#2D2926] text-white shadow-sm"
                        : "text-[#6B5D4F] hover:text-[#2D2926]"
                    }`}
                  >
                    Patient
                  </button>
                  <button
                    onClick={() => setActiveTab("caregiver")}
                    className={`rounded-full px-7 py-3 text-[15px] font-semibold transition-all ${
                      activeTab === "caregiver"
                        ? "bg-[#2D2926] text-white shadow-sm"
                        : "text-[#6B5D4F] hover:text-[#2D2926]"
                    }`}
                  >
                    Caregiver
                  </button>
                </div>
              </div>

              {/* Step cards */}
              <div className="grid gap-5 md:grid-cols-3">
                {steps[activeTab].map(({ icon: Icon, step, title, desc }) => (
                  <div key={step} className="rounded-2xl border border-[#E8E0D0] bg-white p-8">
                    <div className="h-28 flex items-center justify-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-[#C4954A]/10 flex items-center justify-center">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-[#D4A84B] to-[#C49540] flex items-center justify-center">
                          <Icon className="h-7 w-7 text-white" />
                        </div>
                      </div>
                    </div>
                    <p className="text-[14px] font-bold text-[#C4954A] mb-2">{step}</p>
                    <h4 className="text-[20px] font-bold text-[#2D2926] mb-2">{title}</h4>
                    <p className="text-[15px] leading-relaxed text-[#6B5D4F]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="px-6 py-6 bg-white">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-[#2D2926] text-white flex size-7 items-center justify-center rounded-lg">
                <AppLogoIcon className="size-3.5" />
              </div>
              <span className="text-[14px] font-bold text-[#A89880]">PillPal</span>
            </div>
            <p className="text-[13px] text-[#A89880]">
              Krackathon Q1 2026
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
