// import { NextResponse } from 'next/server'
// import crypto from 'crypto'

// import { requireAdmin } from '@/lib/require-admin'

// const DEFAULT_BUNNY_API_URL = 'https://api.bunny.net'
// const TUS_UPLOAD_ENDPOINT = 'https://video.bunnycdn.com/tusupload'
// const AUTH_EXPIRATION_SECONDS = 24 * 60 * 60 // 24 hours

// function getBunnyConfig() {
//   const apiKey = process.env.BUNNY_STREAM_API_KEY?.trim()
//   const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID?.trim()
//   const apiUrl = process.env.BUNNY_STREAM_API_URL?.trim() || DEFAULT_BUNNY_API_URL

//   return { apiKey, libraryId, apiUrl }
// }

// /**
//  * Generates SHA256 authorization signature for Bunny TUS upload.
//  * Per Bunny documentation: SHA256(VideoId + LibraryId + ApiKey)
//  */
// function generateAuthorizationSignature(videoId, libraryId, apiKey) {
//   const toSign = `${videoId}${libraryId}${apiKey}`
//   return crypto.createHash('sha256').update(toSign).digest('hex')
// }

// /**
//  * POST /api/admin/upload/video
//  * Creates a Bunny Stream video entry and returns authentication credentials
//  * for direct TUS upload from the frontend to https://video.bunnycdn.com/tusupload
//  */
// export async function POST(request) {
//   const authResult = await requireAdmin()
//   if (authResult.error) return authResult.error

//   try {
//     const body = await request.json().catch(() => null)

//     if (!body || typeof body !== 'object') {
//       return NextResponse.json(
//         { message: 'Request body must be a JSON object' },
//         { status: 400 }
//       )
//     }

//     const { title } = body

//     if (!title || typeof title !== 'string' || title.trim().length === 0) {
//       return NextResponse.json(
//         { message: 'title is required and must be a non-empty string' },
//         { status: 400 }
//       )
//     }

//     const { apiKey, libraryId, apiUrl } = getBunnyConfig()

//     if (!apiKey || !libraryId) {
//       return NextResponse.json(
//         {
//           message: 'Bunny Stream is not configured. Set BUNNY_STREAM_API_KEY and BUNNY_STREAM_LIBRARY_ID.',
//         },
//         { status: 500 }
//       )
//     }

//     // Step 1: Create video entry in Bunny Stream
//     const createResponse = await fetch(`${apiUrl}/library/${libraryId}/videos`, {
//       method: 'POST',
//       headers: {
//         AccessKey: apiKey,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         title: title.trim(),
//       }),
//     })

//     if (!createResponse.ok) {
//       const errorPayload = await createResponse.json().catch(() => ({}))
//       throw new Error(
//         errorPayload?.message ||
//           errorPayload?.error?.message ||
//           'Failed to create Bunny Stream video entry'
//       )
//     }

//     const createPayload = await createResponse.json()
//     const videoId = createPayload?.guid || createPayload?.videoId || createPayload?.id

//     if (!videoId) {
//       throw new Error('Bunny Stream did not return a video ID')
//     }

//     // Step 2: Generate authentication credentials for TUS upload
//     // Authorization signature: SHA256(VideoId + LibraryId + ApiKey)
//     const authorizationSignature = generateAuthorizationSignature(
//       videoId,
//       libraryId,
//       apiKey
//     )

//     // Authorization expiration: current time + 24 hours (in seconds)
//     const authorizationExpire = Math.floor(Date.now() / 1000) + AUTH_EXPIRATION_SECONDS

//     return NextResponse.json(
//       {
//         message: 'Video entry created successfully. Use the provided credentials to upload directly to Bunny TUS endpoint.',
//         data: {
//           videoId,
//           title: title.trim(),
//           libraryId,
//           authorizationSignature,
//           authorizationExpire,
//           playbackUrl: `https://iframe.mediadelivery.net/play/${videoId}`,
//         },
//       },
//       { status: 201 }
//     )
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: error?.message || 'Failed to create video entry',
//       },
//       { status: 500 }
//     )
//   }
// }



//chatgpt:

import { NextResponse } from "next/server";
import { createHash } from "crypto";

import { requireAdmin } from "@/lib/require-admin";

export async function POST(req) {
  const authResult = await requireAdmin();
  if (authResult.error) return authResult.error;

  const { title } = await req.json();

  const apiKey = process.env.BUNNY_STREAM_API_KEY;
  const libraryId = process.env.BUNNY_STREAM_LIBRARY_ID;

  if (!apiKey || !libraryId) {
    return NextResponse.json(
      {
        message: "Missing Bunny configuration",
      },
      {
        status: 500,
      }
    );
  }

  // Create Bunny Video
  const response = await fetch(
    `https://video.bunnycdn.com/library/${libraryId}/videos`,
    {
      method: "POST",
      headers: {
        AccessKey: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();

    return NextResponse.json(
      {
        message: err,
      },
      {
        status: 500,
      }
    );
  }

  const video = await response.json();

  const videoId = video.guid;

  const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24;

  const signature = createHash("sha256")
    .update(`${libraryId}${apiKey}${expirationTime}${videoId}`)
    .digest("hex");

  return NextResponse.json({
    videoId,
    libraryId,
    expirationTime,
    signature,
    embedUrl: `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}`,
  });
}