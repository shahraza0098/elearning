// import { auth, verifyToken } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// import prisma from '@/lib/prisma'

// export async function POST(request) {
//   const { userId: sessionUserId, sessionClaims } = await auth()
//   let userId = sessionUserId

//   if (!userId) {
//     const authorizationHeader = request.headers.get('authorization')

//     if (authorizationHeader?.startsWith('Bearer ')) {
//       const token = authorizationHeader.slice(7).trim()

//       if (token) {
//         try {
//           const payload = await verifyToken(token)
//           userId = payload?.sub || payload?.userId || null
//         } catch {
//           userId = null
//         }
//       }
//     }
//   }

//   if (!userId) {
//     return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
//   }

//   try {
//     const body = await request.json()
//     const name = body?.name?.toString().trim() || sessionClaims?.fullName?.toString().trim() || 'Student'
//     const email = body?.email?.toString().trim() || sessionClaims?.email?.toString().trim() || ''
//     const phone = body?.phone?.toString().trim() || ''
//     const role = 'STUDENT'
//     const username = body?.username?.toString().trim() || sessionClaims?.username?.toString().trim() || undefined

//     console.log('Onboarding request body:', body)
//     if (!email) {
//       return NextResponse.json({ message: 'Email is required' }, { status: 400 })
//     }

//     const existingUser = await prisma.user.findUnique({
//       where: { clerkUserId: userId },
//     })

//     const user = existingUser
//       ? await prisma.user.update({
//           where: { id: existingUser.id },
//           data: {
//             name,
//             email,
//             phone,
//             role,
//             username: username || existingUser.username,
//             onboardingComplete: true,
//           },
//         })
//       : await prisma.user.create({
//           data: {
//             clerkUserId: userId,
//             name,
//             email,
//             phone,
//             role,
//             username: username || `student-${userId.slice(0, 8)}`,
//             onboardingComplete: true,
//           },
//         })

//         //start
// const response = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         },
//         body: JSON.stringify({
//        // user signs in via magic link / SSO
//           "public_metadata": {
//               "role": "STUDENT",
//               "onboardingComplete": user?true:false,
             
//           },

//         }),
//       });
// //end

//     return NextResponse.json(
//       { message: 'Student profile synced successfully', data: user },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('Error syncing student profile:', error)
//     return NextResponse.json(
//       { message: 'Failed to sync student profile', error: error?.message },
//       { status: 500 }
//     )
//   }
// }



import { NextResponse } from "next/server";
import { clerkClient, auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { verifyStudentToken } from "@/lib/verify-student-token";

export async function POST(request) {
  try {
    // Verify Expo Bearer token
    const { clerkUserId } = await verifyStudentToken(request);
      // const { userId: sessionUserId, sessionClaims } = await auth()
      // let userId = sessionUserId

    const body = await request.json();
    console.log("Onboarding request body:", body);
   console.log("Session claims:", sessionClaims);
    const name = body?.name?.toString().trim()  || 'Student'
    const email = body?.email?.toString().trim() ||  ''
    const phone = body?.phone?.toString().trim() || ''
    const role = 'STUDENT'
    const username = body?.username?.toString().trim() ||  undefined

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        clerkUserId,
      },
    });

    let user;

    if (existingUser) {
      user = await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          name,
          email,
          phone,
          username: username || existingUser.username,
          onboardingComplete: true,
          role: "STUDENT",
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          clerkUserId,
          name,
          email,
          phone,
          username: username || `student-${clerkUserId.slice(0, 8)}`,
          onboardingComplete: true,
          role: "STUDENT",
        },
      });
    }

    // Update Clerk metadata
    const client = await clerkClient();

    await client.users.updateUser(clerkUserId, {
      publicMetadata: {
        role: "STUDENT",
        onboardingComplete: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student onboarded successfully.",
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Onboarding Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      {
        status: error.status || 500,
      }
    );
  }
}