import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sujit Healthcare Hospitals',
  description: 'Customer portal – Login and manage your healthcare journey with Sujit Healthcare Hospitals.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-50">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <a href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold text-teal-700 md:text-2xl">
                Sujit Healthcare Hospitals
              </span>
            </a>
            <nav className="flex items-center gap-4 md:gap-6" aria-label="Main navigation">
              <a
                href="/"
                className="text-slate-600 hover:text-teal-600 font-medium"
              >
                Home
              </a>
              <a
                href="/#infrastructure"
                className="hidden text-slate-600 hover:text-teal-600 font-medium sm:inline"
              >
                Infrastructure
              </a>
              <a
                href="/#services"
                className="hidden text-slate-600 hover:text-teal-600 font-medium sm:inline"
              >
                Services
              </a>
              <a
                href="/#doctors"
                className="hidden text-slate-600 hover:text-teal-600 font-medium sm:inline"
              >
                Our Doctors
              </a>
              <a
                href="/login"
                className="text-slate-600 hover:text-teal-600 font-medium"
              >
                Customer Login
              </a>
              <a
                href="/register"
                className="rounded-lg bg-teal-600 px-4 py-2 font-medium text-white hover:bg-teal-700"
              >
                Register
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-slate-200 bg-slate-50 py-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Sujit Healthcare Hospitals. All rights reserved.
          {' · '}
          <a href="/owner/login" className="text-slate-400 hover:text-teal-600">Owner</a>
        </footer>
      </body>
    </html>
  )
}
