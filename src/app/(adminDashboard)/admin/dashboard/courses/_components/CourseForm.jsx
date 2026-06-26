'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      categoryId: '',
      price: '',
      isPublished: false,
    },
  })

  useEffect(() => {
    if (initialValues) {
      reset(initialValues)
    }
  }, [initialValues, reset])

  const title = watch('title')
  const isPublished = watch('isPublished')

  useEffect(() => {
    if (!initialValues) {
      setValue('slug', slugify(title))
    }
  }, [title, initialValues, setValue])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          defaultValue={watch('categoryId')}
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

      {/* Price */}

      <div className="space-y-2">
        <Label>Price</Label>

        <Input
          type="number"
          placeholder="499"
          {...register('price', {
            required: 'Price is required',
            valueAsNumber: true,
          })}
        />

        {errors.price && (
          <p className="text-sm text-red-500">
            {errors.price.message}
          </p>
        )}
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