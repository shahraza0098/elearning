import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import {
  deleteLessonService,
  getLessonByIdService,
  updateLessonService,
} from '@/services/lesson.service'
import { getSectionByIdService } from '@/services/section.service'
import { validateUpdateLessonInput } from '@/validators/lesson.validator'

export async function GET(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const lesson = await getLessonByIdService(id)

    if (!lesson) {
      return NextResponse.json(
        { message: 'Lesson not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Lesson fetched successfully', data: lesson },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch lesson', error: error?.message },
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
    const validation = validateUpdateLessonInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const existingLesson = await getLessonByIdService(id)

    if (!existingLesson) {
      return NextResponse.json(
        { message: 'Lesson not found' },
        { status: 404 }
      )
    }

    if (validation.data.sectionId) {
      const section = await getSectionByIdService(validation.data.sectionId)

      if (!section) {
        return NextResponse.json(
          { message: 'Section not found' },
          { status: 404 }
        )
      }
    }

    const lesson = await updateLessonService(id, validation.data)

    return NextResponse.json(
      { message: 'Lesson updated successfully', data: lesson },
      { status: 200 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Lesson slug or videoId already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to update lesson', error: error?.message },
      { status: 500 }
    )
  }
}

export async function DELETE(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const existingLesson = await getLessonByIdService(id)

    if (!existingLesson) {
      return NextResponse.json(
        { message: 'Lesson not found' },
        { status: 404 }
      )
    }

    await deleteLessonService(id)

    return NextResponse.json(
      { message: 'Lesson deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to delete lesson', error: error?.message },
      { status: 500 }
    )
  }
}
