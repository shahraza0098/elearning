import { PrismaClient } from "../src/generated/prisma/client.js";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding...");

  // Create Plan
  const plan = await prisma.plan.upsert({
    where: {
      razorpayPlanId: "dummy_plan_001",
    },
    update: {},
    create: {
      name: "Premium Plan",
      description: "Dummy Premium Plan",
      price: 999,
      billingInterval: "MONTHLY",
      trialDays: 30,
      trialAmount: 1,
      razorpayPlanId: "dummy_plan_001",
      isActive: true,
    },
  });

  // IMPORTANT:
  // Replace this with the Clerk User ID of your Expo login
  const clerkUserId = "user_3G774hP43qsYinPAiMpsoJM18KH";

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId,
    },
  });

  if (!user) {
    throw new Error(
      `User with clerkUserId ${clerkUserId} not found`
    );
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      onboardingComplete: true,
    },
  });

  await prisma.subscription.upsert({
    where: {
      userId: user.id,
    },
    update: {
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      nextChargeAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    },
    create: {
      userId: user.id,
      planId: plan.id,
      razorpaySubscriptionId: "sub_dummy_001",
      status: "ACTIVE",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
      nextChargeAt: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    },
  });

  console.log("Seed completed.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });