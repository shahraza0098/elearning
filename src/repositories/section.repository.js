import prisma from '@/lib/prisma'

const sectionInclude = {
  course: {
    select: {
      id: true,
      title: true,
      slug: true,
    },
  },
  _count: {
    select: {
      lessons: true,
    },
  },
}

export async function createSection(data) {
  return prisma.section.create({
    data,
    include: sectionInclude,
  })
}

export async function findSections(filters = {}) {
  const where = {}

  if (filters.courseId) {
    where.courseId = filters.courseId
  }

  return prisma.section.findMany({
    where,
    orderBy: [{ position: 'asc' }, { title: 'asc' }],
    include: sectionInclude,
  })
}

export async function findSectionById(id) {
  return prisma.section.findUnique({
    where: { id },
    include: {
      ...sectionInclude,
      lessons: {
        orderBy: {
          position: 'asc',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          position: true,
          duration: true,
          isPreview: true,
          thumbnailUrl: true,
        },
      },
    },
  })
}

export async function updateSection(id, data) {
  return prisma.section.update({
    where: { id },
    data,
    include: sectionInclude,
  })
}

export async function deleteSection(id) {
  return prisma.section.delete({
    where: { id },
  })
}
