import prisma from "@/lib/prisma";

const DAY_RANGE = 30;

function getDayStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getDateKey(date) {
  const current = new Date(date);

  return [
    current.getFullYear(),
    String(current.getMonth() + 1).padStart(2, "0"),
    String(current.getDate()).padStart(2, "0"),
  ].join("-");
}

export async function getRevenueChart() {
  const today = new Date();
  const startDate = getDayStart(new Date(today));
  startDate.setDate(startDate.getDate() - (DAY_RANGE - 1));

  const payments = await prisma.payment.findMany({
    where: {
      status: "SUCCESS",
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const revenueByDay = payments.reduce((accumulator, payment) => {
    const key = getDateKey(payment.createdAt);

    accumulator.set(
      key,
      (accumulator.get(key) || 0) + Number(payment.amount)
    );

    return accumulator;
  }, new Map());

  return Array.from({ length: DAY_RANGE }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: revenueByDay.get(getDateKey(date)) || 0,
    };
  });
}
