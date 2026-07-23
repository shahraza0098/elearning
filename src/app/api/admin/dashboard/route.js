import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/require-admin";
import { getDashboardDataService } from "@/services/dashboard.service";

export async function GET() {
  const authResult = await requireAdmin();
  if (authResult.error) return authResult.error;

  try {
    const dashboard = await getDashboardDataService();

    return NextResponse.json(
      {
        message: "Dashboard fetched successfully",
        data: dashboard,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch dashboard",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}
