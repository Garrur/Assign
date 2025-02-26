import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function createToken(payload: any) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(JWT_SECRET))

  return token
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET))
    return payload
  } catch (error) {
    return null
  }
}

export async function getSession() {
  const token = cookies().get("token")?.value
  if (!token) return null

  try {
    const payload = await verifyToken(token)
    return payload
  } catch (error) {
    return null
  }
}

export async function updateSession(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  if (!token) return null

  try {
    const payload = await verifyToken(token)
    return payload
  } catch (error) {
    return null
  }
}

