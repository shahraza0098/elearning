import prisma from "@/lib/prisma";

const STATUS_META = [
  { key: "ACTIVE", label: "Active", color: "#0f766e" },
  { key: "AUTHENTICATED", label: "Trial", color: "#f59e0b" },
  { key: "PAUSED", label: "Paused", color: "#6366f1" },
  { key: "CANCELLED", label: "Cancelled", color: "#ef4444" },
  { key: "EXPIRED", label: "Expired", color: "#64748b" },
];

export async function getSubscriptionChart() {
  const grouped = await prisma.subscription.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const counts = new Map(
    grouped.map((item) => [item.status, item._count.status])
  );

  return STATUS_META.map((status) => ({
    ...status,
    value: counts.get(status.key) || 0,
  })).filter((item) => item.value > 0);
}
