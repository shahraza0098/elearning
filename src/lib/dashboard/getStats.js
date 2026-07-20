import prisma from "@/lib/prisma";

export async function getDashboardStats() {
  const now = new Date();

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const [
    totalStudents,
    activeSubscriptions,
    trialSubscriptions,
    publishedCourses,
    totalLessons,
    totalCertificates,

    todayPayments,

    monthlyPayments,
  ] = await Promise.all([
    prisma.user.count({
      where: {
        role: "STUDENT",
      },
    }),

    prisma.subscription.count({
      where: {
        status: "ACTIVE",
      },
    }),

    prisma.subscription.count({
      where: {
        status: "AUTHENTICATED",
      },
    }),

    prisma.course.count({
      where: {
        isPublished: true,
      },
    }),

    prisma.lesson.count(),

    prisma.certificate.count(),

    prisma.payment.findMany({
      where: {
        status: "SUCCESS",
        createdAt: {
          gte: startOfToday,
        },
      },
      select: {
        amount: true,
      },
    }),

    prisma.payment.findMany({
      where: {
        status: "SUCCESS",
        createdAt: {
          gte: startOfMonth,
        },
      },
      select: {
        amount: true,
      },
    }),
  ]);

  const todayRevenue = todayPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  const monthlyRevenue = monthlyPayments.reduce(
    (sum, payment) => sum + Number(payment.amount),
    0
  );

  return {
    todayRevenue,

    monthlyRevenue,

    totalStudents,

    activeSubscriptions,

    trialSubscriptions,

    publishedCourses,

    totalLessons,

    totalCertificates,
  };
}