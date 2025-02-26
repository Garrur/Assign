import { getSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Calendar, Star, Users } from "lucide-react"

export default async function DashboardPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const stats = {
    CUSTOMER: [
      {
        title: "Total Bookings",
        value: "12",
        icon: Calendar,
      },
      {
        title: "Reviews Given",
        value: "8",
        icon: Star,
      },
    ],
    VENDOR: [
      {
        title: "Active Listings",
        value: "5",
        icon: Building2,
      },
      {
        title: "Total Bookings",
        value: "24",
        icon: Calendar,
      },
      {
        title: "Average Rating",
        value: "4.5",
        icon: Star,
      },
    ],
    ADMIN: [
      {
        title: "Total Users",
        value: "1,234",
        icon: Users,
      },
      {
        title: "Total Listings",
        value: "456",
        icon: Building2,
      },
      {
        title: "Total Bookings",
        value: "789",
        icon: Calendar,
      },
    ],
  }

  const roleStats = stats[session.role as keyof typeof stats] || []

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, {String(session.name)}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roleStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Role-specific content */}
      {session.role === "CUSTOMER" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add recent bookings list */}
              <p className="text-sm text-muted-foreground">No recent bookings</p>
            </CardContent>
          </Card>
        </div>
      )}

      {session.role === "VENDOR" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Booking Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add booking requests list */}
              <p className="text-sm text-muted-foreground">No pending requests</p>
            </CardContent>
          </Card>
        </div>
      )}

      {session.role === "ADMIN" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add recent activity list */}
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

