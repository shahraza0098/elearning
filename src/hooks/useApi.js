'use client'

import { useState,useCallback } from 'react'
import axios from 'axios'
import { toast } from 'sonner'

export default function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

 const request = useCallback(async ({
    method = "GET",
    url,
    data = {},
    params = {},
    successMessage,
    showSuccess = false,
}) => {
    try {
        setLoading(true);
        setError(null);

        const response = await axios({
            method,
            url,
            data,
            params,
        });

        if (showSuccess && successMessage) {
            toast.success(successMessage);
        }

        return response.data;
    } catch (err) {
        const message =
            err?.response?.data?.message ||
            err?.message ||
            "Something went wrong";

        setError(message);
        toast.error(message);

        throw err;
    } finally {
        setLoading(false);
    }
}, []);

  return {
    request,
    loading,
    error,
  }
}