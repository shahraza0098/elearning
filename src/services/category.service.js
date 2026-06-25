import {
  createCategory,
  deleteCategory,
  findCategories,
  findCategoryById,
  updateCategory,
} from '@/repositories/category.repository'

export async function createCategoryService(payload) {
  return createCategory(payload)
}

export async function getCategoriesService() {
  return findCategories()
}

export async function getCategoryByIdService(id) {
  return findCategoryById(id)
}

export async function updateCategoryService(id, payload) {
  return updateCategory(id, payload)
}

export async function deleteCategoryService(id) {
  return deleteCategory(id)
}
