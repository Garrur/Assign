"use client"

import { Building2, Home, Hotel, List, LogOut, Settings, ShoppingBag, Users } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface NavProps {
  role: string
}

export function DashboardNav({ role }: NavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/login")
    router.refresh()
  }

  const commonLinks = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Overview",
    },
    {
      href: "/dashboard/profile",
      icon: Settings,
      title: "Profile Settings",
    },
  ]

  const roleBasedLinks = {
    CUSTOMER: [
      {
        href: "/dashboard/bookings",
        icon: ShoppingBag,
        title: "My Bookings",
      },
    ],
    VENDOR: [
      {
        href: "/dashboard/listings",
        icon: Building2,
        title: "My Listings",
      },
      {
        href: "/dashboard/bookings",
        icon: List,
        title: "Booking Requests",
      },
    ],
    ADMIN: [
      {
        href: "/dashboard/users",
        icon: Users,
        title: "Users",
      },
      {
        href: "/dashboard/listings",
        icon: Hotel,
        title: "All Listings",
      },
    ],
  }

  const links = [...commonLinks, ...(roleBasedLinks[role as keyof typeof roleBasedLinks] || [])]

  return (
    <>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Building2 className="h-6 w-6" />
          <span>Dashboard</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton asChild isActive={pathname === link.href}>
                <Link href={link.href}>
                  <link.icon className="h-4 w-4" />
                  <span>{link.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </>
  )
}

