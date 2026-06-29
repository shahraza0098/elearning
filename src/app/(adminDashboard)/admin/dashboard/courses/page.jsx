'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import useCourses from '@/hooks/useCourses'
import useCategories from '@/hooks/useCategories'

import CourseToolbar from './_components/CourseToolbar'
import CourseGrid from './_components/CourseGrid'

export default function CoursePage() {
  const router = useRouter()
  const {
    courses,
    loading,
    createCourse,
    deleteCourse,
    filters,
    setFilters,
  } = useCourses()

  const { categories } = useCategories()

  const [deleting, setDeleting] = useState(false)

  const handleView = (course) => {
    router.push(`/admin/dashboard/courses/${course.id}`)
  }

  const handleEdit = (course) => {
    console.log('Edit:', course)

    // TODO:
    // router.push(`/dashboard/courses/${course.id}/edit`)
  }

  const handleDelete = async (course) => {
    const confirmDelete = window.confirm(
      `Delete "${course.title}"?`
    )

    if (!confirmDelete) return

    try {
      setDeleting(true)

      await deleteCourse(course.id)

      toast.success('Course deleted successfully')
    } catch (err) {
      toast.error('Failed to delete course')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Courses
        </h1>

        <p className="text-muted-foreground">
          Manage your courses, lessons and pricing.
        </p>
      </div>

      {/* Toolbar */}

      <CourseToolbar
        filters={filters}
        setFilters={setFilters}
        categories={categories}
        createCourse={createCourse}
      />

      {/* Stats */}

      <div className="text-sm text-muted-foreground">
        Total Courses:{' '}
        <span className="font-semibold text-foreground">
          {courses.length}
        </span>
      </div>

      {/* Grid */}

      <CourseGrid
        courses={courses}
        loading={loading || deleting}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}