import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

const COOKIE_NAME = 'owner_session'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get(COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const session = await verifyToken(token)
    if (!session || session.type !== 'owner') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: { name: true },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({
      count: users.length,
      users: users.map((u) => ({ name: u.name })),
    })
  } catch (e) {
    console.error('Owner users error:', e)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}
