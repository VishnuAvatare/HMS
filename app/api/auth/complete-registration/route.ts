import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/auth'
import { consumePendingRegistration } from '@/lib/verification'

/** Step 3: After email verified, submit name, mobile, password. Create user in DB. */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, name, mobile, password } = body

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Invalid verification link. Please use the link from your email.' }, { status: 400 })
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }
    if (!mobile || typeof mobile !== 'string' || !mobile.trim()) {
      return NextResponse.json({ error: 'Mobile number is required' }, { status: 400 })
    }
    if (!password || typeof password !== 'string' || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const email = await consumePendingRegistration(token)
    if (!email) {
      return NextResponse.json({ error: 'Verification link invalid or expired. Please start registration again.' }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 })
    }

    const passwordHash = await hashPassword(password)
    await prisma.user.create({
      data: {
        name: name.trim(),
        mobile: mobile.trim(),
        email,
        passwordHash,
        emailVerified: true,
      },
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Complete registration error:', e)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
