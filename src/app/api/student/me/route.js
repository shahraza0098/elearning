import { NextResponse } from 'next/server'

import prisma from '@/lib/prisma'
import { verifyStudentToken } from '@/lib/verify-student-token'

export async function GET(request) {
  const authResult = await verifyStudentToken(request)
  if (authResult.error) return authResult.error
  console.log("authResult: check is itnjguyuyh", authResult)
  const { clerkUserId } = authResult

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    })

    if (!user) {
      console.log("user not found for clerkUserId:", clerkUserId)
      return NextResponse.json(
        { message: 'User profile not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        message: 'Student profile fetched successfully',
        data: {
          user,
            onboardingComplete: user.onboardingComplete,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch student profile', error: error?.message },
      { status: 500 }
    )
  }
}
