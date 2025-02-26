import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import type { Listing, Review, User } from "@prisma/client"
import { MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ListingCardProps {
  listing: Listing & {
    vendor: User
    reviews: Review[]
  }
  isVendor?: boolean
}

export function ListingCard({ listing, isVendor }: ListingCardProps) {
  const averageRating = listing.reviews.reduce((acc, review) => acc + review.rating, 0) / listing.reviews.length || 0

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image src={listing.images[0] || "/placeholder.svg"} alt={listing.name} className="object-cover" fill />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold">{listing.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {listing.city}, {listing.country}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2 text-sm text-muted-foreground">{listing.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isVendor ? (
          <Button variant="outline" asChild>
            <Link href={`/dashboard/listings/${listing.id}/edit`}>Edit Listing</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link href={`/listings/${listing.id}`}>View Details</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

