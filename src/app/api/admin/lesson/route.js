import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { getLessonsService, createLessonService } from '@/services/lesson.service'
import { getSectionByIdService } from '@/services/section.service'
import { validateCreateLessonInput } from '@/validators/lesson.validator'

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const body = await request.json()
    const validation = validateCreateLessonInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const section = await getSectionByIdService(validation.data.sectionId)

    if (!section) {
      return NextResponse.json(
        { message: 'Section not found' },
        { status: 404 }
      )
    }

    const lesson = await createLessonService(validation.data)

    return NextResponse.json(
      { message: 'Lesson created successfully', data: lesson },
      { status: 201 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Lesson slug or videoId already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to create lesson', error: error?.message },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { searchParams } = new URL(request.url)
    const sectionId = searchParams.get('sectionId')?.trim() || undefined

    if (sectionId) {
      const section = await getSectionByIdService(sectionId)

      if (!section) {
        return NextResponse.json(
          { message: 'Section not found' },
          { status: 404 }
        )
      }
    }

    const lessons = await getLessonsService({ sectionId })

    return NextResponse.json(
      { message: 'Lessons fetched successfully', data: lessons },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch lessons', error: error?.message },
      { status: 500 }
    )
  }
}
