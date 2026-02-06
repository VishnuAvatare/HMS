/**
 * Email verification using Resend (free tier: 100 emails/day, 3000/month).
 * Sign up at https://resend.com and add RESEND_API_KEY to .env.
 * Without API key, verification link is logged to console (dev fallback).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
const APP_NAME = 'Sujit Healthcare Hospitals'

export async function sendVerificationEmail(to: string, verifyUrl: string): Promise<{ ok: boolean; error?: string }> {
  if (!RESEND_API_KEY) {
    console.log('[Email not configured] Verification link for', to, ':', verifyUrl)
    return { ok: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: `${APP_NAME} <${FROM_EMAIL}>`,
        to: [to],
        subject: `Verify your email – ${APP_NAME}`,
        html: `
          <p>Hello,</p>
          <p>Please verify your email address by clicking the link below:</p>
          <p><a href="${verifyUrl}" style="color:#0d9488;font-weight:600">Verify my email</a></p>
          <p>Or copy this link into your browser:</p>
          <p style="word-break:break-all">${verifyUrl}</p>
          <p>This link expires in 24 hours.</p>
          <p>— ${APP_NAME}</p>
        `,
      }),
    })

    let data: { message?: string } = {}
    try {
      data = await res.json()
    } catch {
      return { ok: false, error: 'Email service returned an invalid response' }
    }
    if (!res.ok) {
      console.error('Resend error:', data)
      return { ok: false, error: (data && data.message) || 'Failed to send email' }
    }
    return { ok: true }
  } catch (e) {
    console.error('Send verification email error:', e)
    return { ok: false, error: 'Failed to send email' }
  }
}
