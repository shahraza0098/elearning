

import prisma from '@/lib/prisma'

const courseInclude = {
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
      bannerUrl: true,
    },
  },
  _count: {
    select: {
      sections: true,
      reviews: true,
      certificates: true,
    },
  },
}

export async function createCourse(data) {
  return prisma.course.create({
    data,
    include: courseInclude,
  })
}

export async function findCourses(filters = {}) {
  const where = {
    deletedAt: null,
  }

  if (filters.categoryId) {
    where.categoryId = filters.categoryId
  }

  if (typeof filters.isPublished === 'boolean') {
    where.isPublished = filters.isPublished
  }

  return prisma.course.findMany({
    where,
    orderBy: [{ position: 'asc' }, { createdAt: 'desc' }],
    include: courseInclude,
  })
}

export async function findCourseById(id) {
  return prisma.course.findFirst({
    where: {
      id,
      deletedAt: null,
    },
    include: {
      ...courseInclude,
      sections: {
        where: {},
        orderBy: {
          position: 'asc',
        },
        select: {
          id: true,
          title: true,
          position: true,
          _count: {
            select: {
              lessons: true,
            },
          },
        },
      },
    },
  })
}

export async function updateCourse(id, data) {
  return prisma.course.update({
    where: { id },
    data,
    include: courseInclude,
  })
}

export async function softDeleteCourse(id) {
  return prisma.course.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  })
}
