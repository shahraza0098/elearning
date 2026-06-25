import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'

export async function requireAdmin() {
  const { userId } = await auth()

  if (!userId) {
    return {
      error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
    }
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, role: true },
  })

  if (!user || user.role !== 'ADMIN') {
    return {
      error: NextResponse.json({ message: 'Forbidden' }, { status: 403 }),
    }
  }

  return { user }
}
