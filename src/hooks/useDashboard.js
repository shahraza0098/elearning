"use client";

import { useEffect, useState } from "react";

import useApi from "./useApi";

export default function useDashboard() {
  const { request, loading, error } = useApi();
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      const response = await request({
        url: "/api/admin/dashboard",
        method: "GET",
      });

      if (isMounted) {
        setDashboard(response.data || null);
      }
    };

    fetchDashboard().catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [request]);

  return {
    dashboard,
    loading,
    error,
  };
}
