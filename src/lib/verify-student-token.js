// import { auth, verifyToken } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server'

// import prisma from '@/lib/prisma'

// async function resolveClerkUserId(request) {
//   const { userId } = await auth()

//   if (userId) {
//     return userId
//   }

//   const authorizationHeader = request?.headers?.get?.('authorization')

//   if (!authorizationHeader?.startsWith('Bearer ')) {
//     return null
//   }

//   const token = authorizationHeader.slice(7).trim()

//   if (!token) {
//     return null
//   }

//   try {
//     const payload = await verifyToken(token, {
//       secretKey: process.env.CLERK_SECRET_KEY,
//       clockSkewInMs: 60 * 1000,
//     });
//     return payload?.sub || payload?.userId || null
//   } catch {
//     return null
//   }
// }

// export async function requireStudent(request) {
//   const userId = await resolveClerkUserId(request)

//   if (!userId) {
//     return {
//       error: NextResponse.json({ message: 'Unauthorized' }, { status: 401 }),
//     }
//   }

//   const user = await prisma.user.findUnique({
//     where: { clerkUserId: userId },
//     select: {
//       id: true,
//       role: true,
//       name: true,
//       username: true,
//       email: true,
//       image: true,
//     },
//   })

//   if (!user) {
//     return {
//       error: NextResponse.json(
//         { message: 'User profile not found. Please complete registration first.' },
//         { status: 404 }
//       ),
//     }
//   }

//   return { user }
// }


import { clerkClient, verifyToken } from "@clerk/nextjs/server";


function unauthorized(message = "Unauthorized") {
  const error = new Error(message);
  error.status = 401;
  return error;
}

export async function verifyStudentToken(req) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw unauthorized();
  }

  const token = authHeader.slice("Bearer ".length).trim();
  if (!token) throw unauthorized();
  console.log("Received token:", token);
  try {
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      clockSkewInMs: 60 * 1000,
    });

    console.log("Token payload:", payload);
    const clerkUserId = payload?.sub;
    if (!clerkUserId) throw unauthorized("Invalid token");

    // const client = await clerkClient();
    // const user = await client.users.getUser(clerkUserId);

    return {
        clerkUserId,
        // user
    };
  } catch {
    throw unauthorized();
  }
}
