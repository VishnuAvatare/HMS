import { randomBytes } from 'crypto'
import { prisma } from '@/lib/db'

const TOKEN_BYTES = 32
const EXPIRY_HOURS = 24

export function generateVerificationToken(): string {
  return randomBytes(TOKEN_BYTES).toString('hex')
}

/** Create or update pending registration for email; returns token. */
export async function createPendingRegistration(email: string): Promise<string> {
  const token = generateVerificationToken()
  const expiresAt = new Date(Date.now() + EXPIRY_HOURS * 60 * 60 * 1000)
  await prisma.pendingRegistration.upsert({
    where: { email },
    create: { email, token, expiresAt },
    update: { token, expiresAt },
  })
  return token
}

/** Get email for a valid token (does not consume). Returns null if invalid or expired. */
export async function getPendingEmailByToken(token: string): Promise<string | null> {
  const record = await prisma.pendingRegistration.findUnique({
    where: { token },
  })
  if (!record || record.expiresAt < new Date()) return null
  return record.email
}

/** Consume token: delete pending and return email. Returns null if invalid or expired. */
export async function consumePendingRegistration(token: string): Promise<string | null> {
  const record = await prisma.pendingRegistration.findUnique({
    where: { token },
  })
  if (!record || record.expiresAt < new Date()) return null
  await prisma.pendingRegistration.delete({ where: { id: record.id } })
  return record.email
}
