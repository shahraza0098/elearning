import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyStudentToken } from "@/lib/verify-student-token";

export async function requireStudent(request) {
  try {
    const { clerkUserId } = await verifyStudentToken(request);

    const user = await prisma.user.findUnique({
      where: {
        clerkUserId,
      },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      return {
        error: NextResponse.json(
          {
            message: "Student not found.",
          },
          {
            status: 404,
          }
        ),
      };
    }

    if (user.role !== "STUDENT") {
      return {
        error: NextResponse.json(
          {
            message: "Access denied.",
          },
          {
            status: 403,
          }
        ),
      };
    }

    if (!user.onboardingComplete) {
      return {
        error: NextResponse.json(
          {
            message: "Complete onboarding first.",
            code: "ONBOARDING_REQUIRED",
          },
          {
            status: 403,
          }
        ),
      };
    }

    if (!user.subscription) {
      return {
        error: NextResponse.json(
          {
            message: "Subscription required.",
            code: "SUBSCRIPTION_REQUIRED",
          },
          {
            status: 403,
          }
        ),
      };
    }

    if (user.subscription.status !== "ACTIVE") {
      return {
        error: NextResponse.json(
          {
            message: "Your subscription is not active.",
            code: "SUBSCRIPTION_INACTIVE",
          },
          {
            status: 403,
          }
        ),
      };
    }

    if (
      user.subscription.currentPeriodEnd &&
      user.subscription.currentPeriodEnd < new Date()
    ) {
      return {
        error: NextResponse.json(
          {
            message: "Subscription expired.",
            code: "SUBSCRIPTION_EXPIRED",
          },
          {
            status: 403,
          }
        ),
      };
    }

    return {
      user,
      subscription: user.subscription,
    };
  } catch (error) {
    return {
      error: NextResponse.json(
        {
          message: "Unauthorized.",
        },
        {
          status: 401,
        }
      ),
    };
  }
}