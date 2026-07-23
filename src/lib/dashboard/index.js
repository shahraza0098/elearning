import { getRecentPayments } from "@/lib/dashboard/getRecentPayments";
import { getRecentStudents } from "@/lib/dashboard/getRecentStudents";
import { getRevenueChart } from "@/lib/dashboard/getRevenueChart";
import { getDashboardStats } from "@/lib/dashboard/getStats";
import { getStudentGrowth } from "@/lib/dashboard/getStudentGrowth";
import { getSubscriptionChart } from "@/lib/dashboard/getSubscriptionChart";
import { getTopCourses } from "@/lib/dashboard/getTopCourses";

export async function getDashboardData() {
  const [
    stats,
    revenueChart,
    subscriptionChart,
    studentGrowth,
    topCourses,
    recentPayments,
    recentStudents,
  ] = await Promise.all([
    getDashboardStats(),
    getRevenueChart(),
    getSubscriptionChart(),
    getStudentGrowth(),
    getTopCourses(),
    getRecentPayments(),
    getRecentStudents(),
  ]);

  return {
    stats,
    revenueChart,
    subscriptionChart,
    studentGrowth,
    topCourses,
    recentPayments,
    recentStudents,
  };
}
