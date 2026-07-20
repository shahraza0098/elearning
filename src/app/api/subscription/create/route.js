import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import {razorpay} from "@/lib/razorpay";
import { requireStudent } from "@/lib/require-student";

export async function POST(request) {
  const authResult = await requireStudent(request);

  if (authResult.error) {
    return authResult.error;
  }

  const { user } = authResult;

  console.log("sdafeyudhj:",user)

  try {
    /**
     * Check if user already has an active subscription
     */
    const existingSubscription =
      await prisma.subscription.findFirst({
        where: {userId: user.id,
          status: {
            in: [
              "AUTHENTICATED",
              "ACTIVE",
            ],
          },
        },

        include: {
          plan: true,
        },
      });

    if (existingSubscription) {
      return NextResponse.json(
        {
          message: "You already have a subscription.",
            status:existingSubscription.status,
        },
        {
          status: 409,
        }
      );
    }

    /**
     * Active Plan
     */

    const plan =
      await prisma.plan.findFirst({
        where: {
          isActive: true,
        },
      });

    if (!plan) {
      return NextResponse.json(
        {
          message:
            "No active subscription plan found.",
        },
        {
          status: 404,
        }
      );
    }



      const trialSeconds = plan.trialDays * 24 * 60 * 60;
  const startAt = Math.floor(Date.now() / 1000) + trialSeconds;
  const trialEndAt = new Date(startAt * 1000);

  // 120 monthly cycles / 20 yearly cycles ≈ a long-running "until cancelled" subscription —
  // Razorpay requires a finite total_count.
  const totalCount = plan.billingInterval === "YEARLY" ? 20 : 120;

    /**
     * Create Razorpay Subscription
     */

    const razorpaySubscription =await razorpay.subscriptions.create({
      plan_id: plan.razorpayPlanId,
    total_count: totalCount,
    customer_notify: 1,
    start_at: startAt,
    addons: [
      {
        item: {
          name: `${plan.trialDays}-day trial`,
          amount: Number(plan.trialAmount) * 100,
          currency: "INR",
        },
      },
    ],
    notes: { userId: user.id },
      });

        // upsert because Subscription.userId is unique — a previously CANCELLED/EXPIRED
        // row for this user gets overwritten rather than creating a duplicate.
        const subscription = await prisma.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            planId: plan.id,
            razorpaySubscriptionId: razorpaySubscription.id,
            status: "CREATED",
            trialStartAt: new Date(),
            trialEndAt,
          },
          update: {
            planId: plan.id,
            razorpaySubscriptionId: razorpaySubscription.id,
            status: "CREATED",
            trialStartAt: new Date(),
            trialEndAt,
            cancelledAt: null,
            expiresAt: null,
          },
        });
      

    /**
     * Return Checkout Data
     */

    return NextResponse.json(
      {
        message:
          "Subscription created successfully.",
        data: {
          key:
            process.env.RAZORPAY_KEY_ID,
          subscriptionId:razorpaySubscription.id,
          plan: {
            id: plan.id,
            name: plan.name,
            description: plan.description,
            price: Number(plan.price),
            trialAmount: Number(plan.trialAmount),
            trialDays:plan.trialDays,
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Create Subscription Error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to create subscription.",

        error:
          process.env.NODE_ENV ===
          "development"
            ? error.message
            : undefined,
      },
      {
        status: 500,
      }
    );
  }
}