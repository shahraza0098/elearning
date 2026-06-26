import { randomUUID } from 'crypto'
import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'
import { supabaseAdmin } from '@/utils/supabase/admin'

const COURSE_THUMBNAIL_BUCKET = 'GyanMaster'
const MAX_FILE_SIZE = 5 * 1024 * 1024

function sanitizeFileName(fileName) {
  return fileName.replace(/[^a-zA-Z0-9.-]/g, '-').toLowerCase()
}

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Course banner image file is required' },
        { status: 400 }
      )
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { message: 'Only image uploads are allowed' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'Image must be 5MB or smaller' },
        { status: 400 }
      )
    }

    const fileExt = file.name.includes('.') ? file.name.split('.').pop() : 'jpg'
    const safeName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ''))
    const filePath = `courses/${Date.now()}-${randomUUID()}-${safeName}.${fileExt}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error: uploadError } = await supabaseAdmin.storage
      .from(COURSE_THUMBNAIL_BUCKET)
      .upload(filePath, buffer, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      return NextResponse.json(
        { message: 'Failed to upload image', error: uploadError.message },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(COURSE_THUMBNAIL_BUCKET)
      .getPublicUrl(filePath)

    return NextResponse.json(
      {
        message: 'Course banner uploaded successfully',
        data: {
          path: filePath,
          publicUrl: publicUrlData.publicUrl,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to upload course banner image', error: error?.message },
      { status: 500 }
    )
  }
}
