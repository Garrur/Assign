import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { updateSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register"

  // Get the session from the request
  const session = await updateSession(request)

  // Redirect to login if accessing protected route without session
  if (!session && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing login/register with session
  if (session && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Role-based access control
  if (session) {
    const role = session.role

    // Vendor routes protection
    if (path.startsWith("/vendor") && role !== "VENDOR") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Admin routes protection
    if (path.startsWith("/admin") && role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/vendor/:path*", "/admin/:path*", "/login", "/register"],
}

