import { NextRequest, NextResponse } from 'next/server'
import { getPendingEmailByToken } from '@/lib/verification'

/** Return verified email for this token (so complete-registration page can show it). Does not consume token. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 })
  }

  const email = await getPendingEmailByToken(token)
  if (!email) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 401 })
  }
  return NextResponse.json({ email })
}
