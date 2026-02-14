import { Link } from "@inertiajs/react"
import type { PropsWithChildren } from "react"

import AppLogoIcon from "@/components/app-logo-icon"
import { rootPath } from "@/routes"

interface AuthLayoutProps {
  title?: string
  description?: string
}

export default function AuthSplitLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="relative grid h-dvh flex-col items-center justify-center px-6 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 text-white lg:flex bg-[#2D2926]">
        <Link
          href={rootPath()}
          className="relative z-20 flex items-center text-[20px] font-bold gap-2.5"
        >
          <div className="bg-[#2D2926] text-white flex size-10 items-center justify-center rounded-xl border border-white/15">
            <AppLogoIcon className="size-5" />
          </div>
          PillPal
        </Link>
        <div className="relative z-20 mt-auto max-w-md">
          <p className="text-[clamp(1.8rem,3vw,2.5rem)] font-bold leading-[1.1] tracking-tight mb-4">
            Never miss a dose.
            <br />
            Keep family connected.
          </p>
          <p className="text-[16px] leading-relaxed text-white/70">
            The simple way to track medications for your parents and grandparents.
            Built for Malaysian families.
          </p>
        </div>
      </div>
      <div className="w-full lg:p-8 bg-[#f5f3ef]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[420px]">
          <Link
            href={rootPath()}
            className="relative z-20 flex items-center justify-center gap-2.5 lg:hidden"
          >
            <div className="bg-[#2D2926] text-white flex size-10 items-center justify-center rounded-xl">
              <AppLogoIcon className="size-5" />
            </div>
            <span className="text-[20px] font-bold text-[#2D2926]">PillPal</span>
          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="text-[24px] font-bold text-gray-900">{title}</h1>
            <p className="text-[15px] text-gray-500">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
