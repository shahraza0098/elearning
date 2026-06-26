'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

function slugify(text = '') {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
}

export default function CourseForm({
  categories = [],
  onSubmit,
  onCancel,
  initialValues = null,
}) {
  const [submitError, setSubmitError] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState('')

  const {
    control,
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      categoryId: '',
      thumbnailUrl: '',
      price: '',
      position: 0,
      totalDuration: '',
      level: 'BEGINNER',
      isPublished: false,
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const title = useWatch({ control, name: 'title' })
  const categoryId = useWatch({ control, name: 'categoryId' })
  const level = useWatch({ control, name: 'level' })
  const thumbnailUrl = useWatch({ control, name: 'thumbnailUrl' })
  const isPublished = useWatch({ control, name: 'isPublished' })

  useEffect(() => {
    if (!initialValues) {
      setValue('slug', slugify(title))
    }
  }, [title, initialValues, setValue])

  useEffect(() => {
    return () => {
      if (thumbnailPreview.startsWith('blob:')) {
        URL.revokeObjectURL(thumbnailPreview)
      }
    }
  }, [thumbnailPreview])

  const handleThumbnailFileChange = (event) => {
    const file = event.target.files?.[0] ?? null

    if (thumbnailPreview.startsWith('blob:')) {
      URL.revokeObjectURL(thumbnailPreview)
    }

    setThumbnailFile(file)
    setThumbnailPreview(file ? URL.createObjectURL(file) : '')
  }

  const handleFormSubmit = async (values) => {
    setSubmitError('')

    try {
      let uploadedThumbnailUrl = values.thumbnailUrl?.trim() ?? ''

      if (thumbnailFile) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', thumbnailFile)

        const uploadResponse = await fetch(
          '/api/admin/upload/course-thumbnail',
          {
            method: 'POST',
            body: uploadFormData,
          }
        )

        const uploadPayload = await uploadResponse.json().catch(() => null)

        if (!uploadResponse.ok) {
          throw new Error(
            uploadPayload?.message ||
              'Failed to upload course banner image.'
          )
        }

        uploadedThumbnailUrl =
          uploadPayload?.data?.publicUrl ?? uploadedThumbnailUrl
      }

      if (!uploadedThumbnailUrl) {
        throw new Error(
          'Please upload a course banner image or provide a thumbnail URL.'
        )
      }

      await onSubmit({
        ...values,
        thumbnailUrl: uploadedThumbnailUrl,
        totalDuration:
          values.totalDuration === '' ||
          values.totalDuration === null ||
          values.totalDuration === undefined
            ? null
            : values.totalDuration,
      })
    } catch (error) {
      setSubmitError(error.message || 'Failed to save course.')
    }
  }

  const resolvedThumbnailPreview =
    thumbnailPreview || thumbnailUrl || initialValues?.thumbnailUrl || ''

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-6"
    >
      {/* Title */}

      <div className="space-y-2">
        <Label>Course Title</Label>

        <Input
          placeholder="React Masterclass"
          {...register('title', {
            required: 'Course title is required',
          })}
        />

        {errors.title && (
          <p className="text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Slug */}

      <div className="space-y-2">
        <Label>Slug</Label>

        <Input
          {...register('slug', {
            required: 'Slug is required',
          })}
        />

        {errors.slug && (
          <p className="text-sm text-red-500">
            {errors.slug.message}
          </p>
        )}
      </div>

      {/* Description */}

      <div className="space-y-2">
        <Label>Description</Label>

        <Textarea
          rows={5}
          placeholder="Course description..."
          {...register('description', {
            required: 'Description is required',
          })}
        />

        {errors.description && (
          <p className="text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Category */}

      <div className="space-y-2">
        <Label>Category</Label>

        <Select
          onValueChange={(value) =>
            setValue('categoryId', value)
          }
          value={categoryId || undefined}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>

          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.id}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <input
          type="hidden"
          {...register('categoryId', {
            required: 'Category is required',
          })}
        />

        {errors.categoryId && (
          <p className="text-sm text-red-500">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      {/* Thumbnail */}

      <div className="space-y-2">
        <Label>Course Banner URL</Label>

        <Input
          type="url"
          placeholder="https://images.example.com/course-cover.jpg"
          {...register('thumbnailUrl')}
        />

        <p className="text-xs text-muted-foreground">
          Paste an image URL, or upload a banner below.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Upload Course Banner</Label>

        <Input
          type="file"
          accept="image/*"
          onChange={handleThumbnailFileChange}
        />

        <p className="text-xs text-muted-foreground">
          JPG, PNG, WEBP, or similar image files up to 5MB.
        </p>

        {resolvedThumbnailPreview ? (
          <div className="relative h-44 overflow-hidden rounded-lg border bg-muted">
            <Image
              src={resolvedThumbnailPreview}
              alt="Course banner preview"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Level</Label>

          <Select
            value={level}
            onValueChange={(value) => setValue('level', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="BEGINNER">
                Beginner
              </SelectItem>
              <SelectItem value="INTERMEDIATE">
                Intermediate
              </SelectItem>
              <SelectItem value="ADVANCED">
                Advanced
              </SelectItem>
            </SelectContent>
          </Select>

          <input
            type="hidden"
            {...register('level')}
          />
        </div>

        <div className="space-y-2">
          <Label>Position</Label>

          <Input
            type="number"
            min="0"
            step="1"
            placeholder="0"
            {...register('position', {
              required: 'Position is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Position must be 0 or greater',
              },
            })}
          />

          {errors.position && (
            <p className="text-sm text-red-500">
              {errors.position.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Price</Label>

          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="499"
            {...register('price', {
              required: 'Price is required',
              valueAsNumber: true,
              min: {
                value: 0,
                message: 'Price must be 0 or greater',
              },
            })}
          />

          {errors.price && (
            <p className="text-sm text-red-500">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Total Duration (seconds)</Label>

          <Input
            type="number"
            min="0"
            step="1"
            placeholder="5400"
            {...register('totalDuration', {
              setValueAs: (value) =>
                value === '' ? '' : Number(value),
              validate: (value) =>
                value === '' ||
                (Number.isInteger(value) && value >= 0) ||
                'Duration must be a non-negative integer',
            })}
          />

          {errors.totalDuration && (
            <p className="text-sm text-red-500">
              {errors.totalDuration.message}
            </p>
          )}
        </div>
      </div>

      {/* Publish */}

      <div className="flex items-center justify-between rounded-lg border p-4">
        <div>
          <Label>Publish Course</Label>

          <p className="text-sm text-muted-foreground">
            Students can access this course only if
            published.
          </p>
        </div>

        <Switch
          checked={isPublished}
          onCheckedChange={(value) =>
            setValue('isPublished', value)
          }
        />
      </div>

      {submitError && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {submitError}
        </p>
      )}

      {/* Buttons */}

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? 'Saving...'
            : initialValues
            ? 'Update Course'
            : 'Create Course'}
        </Button>
      </div>
    </form>
  )
}
