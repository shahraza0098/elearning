import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import {
  deleteCategoryService,
  getCategoryByIdService,
  updateCategoryService,
} from '@/services/category.service'
import { validateUpdateCategoryInput } from '@/validators/category.validator'

export async function GET(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const category = await getCategoryByIdService(id)

    if (!category) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: 'Category fetched successfully', data: category },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to fetch category', error: error?.message },
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
    const validation = validateUpdateCategoryInput(body)

    if (!validation.valid) {
      return NextResponse.json(
        { message: 'Validation failed', errors: validation.errors },
        { status: 400 }
      )
    }

    const existingCategory = await getCategoryByIdService(id)

    if (!existingCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    const category = await updateCategoryService(id, validation.data)

    return NextResponse.json(
      { message: 'Category updated successfully', data: category },
      { status: 200 }
    )
  } catch (error) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { message: 'Category name or slug already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to update category', error: error?.message },
      { status: 500 }
    )
  }
}

export async function DELETE(_request, { params }) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const { id } = await params
    const existingCategory = await getCategoryByIdService(id)

    if (!existingCategory) {
      return NextResponse.json(
        { message: 'Category not found' },
        { status: 404 }
      )
    }

    await deleteCategoryService(id)

    return NextResponse.json(
      { message: 'Category deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    if (error?.code === 'P2003') {
      return NextResponse.json(
        { message: 'Cannot delete category with linked courses' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { message: 'Failed to delete category', error: error?.message },
      { status: 500 }
    )
  }
}
