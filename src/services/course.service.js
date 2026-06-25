

import {
  createCourse,
  findCourseById,
  findCourses,
  softDeleteCourse,
  updateCourse,
} from '@/repositories/course.repository'

export async function createCourseService(payload) {
  return createCourse(payload)
}

export async function getCoursesService(filters) {
  return findCourses(filters)
}

export async function getCourseByIdService(id) {
  return findCourseById(id)
}

export async function updateCourseService(id, payload) {
  return updateCourse(id, payload)
}

export async function deleteCourseService(id) {
  return softDeleteCourse(id)
}
