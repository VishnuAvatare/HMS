import { NextRequest, NextResponse } from 'next/server'
import { getPendingEmailByToken } from '@/lib/verification'

/** Step 2: User clicked link in email. Validate token and redirect to complete registration. */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token) {
    return NextResponse.redirect(new URL('/verify-email?error=missing', request.url))
  }

  try {
    const email = await getPendingEmailByToken(token)
    if (!email) {
      return NextResponse.redirect(new URL('/verify-email?error=invalid', request.url))
    }
    return NextResponse.redirect(new URL(`/complete-registration?token=${encodeURIComponent(token)}`, request.url))
  } catch (e) {
    console.error('Verify email error:', e)
    return NextResponse.redirect(new URL('/verify-email?error=invalid', request.url))
  }
}
