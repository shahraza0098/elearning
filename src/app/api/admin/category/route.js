import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import {
  createCategoryService,
  getCategoriesService,
} from '@/services/category.service'
import { validateCreateCategoryInput } from '@/validators/category.validator'

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const body = await request.json()
    const validation = validateCreateCategoryInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const category = await createCategoryService(validation.data)

    return NextResponse.json(
      { message: 'Category created successfully', data: category },
      { status: 201 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Category name or slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to create category', error: error?.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const categories = await getCategoriesService()

    return NextResponse.json(
      { message: 'Categories fetched successfully', data: categories },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch categories', error: error?.message },
      { status: 500 }
    )
  }
}
