import {
  createSection,
  deleteSection,
  findSectionById,
  findSections,
  updateSection,
} from '@/repositories/section.repository'

export async function createSectionService(payload) {
  return createSection(payload)
}

export async function getSectionsService(filters) {
  return findSections(filters)
}

export async function getSectionByIdService(id) {
  return findSectionById(id)
}

export async function updateSectionService(id, payload) {
  return updateSection(id, payload)
}

export async function deleteSectionService(id) {
  return deleteSection(id)
}
