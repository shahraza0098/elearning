import prisma from "@/lib/prisma";

export async function getRecentPayments() {
  const payments = await prisma.payment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
    select: {
      id: true,
      amount: true,
      status: true,
      paymentType: true,
      createdAt: true,
      paidAt: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      subscription: {
        select: {
          plan: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return payments.map((payment) => ({
    id: payment.id,
    amount: Number(payment.amount),
    status: payment.status,
    paymentType: payment.paymentType,
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    studentName: payment.user?.name || "Unknown Student",
    studentEmail: payment.user?.email || "No email",
    planName: payment.subscription?.plan?.name || "Manual payment",
  }));
}
