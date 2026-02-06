'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  if (error === 'invalid' || error === 'expired') {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="card text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800">Link invalid or expired</h1>
          <p className="mt-2 text-slate-600">
            Verification links expire after 24 hours. Please register again or contact support.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/register" className="rounded-lg border-2 border-teal-600 px-4 py-2 font-medium text-teal-600 hover:bg-teal-50">
              Register again
            </Link>
            <Link href="/login" className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700 hover:bg-slate-300">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (error === 'missing') {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="card text-center">
          <h1 className="text-xl font-bold text-slate-800">Verification link required</h1>
          <p className="mt-2 text-slate-600">Use the link from your verification email.</p>
          <Link href="/login" className="btn-primary mt-6 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="card text-center">
        <h1 className="text-xl font-bold text-slate-800">Verify your email</h1>
        <p className="mt-2 text-slate-600">Check your inbox and click the link we sent you.</p>
        <Link href="/login" className="btn-primary mt-6 inline-block">
          Go to Login
        </Link>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-md px-4 py-16 text-center text-slate-600">Loading…</div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
