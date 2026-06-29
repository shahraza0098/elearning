import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { getCourseByIdService } from '@/services/course.service'
import {
  createSectionService,
  getSectionsService,
} from '@/services/section.service'
import { validateCreateSectionInput } from '@/validators/section.validator'

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const body = await request.json()
    const validation = validateCreateSectionInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const course = await getCourseByIdService(validation.data.courseId)

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      )
    }

    const section = await createSectionService(validation.data)

    return NextResponse.json(
      { message: 'Section created successfully', data: section },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to create section', error: error?.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')?.trim() || undefined

    if (courseId) {
      const course = await getCourseByIdService(courseId)

      if (!course) {
        return NextResponse.json(
          { message: 'Course not found' },
          { status: 404 }
        )
      }
    }

    const sections = await getSectionsService({ courseId })

    return NextResponse.json(
      { message: 'Sections fetched successfully', data: sections },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch sections', error: error?.message },
      { status: 500 }
    )
  }
}
