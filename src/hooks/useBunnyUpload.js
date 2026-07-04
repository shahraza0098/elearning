'use client'

import { useCallback, useRef, useState } from 'react'
import * as TUS from 'tus-js-client'

const TUS_UPLOAD_ENDPOINT = 'https://video.bunnycdn.com/tusupload'

/**
 * Hook for uploading videos directly to Bunny Stream using TUS protocol with tus-js-client.
 * Handles large files (100MB-5GB+) with pause/resume support and progress tracking.
 * Follows official Bunny Stream documentation.
 */
export default function useBunnyUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const uploadRef = useRef(null)

  const createVideoEntry = useCallback(async (title) => {
    const response = await fetch('/api/admin/upload/video', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title.trim() }),
    })

    const payload = await response.json().catch(() => null)

    if (!response.ok) {
      throw new Error(
        payload?.message || 'Failed to create Bunny Stream video entry.'
      )
    }

    return payload.data
  }, [])

  const uploadVideo = useCallback(
    async (file, title, callbacks = {}) => {
      if (!file) {
        throw new Error('Please select a video file to upload.')
      }

      if (!title || typeof title !== 'string' || title.trim().length === 0) {
        throw new Error('Please provide a video title.')
      }

      setUploading(true)
      setError('')
      setProgress(0)

      try {
        // Step 1: Create video entry in Bunny Stream
        // Returns: videoId, libraryId, authorizationSignature, authorizationExpire
        const videoEntry = await createVideoEntry(title)
        const { videoId, libraryId, authorizationSignature, authorizationExpire } =
          videoEntry

        if (!videoId || !authorizationSignature) {
          throw new Error('Failed to get authentication credentials from Bunny Stream')
        }

        callbacks.onEntryCreated?.({ videoId, title })

        // Step 2: Upload file directly to Bunny using tus-js-client
        // Following official Bunny TUS documentation
        return new Promise((resolve, reject) => {
          const upload = new TUS.Upload(file, {
            endpoint: TUS_UPLOAD_ENDPOINT,
            retryDelays: [0, 1000, 3000, 5000], // Automatic retry with exponential backoff
            chunkSize: 10 * 1024 * 1024, // 10MB chunks (Bunny recommended size)
            metadata: {
              filetype: file.type || 'video/mp4',
              filename: file.name,
              title: title.trim(),
            },
            headers: {
              // Bunny TUS authentication headers
              'AuthorizationSignature': authorizationSignature,
              'AuthorizationExpire': authorizationExpire.toString(),
              'LibraryId': libraryId.toString(),
              'VideoId': videoId,
            },
            onError: (error) => {
              const errorMessage = error?.message || 'Upload failed'
              setError(errorMessage)
              setUploading(false)
              callbacks.onError?.(error)
              reject(new Error(errorMessage))
            },
            onProgress: (bytesUploaded, bytesTotal) => {
              const uploadProgress = Math.round((bytesUploaded / bytesTotal) * 100)
              setProgress(uploadProgress)
              callbacks.onProgress?.({
                loaded: bytesUploaded,
                total: bytesTotal,
                progress: uploadProgress,
              })
            },
            onSuccess: () => {
              setProgress(100)
              setUploading(false)
              callbacks.onSuccess?.({
                videoId,
                title: title.trim(),
                playbackUrl: videoEntry.playbackUrl,
              })
              resolve(videoEntry)
            },
          })

          // Store upload reference for pause/resume/cancel control
          uploadRef.current = upload

          // Start the upload
          upload.start()
        })
      } catch (uploadError) {
        const message = uploadError?.message || 'Failed to upload video to Bunny Stream.'
        setError(message)
        setUploading(false)
        throw new Error(message)
      }
    },
    [createVideoEntry]
  )

  const pauseUpload = useCallback(() => {
    if (uploadRef.current) {
      uploadRef.current.pause()
    }
  }, [])

  const resumeUpload = useCallback(() => {
    if (uploadRef.current) {
      uploadRef.current.start()
    }
  }, [])

  const cancelUpload = useCallback(() => {
    if (uploadRef.current) {
      uploadRef.current.abort(true) // true = remove upload from storage
    }
    setUploading(false)
    setProgress(0)
    setError('')
  }, [])

  return {
    uploadVideo,
    uploading,
    error,
    progress,
    setError,
    pauseUpload,
    resumeUpload,
    cancelUpload,
  }
}
