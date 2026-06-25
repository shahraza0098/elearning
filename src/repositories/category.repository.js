import prisma from '@/lib/prisma'

export async function createCategory(data) {
  return prisma.category.create({
    data,
  })
}

export async function findCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: {
          courses: true,
        },
      },
    },
  })
}

export async function findCategoryById(id) {
  return prisma.category.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          courses: true,
        },
      },
    },
  })
}

export async function updateCategory(id, data) {
  return prisma.category.update({
    where: { id },
    data,
  })
}

export async function deleteCategory(id) {
  return prisma.category.delete({
    where: { id },
  })
}
