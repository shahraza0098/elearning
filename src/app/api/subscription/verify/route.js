import crypto from "crypto";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import  prisma  from "@/lib/prisma";

export async function POST(req) {
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature,
  } = await req.json();

  if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
    .digest("hex");

  if (expected !== razorpay_signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // This is just for instant UI feedback — the webhook handler is the
  // authoritative writer for Subscription/Payment status, since it's the
  // only thing Razorpay guarantees will fire even if the app is closed
  // right after checkout.
  const subscription = await prisma.subscription.findUnique({
    where: { razorpaySubscriptionId: razorpay_subscription_id },
  });

  return NextResponse.json({
    ok: true,
    status: subscription?.status ?? "CREATED",
  });
}
