import { NextRequest, NextResponse } from 'next/server'
import { getOwnerCredentials } from '@/lib/auth'
import { createOwnerToken } from '@/lib/auth'

const COOKIE_NAME = 'owner_session'
const COOKIE_OPTIONS = { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/', maxAge: 60 * 60 * 24 }

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    const creds = getOwnerCredentials()
    if (!creds) {
      return NextResponse.json({ error: 'Owner login is not configured' }, { status: 503 })
    }

    if (email !== creds.email || password !== creds.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const token = await createOwnerToken()
    const res = NextResponse.json({ success: true })
    res.cookies.set(COOKIE_NAME, token, COOKIE_OPTIONS)
    return res
  } catch (e) {
    console.error('Owner login error:', e)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
