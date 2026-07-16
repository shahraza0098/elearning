// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import { verifyStudentToken } from "@/lib/verify-student-token";

// export async function requireStudent(request) {
//   try {
//     const { clerkUserId } = await verifyStudentToken(request);

//     const user = await prisma.user.findUnique({
//       where: {
//         clerkUserId,
//       },
//       include: {
//         subscription: {
//           include: {
//             plan: true,
//           },
//         },
//       },
//     });

//     if (!user) {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Student not found.",
//           },
//           {
//             status: 404,
//           }
//         ),
//       };
//     }

//     if (user.role !== "STUDENT") {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Access denied.",
//           },
//           {
//             status: 403,
//           }
//         ),
//       };
//     }

//     if (!user.onboardingComplete) {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Complete onboarding first.",
//             code: "ONBOARDING_REQUIRED",
//           },
//           {
//             status: 403,
//           }
//         ),
//       };
//     }

//     if (!user.subscription) {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Subscription required.",
//             code: "SUBSCRIPTION_REQUIRED",
//           },
//           {
//             status: 403,
//           }
//         ),
//       };
//     }

//     if (user.subscription.status !== "ACTIVE") {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Your subscription is not active.",
//             code: "SUBSCRIPTION_INACTIVE",
//           },
//           {
//             status: 403,
//           }
//         ),
//       };
//     }

//     if (
//       user.subscription.currentPeriodEnd &&
//       user.subscription.currentPeriodEnd < new Date()
//     ) {
//       return {
//         error: NextResponse.json(
//           {
//             message: "Subscription expired.",
//             code: "SUBSCRIPTION_EXPIRED",
//           },
//           {
//             status: 403,
//           }
//         ),
//       };
//     }

//     return {
//       user,
//       subscription: user.subscription,
//     };
//   } catch (error) {
//     return {
//       error: NextResponse.json(
//         {
//           message: "Unauthorized.",
//         },
//         {
//           status: 401,
//         }
//       ),
//     };
//   }
// }






// this code check trail also

// import { NextResponse } from "next/server";

// import prisma from "@/lib/prisma";
// import { verifyStudentToken } from "@/lib/verify-student-token";

// function errorResponse(message, status, code) {
//   return {
//     error: NextResponse.json(
//       {
//         message,
//         ...(code && { code }),
//       },
//       {
//         status,
//       }
//     ),
//   };
// }

// export async function requireStudent(request) {
//   try {
//     const { clerkUserId } =
//       await verifyStudentToken(request);

//     const user =
//       await prisma.user.findUnique({
//         where: {
//           clerkUserId,
//         },

//         include: {
//           subscription: {
//             include: {
//               plan: true,
//             },
//           },
//         },
//       });

//     if (!user) {
//       return errorResponse(
//         "Student not found.",
//         404
//       );
//     }

//     if (user.role !== "STUDENT") {
//       return errorResponse(
//         "Access denied.",
//         403
//       );
//     }

//     if (!user.onboardingComplete) {
//       return errorResponse(
//         "Complete onboarding first.",
//         403,
//         "ONBOARDING_REQUIRED"
//       );
//     }

//     const subscription =
//       user.subscription;

//     if (!subscription) {
//       return errorResponse(
//         "Subscription required.",
//         403,
//         "SUBSCRIPTION_REQUIRED"
//       );
//     }

//     /**
//      * Allowed statuses
//      */
//     const allowedStatuses = [
//       "AUTHENTICATED",
//       "ACTIVE",
//     ];

//     if (
//       !allowedStatuses.includes(
//         subscription.status
//       )
//     ) {
//       return errorResponse(
//         "Your subscription is not active.",
//         403,
//         "SUBSCRIPTION_INACTIVE"
//       );
//     }

//     /**
//      * Trial expired
//      */
//     if (
//       subscription.trialEndAt &&
//       subscription.trialEndAt <
//         new Date()
//     ) {
//       return errorResponse(
//         "Your free trial has expired.",
//         403,
//         "TRIAL_EXPIRED"
//       );
//     }

//     /**
//      * Subscription expired
//      */
//     if (
//       subscription.currentPeriodEnd &&
//       subscription.currentPeriodEnd <
//         new Date()
//     ) {
//       return errorResponse(
//         "Subscription expired.",
//         403,
//         "SUBSCRIPTION_EXPIRED"
//       );
//     }

//     return {
//       user,

//       subscription,
//     };
//   } catch (error) {
//     console.error(error);

//     return errorResponse(
//       "Unauthorized.",
//       401
//     );
//   }
// }




///this is seprate code


import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { verifyStudentToken } from "@/lib/verify-student-token";

function errorResponse(message, status, code) {
  return {
    error: NextResponse.json(
      {
        message,
        ...(code && { code }),
      },
      {
        status,
      }
    ),
  };
}

export async function requireStudent(request) {
  try {
    const { clerkUserId } = await verifyStudentToken(request);

    console.log("clerkuserId: ",clerkUserId )

    const user =
      await prisma.user.findUnique({
        where: {
          clerkUserId,
        },
      });
     
    if (!user) {
      return errorResponse(
        "Student not found.",
        404
      );
    }

    if (user.role !== "STUDENT") {
      return errorResponse(
        "Access denied.",
        403
      );
    }

    if (!user.onboardingComplete) {
      return errorResponse(
        "Complete onboarding first.",
        403,
        "ONBOARDING_REQUIRED"
      );
    }

    return {
      user,
    };
  } catch (error) {
    console.error(error);

    return errorResponse(
      "Unauthorized.",
      401
    );
  }
}
