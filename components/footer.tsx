import Link from "next/link"
import { Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container grid gap-8 py-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="text-xl font-bold">BookEase</span>
          </Link>
          <p className="text-sm text-muted-foreground">Book your perfect stay or dining experience with ease</p>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Quick Links</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/hotels">Hotels</Link>
            </li>
            <li>
              <Link href="/restaurants">Restaurants</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">For Business</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/vendor/register">List Your Property</Link>
            </li>
            <li>
              <Link href="/vendor/login">Vendor Login</Link>
            </li>
            <li>
              <Link href="/vendor/support">Support</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold">Legal</h3>
          <ul className="grid gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
            <li>
              <Link href="/cookies">Cookie Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container flex flex-col gap-2 py-4 text-center text-sm text-muted-foreground md:flex-row md:justify-between">
          <p>© 2024 BookEase. All rights reserved.</p>
          <p>
            Made with ❤️ by{" "}
            <Link href="/" className="underline underline-offset-4">
              BookEase Team
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

