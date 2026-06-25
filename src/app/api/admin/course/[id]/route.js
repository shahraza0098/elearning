
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { getCategoryByIdService } from '@/services/category.service'
import {
  deleteCourseService,
  getCourseByIdService,
  updateCourseService,
} from '@/services/course.service'
import { validateUpdateCourseInput } from '@/validators/course.validator'

export async function GET(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const course = await getCourseByIdService(id)

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Course fetched successfully', data: course },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch course', error: error?.message },
      { status: 500 }
    )
  }
}

export async function PATCH(request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const body = await request.json()
    const validation = validateUpdateCourseInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const existingCourse = await getCourseByIdService(id)

    if (!existingCourse) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    if (validation.data.categoryId) {
      const category = await getCategoryByIdService(validation.data.categoryId)

      if (!category) {
        return NextResponse.json(
          { message: 'Category not found' },
          { status: 404 }
        )
      }
    }

    const course = await updateCourseService(id, validation.data)

    return NextResponse.json(
      { message: 'Course updated successfully', data: course },
      { status: 200 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Course slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to update course', error: error?.message },
      { status: 500 }
    )
  }
}

export async function DELETE(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const existingCourse = await getCourseByIdService(id)

    if (!existingCourse) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    await deleteCourseService(id)

    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete course', error: error?.message },
      { status: 500 }
    )
  }
}
