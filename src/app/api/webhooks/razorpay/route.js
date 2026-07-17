import crypto from "crypto";
import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

function verifySignature(body, signature) {
  if (!signature) return false;
  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return expected === signature;
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log("**********Webhook trigger********")
  const event = JSON.parse(body);
  const sub = event.payload?.subscription?.entity;
  const payment = event.payload?.payment?.entity;
  const invoice = event.payload?.invoice?.entity;

  // Every subscription-related event carries the razorpay subscription id —
  // look up our row once up front.
  const dbSubscription = sub
    ? await prisma.subscription.findUnique({
        where: { razorpaySubscriptionId: sub.id },
        include: { plan: true },
      })
    : null;

  switch (event.event) {
    // ── ₹1 trial charge succeeded, autopay mandate registered ──
    case "subscription.authenticated": {
      if (!dbSubscription) break;

      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: {
          status: "AUTHENTICATED",
          razorpayCustomerId: sub.customer_id ?? dbSubscription.razorpayCustomerId,
        },
      });

      if (payment) {
        await prisma.payment.create({
          data: {
            amount: Number(dbSubscription.plan.trialAmount),
            status: "SUCCESS",
            paymentType: "TRIAL",
            razorpayPaymentId: payment.id,
            paidAt: new Date(payment.created_at * 1000),
            userId: dbSubscription.userId,
            subscriptionId: dbSubscription.id,
          },
        });
      }
      break;
    }

    // ── trial ended, first ₹499 (or whichever plan) cycle started ──
    case "subscription.activated": {
      if (!dbSubscription) break;

      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: {
          status: "ACTIVE",
          currentPeriodStart: sub.current_start ? new Date(sub.current_start * 1000) : null,
          currentPeriodEnd: sub.current_end ? new Date(sub.current_end * 1000) : null,
          nextChargeAt: sub.charge_at ? new Date(sub.charge_at * 1000) : null,
        },
      });
      break;
    }

    // ── a recurring charge succeeded (trial cycle or any later monthly cycle) ──
    case "subscription.charged": {
      if (!dbSubscription) break;

      await prisma.$transaction([
        prisma.subscription.update({
          where: { id: dbSubscription.id },
          data: {
            status: "ACTIVE",
            currentPeriodStart: sub.current_start ? new Date(sub.current_start * 1000) : null,
            currentPeriodEnd: sub.current_end ? new Date(sub.current_end * 1000) : null,
            nextChargeAt: sub.charge_at ? new Date(sub.charge_at * 1000) : null,
          },
        }),
        prisma.payment.create({
          data: {
            amount: payment ? payment.amount / 100 : 0,
            status: "SUCCESS",
            paymentType: "RECURRING",
            razorpayPaymentId: payment?.id,
            razorpayInvoiceId: invoice?.id,
            paidAt: payment ? new Date(payment.created_at * 1000) : new Date(),
            userId: dbSubscription.userId,
            subscriptionId: dbSubscription.id,
          },
        }),
      ]);
      break;
    }

    // ── a charge attempt failed; Razorpay will auto-retry ──
    case "subscription.pending": {
      if (!dbSubscription) break;

      await prisma.payment.create({
        data: {
          amount: payment ? payment.amount / 100 : Number(dbSubscription.plan.price),
          status: "FAILED",
          paymentType: "RECURRING",
          razorpayPaymentId: payment?.id,
          failureReason: payment?.error_description ?? "Charge attempt failed, retrying",
          userId: dbSubscription.userId,
          subscriptionId: dbSubscription.id,
        },
      });
      break;
    }

    // ── all retries exhausted — cut off access here ──
    case "subscription.halted": {
      if (!dbSubscription) break;

      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: { status: "HALTED" },
      });
      break;
    }

    case "subscription.cancelled": {
      if (!dbSubscription) break;

      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: { status: "CANCELLED", cancelledAt: new Date() },
      });
      break;
    }

    case "subscription.completed": {
      if (!dbSubscription) break;

      await prisma.subscription.update({
        where: { id: dbSubscription.id },
        data: { status: "COMPLETED", expiresAt: new Date() },
      });
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ status: "ok" });
}
