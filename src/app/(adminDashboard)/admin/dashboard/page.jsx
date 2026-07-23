"use client";

import { useUser } from "@clerk/nextjs";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentPaymentsTable from "@/components/dashboard/RecentPaymentsTable";
import RecentStudentsTable from "@/components/dashboard/RecentStudentsTable";
import RevenueChart from "@/components/dashboard/RevenueChart";
import StudentGrowthChart from "@/components/dashboard/StudentGrowthChart";
import SubscriptionChart from "@/components/dashboard/SubscriptionChart";
import TopCoursesChart from "@/components/dashboard/TopCoursesChart";
import useDashboard from "@/hooks/useDashboard";

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-32 animate-pulse rounded-[32px] bg-white/70" />
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-[28px] bg-white/70"
          />
        ))}
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-[430px] animate-pulse rounded-[28px] bg-white/70" />
        <div className="h-[430px] animate-pulse rounded-[28px] bg-white/70" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-[420px] animate-pulse rounded-[28px] bg-white/70" />
        <div className="h-[420px] animate-pulse rounded-[28px] bg-white/70" />
      </div>
      <div className="h-[360px] animate-pulse rounded-[28px] bg-white/70" />
      <div className="h-[360px] animate-pulse rounded-[28px] bg-white/70" />
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-[32px] border border-rose-100 bg-white/85 p-10 text-center shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <p className="text-lg font-semibold text-slate-900">
        Dashboard unavailable
      </p>
      <p className="mt-2 text-sm text-slate-500">{message}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const { dashboard, loading, error } = useDashboard();

  const displayName = user?.firstName || user?.fullName || "Admin";
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4f7fb]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute right-[-10rem] top-[8rem] h-[24rem] w-[24rem] rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-[18%] h-[26rem] w-[26rem] rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6">
        <section className="overflow-hidden rounded-[32px] bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 p-8 text-white shadow-[0_30px_80px_-32px_rgba(15,23,42,0.55)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200/90">
                Dashboard Overview
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight lg:text-4xl">
                Welcome {displayName} {"\u{1F44B}"}
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Here is a live snapshot of revenue, student activity, and
                subscription health across your e-learning platform.
              </p>
            </div>

            <div className="self-start rounded-[24px] border border-white/10 bg-white/10 px-5 py-4 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                Today
              </p>
              <p className="mt-2 text-lg font-semibold">{today}</p>
            </div>
          </div>
        </section>

        {loading && !dashboard ? <DashboardSkeleton /> : null}
        {!loading && error ? <EmptyState message={error} /> : null}

        {!loading && dashboard ? (
          <>
            <DashboardStats stats={dashboard.stats} />

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)]">
              <RevenueChart data={dashboard.revenueChart} />
              <SubscriptionChart data={dashboard.subscriptionChart} />
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <StudentGrowthChart data={dashboard.studentGrowth} />
              <TopCoursesChart data={dashboard.topCourses} />
            </div>

            <RecentPaymentsTable payments={dashboard.recentPayments} />
            <RecentStudentsTable students={dashboard.recentStudents} />
          </>
        ) : null}
      </div>
    </div>
  );
}
