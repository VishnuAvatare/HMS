import { hash, compare } from 'bcryptjs'
import { SignJWT, jwtVerify } from 'jose'

const SALT_ROUNDS = 10
const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'sujit-healthcare-dev-secret-change-in-production'
)

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS)
}

export async function verifyPassword(password: string, hashStr: string): Promise<boolean> {
  return compare(password, hashStr)
}

export type CustomerSession = { type: 'customer'; userId: string; email: string }
export type OwnerSession = { type: 'owner' }

export async function createCustomerToken(payload: CustomerSession): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(SECRET)
}

export async function createOwnerToken(): Promise<string> {
  return new SignJWT({ type: 'owner' })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('24h')
    .sign(SECRET)
}

export async function verifyToken(token: string): Promise<CustomerSession | OwnerSession | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET)
    if (payload.type === 'customer' && payload.userId && payload.email) {
      return { type: 'customer', userId: String(payload.userId), email: String(payload.email) }
    }
    if (payload.type === 'owner') return { type: 'owner' }
    return null
  } catch {
    return null
  }
}

export function getOwnerCredentials(): { email: string; password: string } | null {
  const email = process.env.OWNER_EMAIL
  const password = process.env.OWNER_PASSWORD
  if (!email || !password) return null
  return { email, password }
}
