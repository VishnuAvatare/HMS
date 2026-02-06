'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type UsersResponse = { count: number; users: { name: string }[] }

export default function OwnerDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<UsersResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function fetchUsers() {
      try {
        const res = await fetch('/api/owner/users', { credentials: 'include' })
        if (res.status === 401) {
          if (!cancelled) router.replace('/owner/login')
          return
        }
        if (!res.ok) {
          if (!cancelled) setError('Failed to load users')
          return
        }
        const json = await res.json()
        if (!cancelled) setData(json)
      } catch {
        if (!cancelled) setError('Failed to load users')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchUsers()
    return () => { cancelled = true }
  }, [router])

  const handleLogout = async () => {
    await fetch('/api/owner/logout', { method: 'POST', credentials: 'include' })
    router.replace('/owner/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-slate-600">Loading…</p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="card text-center">
          <p className="text-red-600">{error || 'Unable to load dashboard'}</p>
          <Link href="/owner/dashboard" className="btn-primary mt-4 inline-block">
            Retry
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Owner Dashboard</h1>
        <div className="flex gap-3">
          <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Site
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-800">Active users</h2>
        <p className="mt-1 text-slate-600">Registered customers (name only).</p>

        <div className="mt-6 rounded-xl bg-teal-50 p-6">
          <p className="text-3xl font-bold text-teal-700">{data.count}</p>
          <p className="text-sm text-teal-600">Total registered users</p>
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-slate-700">User names</h3>
          {data.users.length === 0 ? (
            <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 py-8 text-center text-slate-500">
              No users yet. Customers will appear here after they register.
            </p>
          ) : (
            <ul className="space-y-2 rounded-lg border border-slate-200 bg-slate-50/50 p-4">
              {data.users.map((u, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-800">
                  <span className="text-teal-600">•</span>
                  {u.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
