import { Link } from "@inertiajs/react"
import type { PropsWithChildren } from "react"

import AppLogoIcon from "@/components/app-logo-icon"
import { rootPath } from "@/routes"

interface AuthLayoutProps {
  name?: string
  title?: string
  description?: string
}

export default function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link
              href={rootPath()}
              className="flex items-center gap-2.5"
            >
              <div className="bg-[#2D2926] text-white flex size-10 items-center justify-center rounded-xl">
                <AppLogoIcon className="size-5" />
              </div>
              <span className="text-[20px] font-bold text-[#2D2926]">PillPal</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-xl font-medium">{title}</h1>
              <p className="text-muted-foreground text-center text-sm">
                {description}
              </p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
