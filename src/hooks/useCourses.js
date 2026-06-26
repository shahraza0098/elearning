'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import useApi from './useApi'

export default function useCourses() {
  const { request, loading, error } = useApi()

  const [courses, setCourses] = useState([])

  const [filters, setFilters] = useState({
    search: '',
    categoryId: '',
    isPublished: '',
  })

  /**
   * Fetch Courses
   */
  const fetchCourses = useCallback(async () => {
    const params = {}

    if (filters.categoryId) {
      params.categoryId = filters.categoryId
    }

    if (filters.isPublished !== '') {
      params.isPublished = filters.isPublished
    }

    const response = await request({
      url: '/api/admin/course',
      method: 'GET',
      params,
    })

    setCourses(response.data || [])
  }, [filters.categoryId, filters.isPublished, request])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  /**
   * Create Course
   */
  const createCourse = async (payload) => {
    const response = await request({
      method: 'POST',
      url: '/api/admin/course',
      data: payload,
      showSuccess: true,
      successMessage: 'Course created successfully',
    })

    setCourses((prev) => [response.data, ...prev])

    return response.data
  }

  /**
   * Update Course
   */
  const updateCourse = async (id, payload) => {
    const response = await request({
      method: 'PATCH',
      url: `/api/admin/course/${id}`,
      data: payload,
      showSuccess: true,
      successMessage: 'Course updated successfully',
    })

    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? response.data : course
      )
    )

    return response.data
  }

  /**
   * Delete Course
   */
  const deleteCourse = async (id) => {
    await request({
      method: 'DELETE',
      url: `/api/admin/course/${id}`,
      showSuccess: true,
      successMessage: 'Course deleted successfully',
    })

    setCourses((prev) =>
      prev.filter((course) => course.id !== id)
    )
  }

  /**
   * Client-side Search
   */
  const filteredCourses = useMemo(() => {
    if (!filters.search.trim()) {
      return courses
    }

    const search = filters.search.toLowerCase()

    return courses.filter((course) => {
      return (
        course.title?.toLowerCase().includes(search) ||
        course.slug?.toLowerCase().includes(search) ||
        course.category?.name?.toLowerCase().includes(search)
      )
    })
  }, [courses, filters.search])

  return {
    // Data
    courses: filteredCourses,

    // Original data
    allCourses: courses,

    // States
    loading,
    error,

    // Filters
    filters,
    setFilters,

    // Actions
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  }
}