// import { NextResponse } from 'next/server'

// import prisma from '@/lib/prisma'
// import { verifyStudentToken } from '@/lib/verify-student-token'

// export async function GET(request) {
//   const authResult = await verifyStudentToken(request)
//   if (authResult.error) return authResult.error
//   console.log("authResult: check is itnjguyuyh", authResult)
//   const { clerkUserId } = authResult

//   try {
//     const user = await prisma.user.findUnique({
//       where: { clerkUserId },
//     })

//     if (!user) {
//       console.log("user not found for clerkUserId:", clerkUserId)
//       return NextResponse.json(
//         { message: 'User profile not found' },
//         { status: 404 }
//       )
//     }

//     return NextResponse.json(
//       {
//         message: 'Student profile fetched successfully',
//         data: {
//           user,
//             onboardingComplete: user.onboardingComplete,
//         },
//       },
//       { status: 200 }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       { message: 'Failed to fetch student profile', error: error?.message },
//       { status: 500 }
//     )
//   }
// }




//new code


import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "@/lib/require-student";

export async function GET(request) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }

  const { user } = authResult;

  try {
    const student = await prisma.user.findUnique({
      where: {
        id: user.id,
      },

      select: {
        id: true,

        clerkUserId: true,

        name: true,

        email: true,

        phone: true,

        username: true,

        // imageUrl: true,

        role: true,

        onboardingComplete: true,

        createdAt: true,

        updatedAt: true,

        subscription: {
          select: {
            id: true,

            status: true,

            razorpaySubscriptionId: true,

            trialStartAt: true,

            trialEndAt: true,

            currentPeriodStart: true,

            currentPeriodEnd: true,

            nextChargeAt: true,

            cancelledAt: true,

            plan: {
              select: {
                id: true,

                name: true,

                description: true,

                price: true,

                trialAmount: true,

                trialDays: true,

                billingInterval: true,
              },
            },
          },
        },
      },
    });

    if (!student) {
      return NextResponse.json(
        {
          message: "Student profile not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        message: "Student profile fetched successfully",

        data: {
          user: {
            ...student,

            subscription: student.subscription
              ? {
                  ...student.subscription,

                  plan: {
                    ...student.subscription.plan,

                    price: Number(
                      student.subscription.plan.price
                    ),

                    trialAmount: Number(
                      student.subscription.plan.trialAmount
                    ),
                  },
                }
              : null,
          },

          /**
           * Backward compatibility
           */
          onboardingComplete:
            student.onboardingComplete,
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "GET /api/student/me",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to fetch student profile",
      },
      {
        status: 500,
      }
    );
  }
}