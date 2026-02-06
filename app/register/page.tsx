'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      let data: { error?: string } = {}
      try {
        data = await res.json()
      } catch {
        setError(res.ok ? 'Something went wrong.' : 'Server error. Please try again.')
        return
      }
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        return
      }
      setSuccess(true)
    } catch {
      setError('Network error or server unavailable. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <div className="card text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">Check your email</h2>
          <p className="mt-2 text-slate-600">
            We sent a verification link to <strong>{email}</strong>. Click the link to verify your email, then complete your registration.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            The link expires in 24 hours. If you don&apos;t see the email, check your spam folder.
          </p>
          <Link href="/login" className="btn-primary mt-6 inline-block">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-800">Create account</h1>
        <p className="mt-1 text-slate-600">Enter your email. We&apos;ll send a verification link—after you verify, you&apos;ll set your name, mobile and password.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              Email address <span className="text-slate-500">(this will be your User ID)</span>
            </label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Sending…' : 'Send verification link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-teal-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
