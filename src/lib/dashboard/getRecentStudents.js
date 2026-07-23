import prisma from "@/lib/prisma";

export async function getRecentStudents() {
  const students = await prisma.user.findMany({
    where: {
      role: "STUDENT",
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      phone: true,
      createdAt: true,
      subscription: {
        select: {
          status: true,
          plan: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return students.map((student) => ({
    id: student.id,
    name: student.name,
    username: student.username,
    email: student.email,
    phone: student.phone,
    createdAt: student.createdAt,
    subscriptionStatus: student.subscription?.status || "NONE",
    planName: student.subscription?.plan?.name || "No active plan",
  }));
}
