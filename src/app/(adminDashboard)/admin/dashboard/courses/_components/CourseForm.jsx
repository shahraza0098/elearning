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
      className="mx-auto max-w-4xl space-y-8 pb-10"
    >
      {submitError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-medium">Hold up!</p>
          <p>{submitError}</p>
        </div>
      )}

      {/* Basic Information Section */}
      <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Basic Information
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Provide the core details and description for this course.
          </p>
        </div>
        
        <div className="h-px bg-border" />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="e.g. React Masterclass"
              {...register('title', {
                required: 'Course title is required',
              })}
            />
            {errors.title && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <Input
              id="slug"
              placeholder="e.g. react-masterclass"
              className="bg-muted/50"
              {...register('slug', {
                required: 'Slug is required',
              })}
            />
            {errors.slug && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.slug.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            rows={5}
            className="resize-none"
            placeholder="What will students learn in this course?"
            {...register('description', {
              required: 'Description is required',
            })}
          />
          {errors.description && (
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select
            onValueChange={(value) => setValue('categoryId', value)}
            value={categoryId || undefined}
          >
            <SelectTrigger className="w-full md:w-[50%]">
              <SelectValue placeholder="Select a relevant category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
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
            <p className="text-[0.8rem] font-medium text-destructive">
              {errors.categoryId.message}
            </p>
          )}
        </div>
      </div>

      {/* Media Section */}
      <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Course Media
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload a compelling banner image to attract students.
          </p>
        </div>

        <div className="h-px bg-border" />

        <div className="grid gap-6 md:grid-cols-2">
          {/* File Upload */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Upload Course Banner</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleThumbnailFileChange}
                className="cursor-pointer file:text-foreground"
              />
              <p className="text-[0.8rem] text-muted-foreground">
                Recommended: 1280x720px (JPG, PNG, WEBP). Max 5MB.
              </p>
            </div>

            <div className="space-y-2">
              <div className="relative flex items-center py-2">
                <div className="grow border-t border-muted" />
                <span className="mx-2 text-xs text-muted-foreground uppercase">or</span>
                <div className="grow border-t border-muted" />
              </div>
              
              <Label>Course Banner URL</Label>
              <Input
                type="url"
                placeholder="https://images.example.com/course-cover.jpg"
                {...register('thumbnailUrl')}
              />
            </div>
          </div>

          {/* Preview Area */}
          <div className="flex flex-col space-y-2">
            <Label>Preview</Label>
            {resolvedThumbnailPreview ? (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted shadow-inner">
                <Image
                  src={resolvedThumbnailPreview}
                  alt="Course banner preview"
                  fill
                  unoptimized
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed bg-muted/50">
                <p className="text-sm text-muted-foreground">No image selected</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Configuration Section */}
      <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            Course Configuration
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Set the difficulty, pricing, and structural details.
          </p>
        </div>

        <div className="h-px bg-border" />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Level</Label>
            <Select
              value={level}
              onValueChange={(value) => setValue('level', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEGINNER">Beginner</SelectItem>
                <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                <SelectItem value="ADVANCED">Advanced</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" {...register('level')} />
          </div>

          <div className="space-y-2">
            <Label>Position (Sorting Order)</Label>
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
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.position.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Price (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-sm text-muted-foreground">$</span>
              <Input
                type="number"
                min="0"
                step="0.01"
                placeholder="49.99"
                className="pl-7"
                {...register('price', {
                  required: 'Price is required',
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: 'Price must be 0 or greater',
                  },
                })}
              />
            </div>
            {errors.price && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.price.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Total Duration (Seconds)</Label>
            <Input
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 5400 (1.5 hours)"
              {...register('totalDuration', {
                setValueAs: (value) => (value === '' ? '' : Number(value)),
                validate: (value) =>
                  value === '' ||
                  (Number.isInteger(value) && value >= 0) ||
                  'Duration must be a non-negative integer',
              })}
            />
            {errors.totalDuration && (
              <p className="text-[0.8rem] font-medium text-destructive">
                {errors.totalDuration.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Publish Section */}
      <div className="flex items-center justify-between rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="space-y-1">
          <Label className="text-base">Publish Course</Label>
          <p className="text-sm text-muted-foreground">
            Turn this on to make the course visible and accessible to students.
          </p>
        </div>
        <Switch
          checked={isPublished}
          onCheckedChange={(value) => setValue('isPublished', value)}
        />
      </div>

      {/* Sticky Bottom Actions */}
      <div className="sticky bottom-0 z-10 flex items-center justify-end gap-4 border-t bg-background/80 px-4 py-4 backdrop-blur-md sm:px-0">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[140px]">
          {isSubmitting
            ? 'Saving Changes...'
            : initialValues
            ? 'Update Course'
            : 'Create Course'}
        </Button>
      </div>
    </form>
  )
}