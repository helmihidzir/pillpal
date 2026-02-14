import { Link, usePage } from "@inertiajs/react"
import { Camera, Heart, Pill, Settings } from "lucide-react"

import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  caregiversPath,
  medicationsPath,
  newMedicineScanPath,
  settingsProfilePath,
} from "@/routes"
import type { NavItem, SharedProps } from "@/types"

import AppLogo from "./app-logo"

const patientNavItems: NavItem[] = [
  {
    title: "My Medications",
    href: medicationsPath(),
    icon: Pill,
  },
  {
    title: "Scan Medicine",
    href: newMedicineScanPath(),
    icon: Camera,
  },
]

const caregiverNavItems: NavItem[] = [
  {
    title: "My Patients",
    href: caregiversPath(),
    icon: Heart,
  },
]

const footerNavItems: NavItem[] = [
  {
    title: "Settings",
    href: settingsProfilePath(),
    icon: Settings,
  },
]

export function AppSidebar() {
  const { auth } = usePage<SharedProps>().props
  const isCaregiver = auth.user.role === "caregiver"
  const homePath = isCaregiver ? caregiversPath() : medicationsPath()

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={homePath} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={isCaregiver ? caregiverNavItems : patientNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
