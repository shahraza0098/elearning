import {
  createLesson,
  deleteLesson,
  findLessonById,
  findLessons,
  updateLesson,
} from '@/repositories/lesson.repository'

export async function createLessonService(payload) {
  return createLesson(payload)
}

export async function getLessonsService(filters) {
  return findLessons(filters)
}

export async function getLessonByIdService(id) {
  return findLessonById(id)
}

export async function updateLessonService(id, payload) {
  return updateLesson(id, payload)
}

export async function deleteLessonService(id) {
  return deleteLesson(id)
}
