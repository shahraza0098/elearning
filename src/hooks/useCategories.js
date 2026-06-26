'use client'

import { useCallback, useEffect, useState } from 'react'
import useApi from './useApi'

export default function useCategories() {
  const { request, loading, error } = useApi()

  const [categories, setCategories] = useState([])

  const fetchCategories = useCallback(async () => {
    const res = await request({
      url: '/api/admin/category',
    })

    setCategories(res.data || [])
  }, [request])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const createCategory = async (payload) => {
    const res = await request({
      method: 'POST',
      url: '/api/admin/category',
      data: payload,
      successMessage: 'Category created',
      showSuccess: true,
    })

    fetchCategories()

    return res.data
  }

  const deleteCategory = async (id) => {
    await request({
      method: 'DELETE',
      url: `/api/admin/category/${id}`,
      showSuccess: true,
      successMessage: 'Category deleted',
    })

    fetchCategories()
  }

  return {
    categories,

    loading,
    error,

    refetch: fetchCategories,

    createCategory,
    deleteCategory,
  }
}