import { NextResponse } from 'next/server'

import { requireAdmin } from '@/lib/require-admin'

const DEFAULT_UPLOAD_BASE_URL = 'https://video.bunnycdn.com'

function getBunnyConfig() {
  const apiKey = process.env.BUNNY_STREAM_API_KEY?.trim()
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID?.trim()
  const uploadBaseUrl = process.env.BUNNY_STREAM_UPLOAD_BASE_URL?.trim() || DEFAULT_UPLOAD_BASE_URL

  return { apiKey, libraryId, uploadBaseUrl }
}

function getFileName(file) {
  const originalName = typeof file.name === 'string' ? file.name : 'lesson-video'
  return originalName.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '') || 'lesson-video'
}

export async function POST(request) {
  const authResult = await requireAdmin()
  if (authResult.error) return authResult.error

  try {
    const formData = await request.formData()
    const file = formData.get('file')
    const title = formData.get('title')?.toString()?.trim() || 'Lesson video'

    if (!(file instanceof File)) {
      return NextResponse.json(
        { message: 'Video file is required' },
        { status: 400 }
      )
    }

    const { apiKey, libraryId, uploadBaseUrl } = getBunnyConfig()

    if (!apiKey || !libraryId) {
      return NextResponse.json(
        {
          message: 'Bunny Stream is not configured. Set BUNNY_STREAM_API_KEY and BUNNY_STREAM_LIBRARY_ID.',
        },
        { status: 500 }
      )
    }

    const createResponse = await fetch(`${uploadBaseUrl}/library/${libraryId}/videos`, {
      method: 'POST',
      headers: {
        AccessKey: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        collectionId: null,
      }),
    })

    const createPayload = await createResponse.json().catch(() => null)

    if (!createResponse.ok) {
      throw new Error(createPayload?.message || 'Failed to create Bunny Stream video entry')
    }

    const videoId = createPayload?.guid || createPayload?.videoId || createPayload?.id

    if (!videoId) {
      throw new Error('Bunny Stream did not return a video ID')
    }

    const uploadResponse = await fetch(`${uploadBaseUrl}/library/${libraryId}/videos/${videoId}`, {
      method: 'PUT',
      headers: {
        AccessKey: apiKey,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: Buffer.from(await file.arrayBuffer()),
    })

    if (!uploadResponse.ok) {
      const uploadPayload = await uploadResponse.text().catch(() => '')
      throw new Error(uploadPayload || 'Failed to upload video to Bunny Stream')
    }

    return NextResponse.json(
      {
        message: 'Video uploaded to Bunny Stream successfully',
        data: {
          videoId,
          title,
          fileName: getFileName(file),
          playbackUrl: `https://iframe.mediadelivery.net/play/${videoId}`,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: error?.message || 'Failed to upload video to Bunny Stream',
      },
      { status: 500 }
    )
  }
}
