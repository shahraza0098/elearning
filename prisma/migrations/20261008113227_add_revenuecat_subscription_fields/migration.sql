-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_planId_fkey";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "environment" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'RAZORPAY',
ADD COLUMN     "revenueCatAppUserId" TEXT,
ADD COLUMN     "revenueCatEntitlementId" TEXT,
ADD COLUMN     "revenueCatProductId" TEXT,
ADD COLUMN     "store" TEXT,
ADD COLUMN     "willRenew" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "planId" DROP NOT NULL,
ALTER COLUMN "razorpaySubscriptionId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "processedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WebhookEvent_eventId_key" ON "WebhookEvent"("eventId");

-- CreateIndex
CREATE INDEX "WebhookEvent_eventId_idx" ON "WebhookEvent"("eventId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
