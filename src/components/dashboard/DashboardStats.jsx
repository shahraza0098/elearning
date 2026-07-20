"use client";

import {
  Users,
  IndianRupee,
  BookOpen,
  GraduationCap,
  Award,
  CreditCard,
  Clock3,
  Wallet,
} from "lucide-react";

import StatCard from "@/components/StatCard";

export default function DashboardStats({ stats }) {
  const cards = [
    {
      title: "Today's Revenue",
      value: `₹${stats.todayRevenue.toLocaleString()}`,
      icon: IndianRupee,
      color: "bg-green-500",
    },
    {
      title: "Monthly Revenue",
      value: `₹${stats.monthlyRevenue.toLocaleString()}`,
      icon: Wallet,
      color: "bg-emerald-500",
    },
    {
      title: "Students",
      value: stats.totalStudents,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Subscribers",
      value: stats.activeSubscriptions,
      icon: CreditCard,
      color: "bg-violet-500",
    },
    {
      title: "Trial Users",
      value: stats.trialSubscriptions,
      icon: Clock3,
      color: "bg-orange-500",
    },
    {
      title: "Published Courses",
      value: stats.publishedCourses,
      icon: BookOpen,
      color: "bg-cyan-500",
    },
    {
      title: "Lessons",
      value: stats.totalLessons,
      icon: GraduationCap,
      color: "bg-pink-500",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      icon: Award,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          {...card}
        />
      ))}
    </div>
  );
}