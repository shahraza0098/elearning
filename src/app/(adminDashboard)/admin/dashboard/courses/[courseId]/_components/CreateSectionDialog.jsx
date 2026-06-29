'use client'

import { useMemo, useState } from 'react'

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

function buildInitialState(defaultPosition) {
  return {
    title: '',
    position: String(defaultPosition),
  }
}

export default function CreateSectionDialog({
  courseId,
  defaultPosition,
  onCreated,
}) {
  const initialState = useMemo(
    () => buildInitialState(defaultPosition),
    [defaultPosition]
  )
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState(initialState)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const resetState = () => {
    setFormState(buildInitialState(defaultPosition))
    setErrorMessage('')
  }

  const handleOpenChange = (nextOpen) => {
    setOpen(nextOpen)

    if (!nextOpen) {
      resetState()
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSaving(true)
    setErrorMessage('')

    try {
      const response = await fetch('/api/admin/section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formState.title,
          position: Number(formState.position),
          courseId,
        }),
      })

      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(
          payload?.errors?.join(', ') ||
            payload?.message ||
            'Failed to create section.'
        )
      }

      onCreated(payload.data)
      handleOpenChange(false)
    } catch (error) {
      setErrorMessage(error.message || 'Failed to create section.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Add New Section</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Section</DialogTitle>
          <DialogDescription>
            Add a new section to this course and place it in the right order.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Section title
            </label>
            <input
              required
              type="text"
              value={formState.title}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              placeholder="Introduction"
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
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Create Section'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
