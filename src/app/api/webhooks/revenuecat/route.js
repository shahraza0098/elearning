import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    // 1. Verify Authorization
    const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
    const secret = process.env.REVENUECAT_WEBHOOK_SECRET;

    if (!secret || authHeader !== `Bearer ${secret}`) {
      console.warn("RevenueCat webhook: Unauthorized");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse payload
    const body = await req.json();
    const event = body.event;

    if (!event) {
      return NextResponse.json({ error: "Malformed payload" }, { status: 400 });
    }

    const {
      id: eventId,
      type: eventType,
      app_user_id,
      original_app_user_id,
      aliases,
      product_id: productId,
      entitlement_ids: entitlementIds,
      environment,
      store,
      expiration_at_ms,
      purchased_at_ms,
    } = event;

    // 3. Idempotency Check
    const existingEvent = await prisma.webhookEvent.findUnique({
      where: { eventId },
    });

    if (existingEvent) {
      console.log(`RevenueCat webhook: Event ${eventId} already processed. Skipping.`);
      return NextResponse.json({ status: "ok" });
    }

    // 4. Find the User using possible identities
    let clerkUserIdsToCheck = [];
    if (app_user_id) clerkUserIdsToCheck.push(app_user_id);
    if (original_app_user_id) clerkUserIdsToCheck.push(original_app_user_id);
    if (aliases && Array.isArray(aliases)) {
      clerkUserIdsToCheck.push(...aliases);
    }
    clerkUserIdsToCheck = [...new Set(clerkUserIdsToCheck)];

    let user = null;
    let clerkUserId = null;

    for (const cid of clerkUserIdsToCheck) {
      user = await prisma.user.findUnique({ where: { clerkUserId: cid } });
      if (user) {
        clerkUserId = cid;
        break;
      }
    }

    if (!user) {
      console.warn(`RevenueCat webhook: User not found for any known identities: ${clerkUserIdsToCheck.join(", ")}`);
      await prisma.webhookEvent.create({
        data: { eventId, provider: "REVENUECAT", eventType },
      });
      return NextResponse.json({ status: "ignored_user_not_found" });
    }

    // 5. Determine new subscription status
    let statusUpdate = null;
    let willRenew = true;
    let currentPeriodEnd = expiration_at_ms ? new Date(expiration_at_ms) : null;
    let currentPeriodStart = purchased_at_ms ? new Date(purchased_at_ms) : null;

    switch (eventType) {
      case "INITIAL_PURCHASE":
      case "RENEWAL":
      case "UNCANCELLATION":
      case "PRODUCT_CHANGE":
      case "SUBSCRIPTION_EXTENDED":
        statusUpdate = "ACTIVE";
        willRenew = true;
        break;
      case "CANCELLATION":
        // User cancelled auto-renew, but still has access until expiration
        statusUpdate = "ACTIVE";
        willRenew = false;
        break;
      case "EXPIRATION":
        statusUpdate = "EXPIRED";
        willRenew = false;
        break;
      case "SUBSCRIPTION_PAUSED":
        statusUpdate = "PAUSED";
        willRenew = false;
        break;
      case "BILLING_ISSUE":
        // Do not blindly revoke access. Google Play provides a grace period.
        const nowMs = Date.now();
        const isGracePeriod = expiration_at_ms && expiration_at_ms > nowMs;
        statusUpdate = isGracePeriod ? "ACTIVE" : "HALTED";
        willRenew = true; // Typically Google Play retries billing
        break;
      default:
        break;
    }

    // 6. Update Database
    if (statusUpdate) {
      await prisma.$transaction([
        prisma.subscription.upsert({
          where: { userId: user.id },
          create: {
            userId: user.id,
            status: statusUpdate,
            provider: "REVENUECAT",
            revenueCatAppUserId: clerkUserId,
            revenueCatProductId: productId,
            revenueCatEntitlementId: entitlementIds && entitlementIds.length > 0 ? entitlementIds[0] : null,
            store,
            environment,
            willRenew,
            currentPeriodStart,
            currentPeriodEnd,
            ...(statusUpdate === "EXPIRED" ? { expiresAt: new Date() } : {}),
            ...(eventType === "CANCELLATION" ? { cancelledAt: new Date() } : {}),
          },
          update: {
            status: statusUpdate,
            provider: "REVENUECAT",
            revenueCatAppUserId: clerkUserId,
            revenueCatProductId: productId,
            revenueCatEntitlementId: entitlementIds && entitlementIds.length > 0 ? entitlementIds[0] : null,
            store,
            environment,
            willRenew,
            ...(currentPeriodStart ? { currentPeriodStart } : {}),
            ...(currentPeriodEnd ? { currentPeriodEnd } : {}),
            ...(statusUpdate === "EXPIRED" ? { expiresAt: new Date() } : {}),
            ...(eventType === "CANCELLATION" ? { cancelledAt: new Date() } : {}),
            ...(eventType === "UNCANCELLATION" ? { cancelledAt: null } : {}),
          },
        }),
        prisma.webhookEvent.create({
          data: { eventId, provider: "REVENUECAT", eventType },
        }),
      ]);
      console.log(`RevenueCat webhook: Successfully processed ${eventType} for ${clerkUserId}`);
    } else {
      await prisma.webhookEvent.create({
        data: { eventId, provider: "REVENUECAT", eventType },
      });
      console.log(`RevenueCat webhook: Ignored unhandled event type ${eventType}`);
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("RevenueCat webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
