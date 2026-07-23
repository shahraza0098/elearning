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

export async function getStudentGrowth() {
  const today = new Date();
  const startDate = getDayStart(new Date(today));
  startDate.setDate(startDate.getDate() - (DAY_RANGE - 1));

  const [studentsBeforeWindow, studentsInWindow] = await Promise.all([
    prisma.user.count({
      where: {
        role: "STUDENT",
        createdAt: {
          lt: startDate,
        },
      },
    }),
    prisma.user.findMany({
      where: {
        role: "STUDENT",
        createdAt: {
          gte: startDate,
        },
      },
      select: {
        createdAt: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    }),
  ]);

  const newStudentsByDay = studentsInWindow.reduce((accumulator, student) => {
    const key = getDateKey(student.createdAt);

    accumulator.set(key, (accumulator.get(key) || 0) + 1);

    return accumulator;
  }, new Map());

  let runningTotal = studentsBeforeWindow;

  return Array.from({ length: DAY_RANGE }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);

    const newStudents = newStudentsByDay.get(getDateKey(date)) || 0;
    runningTotal += newStudents;

    return {
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      newStudents,
      totalStudents: runningTotal,
    };
  });
}
