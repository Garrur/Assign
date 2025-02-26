import type React from "react"
import { getSession } from "@/lib/auth"
import { DashboardNav } from "@/components/dashboard/nav"
import { redirect } from "next/navigation"
import { Sidebar, SidebarContent, SidebarProvider } from "@/components/ui/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <DashboardNav role={String(session.role)} />
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </SidebarProvider>
  )
}

