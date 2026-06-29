import prisma from '@/lib/prisma'

const lessonInclude = {
  section: {
    select: {
      id: true,
      title: true,
      courseId: true,
    },
  },
}

export async function createLesson(data) {
  return prisma.lesson.create({
    data,
    include: lessonInclude,
  })
}

export async function findLessons(filters = {}) {
  const where = {}

  if (filters.sectionId) {
    where.sectionId = filters.sectionId
  }

  return prisma.lesson.findMany({
    where,
    orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
    include: lessonInclude,
  })
}

export async function findLessonById(id) {
  return prisma.lesson.findUnique({
    where: { id },
    include: lessonInclude,
  })
}

export async function updateLesson(id, data) {
  return prisma.lesson.update({
    where: { id },
    data,
    include: lessonInclude,
  })
}

export async function deleteLesson(id) {
  return prisma.lesson.delete({
    where: { id },
  })
}
