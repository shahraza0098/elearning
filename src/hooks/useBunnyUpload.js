'use client'

import { useCallback, useState } from 'react'

export default function useBunnyUpload() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const uploadVideo = useCallback(async (file, title) => {
    if (!file) {
      throw new Error('Please choose a video file to upload.')
    }

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('title', title || file.name || 'Lesson video')

      const response = await fetch('/api/admin/upload/video', {
        method: 'POST',
        body: formData,
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          payload?.message || 'Failed to upload video to Bunny Stream.'
        )
      }

      return payload.data
    } catch (uploadError) {
      const message = uploadError.message || 'Failed to upload video to Bunny Stream.'
      setError(message)
      throw new Error(message)
    } finally {
      setUploading(false)
    }
  }, [])

  return {
    uploadVideo,
    uploading,
    error,
    setError,
  }
}
