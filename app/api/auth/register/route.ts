import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createPendingRegistration } from '@/lib/verification'
import { sendVerificationEmail } from '@/lib/email'

function getBaseUrl(request: NextRequest): string {
  const host = request.headers.get('host') || 'localhost:3000'
  const proto = request.headers.get('x-forwarded-proto') || 'http'
  return `${proto}://${host}`
}

/** Step 1: Submit email only. We send verification link; user is not created yet. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailNorm = email.trim().toLowerCase()
    const existingUser = await prisma.user.findUnique({ where: { email: emailNorm } })
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const token = await createPendingRegistration(emailNorm)
    const baseUrl = getBaseUrl(request)
    const verifyUrl = `${baseUrl}/api/auth/verify-email?token=${token}`

    const emailResult = await sendVerificationEmail(emailNorm, verifyUrl)
    if (!emailResult.ok) {
      return NextResponse.json(
        { error: emailResult.error || 'We could not send the verification email. Please try again later.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Check your email to verify, then complete registration.' })
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error'
    console.error('Register (send verification) error:', e)
    const userMessage =
      process.env.NODE_ENV === 'development'
        ? `Registration failed: ${message}`
        : 'Registration failed. Please try again or try again later.'
    return NextResponse.json({ error: userMessage }, { status: 500 })
  }
}
