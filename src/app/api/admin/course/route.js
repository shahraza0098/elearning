import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { getCategoryByIdService } from '@/services/category.service'
import {
  createCourseService,
  getCoursesService,
} from '@/services/course.service'
import { validateCreateCourseInput } from '@/validators/course.validator'

function parseIsPublishedParam(value) {
  if (value === null) {
    return { value: undefined }
  }

  if (value === 'true') {
    return { value: true }
  }

  if (value === 'false') {
    return { value: false }
  }

  return { error: 'isPublished query parameter must be true or false' }
}

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const body = await request.json()
    const validation = validateCreateCourseInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const category = await getCategoryByIdService(validation.data.categoryId)

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    const course = await createCourseService(validation.data)

    return NextResponse.json(
      { message: 'Course created successfully', data: course },
      { status: 201 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Course slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to create course', error: error?.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('categoryId')?.trim() || undefined
    const isPublishedResult = parseIsPublishedParam(
      searchParams.get('isPublished')
    )

    if (isPublishedResult.error) {
      return NextResponse.json(
        { message: 'Validation failed', errors: [isPublishedResult.error] },
        { status: 400 }
      )
    }

    if (categoryId) {
      const category = await getCategoryByIdService(categoryId)

      if (!category) {
        return NextResponse.json(
          { message: 'Category not found' },
          { status: 404 }
        )
      }
    }

    const courses = await getCoursesService({
      categoryId,
      isPublished: isPublishedResult.value,
    })

    return NextResponse.json(
      { message: 'Courses fetched successfully', data: courses },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch courses', error: error?.message },
      { status: 500 }
    )
  }
}
