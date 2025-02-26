import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Search, Star, Utensils } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative">
        <div className="absolute inset-0">
          <Image src="/placeholder.svg" alt="Hero background" className="object-cover" fill priority />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/50" />
        </div>
        <div className="container relative flex min-h-[600px] flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Find Your Perfect Stay
            <br />& Dining Experience
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-lg">
            Book hotels and restaurants with ease. Discover amazing places to stay and dine around the world.
          </p>
          <div className="mt-4 w-full max-w-3xl rounded-lg bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form className="grid gap-4 md:grid-cols-[1fr,1fr,auto]">
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Where are you going?" type="text" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue="hotels">
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotels">Hotels</SelectItem>
                    <SelectItem value="restaurants">Restaurants</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg" className="mt-8">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Building2 className="mb-4 h-8 w-8" />
            <h3 className="mb-2 text-lg font-semibold">Hotels</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Find the perfect hotel for your stay. Browse through our curated selection of accommodations.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/hotels">Browse Hotels</Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Utensils className="mb-4 h-8 w-8" />
            <h3 className="mb-2 text-lg font-semibold">Restaurants</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Discover amazing restaurants and book your table in advance. Explore diverse cuisines.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/restaurants">Find Restaurants</Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
            <Star className="mb-4 h-8 w-8" />
            <h3 className="mb-2 text-lg font-semibold">Featured</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Explore our top-rated hotels and restaurants. Special deals and exclusive offers.
            </p>
            <Button variant="secondary" asChild>
              <Link href="/featured">View Featured</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t bg-muted/50">
        <div className="container py-12 md:py-24">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-full mb-4 lg:col-span-2">
              <h2 className="mb-2 text-2xl font-bold md:text-3xl">Featured Hotels</h2>
              <p className="text-muted-foreground">Discover our handpicked selection of the finest hotels</p>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-lg border">
                <Image
                  src="/placeholder.svg"
                  alt="Hotel thumbnail"
                  className="aspect-[4/3] object-cover transition-transform group-hover:scale-105"
                  width={600}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 p-6">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="mb-2 text-lg font-semibold text-white">Luxury Hotel {i + 1}</h3>
                    <p className="mb-2 line-clamp-2 text-sm text-white/90">
                      Experience luxury at its finest with our premium amenities and world-class service.
                    </p>
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/hotels/${i + 1}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="col-span-full mb-4 lg:col-span-2">
            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Popular Restaurants</h2>
            <p className="text-muted-foreground">Explore top-rated dining experiences near you</p>
          </div>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg"
                alt="Restaurant thumbnail"
                className="aspect-[4/3] object-cover transition-transform group-hover:scale-105"
                width={600}
                height={400}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 p-6">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">Restaurant {i + 1}</h3>
                  <p className="mb-2 line-clamp-2 text-sm text-white/90">
                    Savor exquisite cuisine in an elegant atmosphere with exceptional service.
                  </p>
                  <Button size="sm" variant="secondary" asChild>
                    <Link href={`/restaurants/${i + 1}`}>View Details</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

