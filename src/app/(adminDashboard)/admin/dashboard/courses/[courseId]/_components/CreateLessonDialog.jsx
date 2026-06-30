'use client'

import { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import useBunnyUpload from '@/hooks/useBunnyUpload'

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function buildInitialState(defaultPosition) {
  return {
    title: '',
    slug: '',
    description: '',
    position: String(defaultPosition),
    duration: '0',
    videoId: '',
    thumbnailUrl: '',
    isPreview: false,
  }
}

export default function CreateLessonDialog({
  sectionId,
  defaultPosition,
  onCreated,
}) {
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(buildInitialState(defaultPosition))
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [selectedVideoFile, setSelectedVideoFile] = useState(null)
  const { uploadVideo, uploading } = useBunnyUpload()

  const resetState = () => {
    setFormState(buildInitialState(defaultPosition))
    setErrorMessage('')
    setSelectedVideoFile(null)
  }

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetState()
    }
  }

  const handleTitleChange = (event) => {
    const title = event.target.value

    setFormState((current) => {
      const nextSlug =
        current.slug.length === 0 || current.slug === createSlug(current.title)
          ? createSlug(title)
          : current.slug

      return {
        ...current,
        title,
        slug: nextSlug,
      }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    try {
      let videoId = formState.videoId.trim()

      if (selectedVideoFile) {
        const uploadedVideo = await uploadVideo(selectedVideoFile, formState.title)
        videoId = uploadedVideo?.videoId || videoId
      }

      if (!videoId) {
        throw new Error('Please upload a video or enter a Video ID.')
      }

      const response = await fetch('/api/admin/lesson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formState.title,
          slug: formState.slug,
          description: formState.description || undefined,
          position: Number(formState.position),
          duration: Number(formState.duration),
          videoId,
          thumbnailUrl: formState.thumbnailUrl || undefined,
          isPreview: formState.isPreview,
          sectionId,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          payload?.errors?.join(', ') ||
            payload?.message ||
            'Failed to create lesson.'
        )
      }

      onCreated(payload.data)
      handleOpenChange(false)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create lesson.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm">Add Lesson</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Lesson</DialogTitle>
          <DialogDescription>
            Add a lesson to this section with its playback and preview details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Lesson title
              </label>
              <input
                required
                type="text"
                value={formState.title}
                onChange={handleTitleChange}
                placeholder="Welcome and course roadmap"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Slug
              </label>
              <input
                required
                type="text"
                value={formState.slug}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    slug: event.target.value,
                  }))
                }
                placeholder="welcome-course-roadmap"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Position
              </label>
              <input
                required
                min="0"
                step="1"
                type="number"
                value={formState.position}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    position: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Duration (seconds)
              </label>
              <input
                required
                min="0"
                step="1"
                type="number"
                value={formState.duration}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    duration: event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Upload video for Bunny Stream
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null
                  setSelectedVideoFile(file)
                }}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
              <p className="text-sm text-muted-foreground">
                Upload a video here to create a Bunny Stream asset. Leave it blank to use a manual Video ID.
              </p>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Video ID
              </label>
              <input
                type="text"
                value={formState.videoId}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    videoId: event.target.value,
                  }))
                }
                placeholder="mux_123 or provider asset id"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Thumbnail URL
              </label>
              <input
                type="url"
                value={formState.thumbnailUrl}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    thumbnailUrl: event.target.value,
                  }))
                }
                placeholder="https://example.com/lesson-cover.jpg"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                rows={4}
                value={formState.description}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="What students will learn in this lesson..."
                className="w-full rounded-lg border border-input bg-background px-3 py-2 outline-none transition focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </div>
          </div>

          <label className="flex items-start gap-3 rounded-lg border border-border bg-muted/30 px-3 py-3">
            <input
              type="checkbox"
              checked={formState.isPreview}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  isPreview: event.target.checked,
                }))
              }
              className="mt-1 h-4 w-4"
            />
            <div>
              <p className="text-sm font-medium text-foreground">
                Make this lesson a preview
              </p>
              <p className="text-sm text-muted-foreground">
                Preview lessons can be visible to non-enrolled visitors.
              </p>
            </div>
          </label>

          {errorMessage ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          <DialogFooter className="px-0 pb-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving || uploading}>
              {uploading ? 'Uploading video...' : isSaving ? 'Saving...' : 'Create Lesson'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
