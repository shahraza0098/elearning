import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { requireStudent } from "./require-student";

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

export async function requireActiveSubscription(
  request
) {
  const authResult =
    await requireStudent(request);

  if (authResult.error) {
    return authResult;
  }

  const { user } = authResult;

  const subscription =
    await prisma.subscription.findUnique({
      where: {
        userId: user.id,
      },

      include: {
        plan: true,
      },
    });

  if (!subscription) {
    return errorResponse(
      "Subscription required.",
      403,
      "SUBSCRIPTION_REQUIRED"
    );
  }

  const allowedStatuses = [
    "AUTHENTICATED",
    "ACTIVE",
  ];

  if (
    !allowedStatuses.includes(
      subscription.status
    )
  ) {
    return errorResponse(
      "Your subscription is not active.",
      403,
      "SUBSCRIPTION_INACTIVE"
    );
  }

  /**
   * Trial Expired
   */
  if (
    subscription.trialEndAt &&
    subscription.trialEndAt <
      new Date()
  ) {
    await prisma.subscription.update({
      where: {
        id: subscription.id,
      },

      data: {
        status: "EXPIRED",
      },
    });

    return errorResponse(
      "Your trial has expired.",
      403,
      "TRIAL_EXPIRED"
    );
  }

  /**
   * Subscription Expired
   */
  if (
    subscription.currentPeriodEnd &&
    subscription.currentPeriodEnd <
      new Date()
  ) {
    await prisma.subscription.update({
      where: {
        id: subscription.id,
      },

      data: {
        status: "EXPIRED",
      },
    });

    return errorResponse(
      "Subscription expired.",
      403,
      "SUBSCRIPTION_EXPIRED"
    );
  }

  return {
    user,

    subscription,
  };
}