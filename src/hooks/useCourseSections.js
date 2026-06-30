'use client'

import { useCallback, useMemo, useState } from 'react'

function sortByPosition(items) {
  return [...items].sort((a, b) => {
    if (a.position !== b.position) {
      return a.position - b.position
    }

    return (a.title || '').localeCompare(b.title || '')
  })
}

export default function useCourseSections({ course, initialSections, router }) {
  const [sections, setSections] = useState(() => sortByPosition(initialSections))
  const [expandedSectionIds, setExpandedSectionIds] = useState([])
  const [sectionDetails, setSectionDetails] = useState({})
  const [loadingSectionIds, setLoadingSectionIds] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const totalLessons = useMemo(
    () =>
      sections.reduce(
        (total, section) => total + (section._count?.lessons ?? 0),
        0
      ),
    [sections]
  )

  const loadSectionDetails = useCallback(async (sectionId) => {
    setLoadingSectionIds((current) => [...new Set([...current, sectionId])])
    setErrorMessage('')

    try {
      const response = await fetch(`/api/admin/section/${sectionId}`, {
        cache: 'no-store',
      })
      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(payload?.message || 'Failed to load section lessons.')
      }

      setSectionDetails((current) => ({
        ...current,
        [sectionId]: payload.data,
      }))
    } catch (error) {
      setErrorMessage(error.message || 'Failed to load section lessons.')
    } finally {
      setLoadingSectionIds((current) =>
        current.filter((value) => value !== sectionId)
      )
    }
  }, [])

  const toggleSection = useCallback(
    async (sectionId) => {
      const isExpanded = expandedSectionIds.includes(sectionId)

      if (isExpanded) {
        setExpandedSectionIds((current) =>
          current.filter((value) => value !== sectionId)
        )
        return
      }

      setExpandedSectionIds((current) => [...current, sectionId])

      if (!sectionDetails[sectionId]) {
        await loadSectionDetails(sectionId)
      }
    },
    [expandedSectionIds, loadSectionDetails, sectionDetails]
  )

  const handleSectionCreated = useCallback(
    (section) => {
      setSections((current) =>
        sortByPosition([
          ...current,
          {
            ...section,
            _count: {
              lessons: section._count?.lessons ?? 0,
            },
          },
        ])
      )
      setExpandedSectionIds((current) => [...new Set([...current, section.id])])
      setSectionDetails((current) => ({
        ...current,
        [section.id]: {
          ...section,
          lessons: [],
        },
      }))
      router?.refresh?.()
    },
    [course.id, course.slug, course.title, router]
  )

  const handleLessonCreated = useCallback(
    (sectionId, lesson) => {
      setSections((current) =>
        sortByPosition(
          current.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  _count: {
                    ...section._count,
                    lessons: (section._count?.lessons ?? 0) + 1,
                  },
                }
              : section
          )
        )
      )

      setExpandedSectionIds((current) => [...new Set([...current, sectionId])])
      setSectionDetails((current) => {
        const existingSection = current[sectionId]
        const parentSection = sections.find((section) => section.id === sectionId)

        if (!existingSection) {
          return {
            ...current,
            [sectionId]: {
              id: sectionId,
              title: parentSection?.title ?? 'Section',
              position: parentSection?.position ?? 0,
              course: {
                id: course.id,
                title: course.title,
                slug: course.slug,
              },
              _count: {
                lessons: (parentSection?._count?.lessons ?? 0) + 1,
              },
              lessons: [lesson],
            },
          }
        }

        return {
          ...current,
          [sectionId]: {
            ...existingSection,
            lessons: sortByPosition([...(existingSection.lessons ?? []), lesson]),
            _count: {
              ...existingSection._count,
              lessons: (existingSection._count?.lessons ?? 0) + 1,
            },
          },
        }
      })
      router?.refresh?.()
    },
    [course.id, course.slug, course.title, router, sections]
  )

  return {
    sections,
    expandedSectionIds,
    sectionDetails,
    loadingSectionIds,
    errorMessage,
    totalLessons,
    loadSectionDetails,
    toggleSection,
    handleSectionCreated,
    handleLessonCreated,
  }
}
