"use client";

import { Users, IndianRupee, BookOpen, CreditCard } from "lucide-react";

import StatCard from "@/components/StatCard";

export default function DashboardStats({ stats }) {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const cards = [
    {
      title: "Revenue",
      value: formatCurrency(stats.monthlyRevenue),
      subtitle: "This month",
      icon: IndianRupee,
      accent: "from-emerald-500 to-teal-400",
    },
    {
      title: "Students",
      value: stats.totalStudents?.toLocaleString() || "0",
      subtitle: "Registered learners",
      icon: Users,
      accent: "from-sky-500 to-blue-500",
    },
    {
      title: "Courses",
      value: stats.publishedCourses?.toLocaleString() || "0",
      subtitle: "Published courses",
      icon: BookOpen,
      accent: "from-fuchsia-500 to-pink-500",
    },
    {
      title: "Active",
      value: stats.activeSubscriptions?.toLocaleString() || "0",
      subtitle: "Live subscriptions",
      icon: CreditCard,
      accent: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
