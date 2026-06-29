import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { getCourseByIdService } from '@/services/course.service'
import {
  deleteSectionService,
  getSectionByIdService,
  updateSectionService,
} from '@/services/section.service'
import { validateUpdateSectionInput } from '@/validators/section.validator'

export async function GET(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const section = await getSectionByIdService(id)

    if (!section) {
      return NextResponse.json(
        { message: 'Section not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Section fetched successfully', data: section },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch section', error: error?.message },
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
    const validation = validateUpdateSectionInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const existingSection = await getSectionByIdService(id)

    if (!existingSection) {
      return NextResponse.json(
        { message: 'Section not found' },
        { status: 404 }
      )
    }

    if (validation.data.courseId) {
      const course = await getCourseByIdService(validation.data.courseId)

      if (!course) {
        return NextResponse.json(
          { message: 'Course not found' },
          { status: 404 }
        )
      }
    }

    const section = await updateSectionService(id, validation.data)

    return NextResponse.json(
      { message: 'Section updated successfully', data: section },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to update section', error: error?.message },
      { status: 500 }
    )
  }
}

export async function DELETE(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const existingSection = await getSectionByIdService(id)

    if (!existingSection) {
      return NextResponse.json(
        { message: 'Section not found' },
        { status: 404 }
      )
    }

    await deleteSectionService(id)

    return NextResponse.json(
      { message: 'Section deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete section', error: error?.message },
      { status: 500 }
    )
  }
}
