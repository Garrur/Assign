import { getSession } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ListingCard } from "@/components/listings/card"

export default async function ListingsPage() {
  const session = await getSession()

  if (!session) {
    redirect("/login")
  }

  const listings = await prisma.listing.findMany({
    where: session.role === "VENDOR" ? { vendorId: session.id } : undefined,
    include: {
      vendor: true,
      reviews: true,
    },
  })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Listings</h2>
          <p className="text-muted-foreground">
            {session.role === "VENDOR" ? "Manage your property listings" : "View all property listings"}
          </p>
        </div>
        {session.role === "VENDOR" && (
          <Button asChild>
            <Link href="/dashboard/listings/new">Add New Listing</Link>
          </Button>
        )}
      </div>

      {listings.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">No listings found</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              {session.role === "VENDOR"
                ? "Add your first property listing to get started."
                : "No listings are available at the moment."}
            </p>
            {session.role === "VENDOR" && (
              <Button asChild>
                <Link href="/dashboard/listings/new">Add New Listing</Link>
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} isVendor={session.role === "VENDOR"} />
          ))}
        </div>
      )}
    </div>
  )
}

