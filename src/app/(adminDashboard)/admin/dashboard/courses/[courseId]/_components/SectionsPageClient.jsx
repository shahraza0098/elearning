'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  Clock3,
  Layers3,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import useCourseSections from '@/hooks/useCourseSections'

import CreateSectionDialog from './CreateSectionDialog'
import CreateLessonDialog from './CreateLessonDialog'

function formatDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0s'
  }

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

export default function SectionsPageClient({ course, initialSections }) {
  const router = useRouter()
  const {
    sections,
    expandedSectionIds,
    sectionDetails,
    loadingSectionIds,
    errorMessage,
    totalLessons,
    toggleSection,
    handleSectionCreated,
    handleLessonCreated,
  } = useCourseSections({ course, initialSections, router })

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <Link
            href="/admin/dashboard/courses"
            className="inline-flex text-sm text-muted-foreground transition hover:text-foreground"
          >
            Back to courses
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {course.title}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Build the learning flow for this course by organizing sections and
              lessons.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{course.category?.name ?? 'No category'}</Badge>
            <Badge variant={course.isPublished ? 'default' : 'secondary'}>
              {course.isPublished ? 'Published' : 'Draft'}
            </Badge>
          </div>
        </div>

        <CreateSectionDialog
          courseId={course.id}
          defaultPosition={sections.length}
          onCreated={handleSectionCreated}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-sky-100 p-3 text-sky-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Course level</p>
              <p className="font-semibold text-foreground">{course.level}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-100 p-3 text-violet-700">
              <Layers3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total sections</p>
              <p className="font-semibold text-foreground">{sections.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700">
              <Clock3 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total lessons</p>
              <p className="font-semibold text-foreground">{totalLessons}</p>
            </div>
          </div>
        </div>
      </div>

      {errorMessage ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-muted/20 px-6 py-16 text-center">
          <Layers3 className="mx-auto h-12 w-12 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            No sections yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start by adding the first section for this course.
          </p>
          <div className="mt-6 flex justify-center">
            <CreateSectionDialog
              courseId={course.id}
              defaultPosition={0}
              onCreated={handleSectionCreated}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSectionIds.includes(section.id)
            const isLoading = loadingSectionIds.includes(section.id)
            const details = sectionDetails[section.id]
            const lessons = details?.lessons ?? []

            return (
              <div
                key={section.id}
                className="overflow-hidden rounded-2xl border bg-background shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-muted/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 text-muted-foreground">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Section {section.position}
                      </p>
                      <h2 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {section._count?.lessons ?? 0} lessons
                    </Badge>
                  </div>
                </button>

                {isExpanded ? (
                  <div className="border-t bg-muted/20 px-5 py-5">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-sm text-muted-foreground">
                        {isLoading
                          ? 'Loading lessons...'
                          : lessons.length > 0
                            ? 'Manage the lessons inside this section.'
                            : 'No lessons added to this section yet.'}
                      </p>

                      <CreateLessonDialog
                        sectionId={section.id}
                        defaultPosition={lessons.length}
                        onCreated={(lesson) =>
                          handleLessonCreated(section.id, lesson)
                        }
                      />
                    </div>

                    {isLoading ? (
                      <div className="rounded-xl border bg-background px-4 py-6 text-sm text-muted-foreground">
                        Loading lessons...
                      </div>
                    ) : lessons.length === 0 ? (
                      <div className="rounded-xl border border-dashed bg-background px-4 py-8 text-center text-sm text-muted-foreground">
                        This section does not have any lessons yet.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="rounded-xl border bg-background px-4 py-4"
                          >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">
                                  Lesson {lesson.position}
                                </p>
                                <h3 className="font-semibold text-foreground">
                                  {lesson.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  /{lesson.slug}
                                </p>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">
                                  {formatDuration(lesson.duration)}
                                </Badge>
                                {lesson.isPreview ? (
                                  <Badge>Preview</Badge>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
