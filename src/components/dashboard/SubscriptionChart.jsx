import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SubscriptionChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let runningPercent = 0;

  const gradient = data.length
    ? `conic-gradient(${data
        .map((item) => {
          const start = runningPercent;
          const end = runningPercent + (item.value / total) * 100;
          runningPercent = end;

          return `${item.color} ${start}% ${end}%`;
        })
        .join(", ")})`
    : "conic-gradient(#e2e8f0 0% 100%)";

  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <p className="text-sm text-slate-500">
          Current distribution of student plans
        </p>
      </CardHeader>

      <CardContent className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="flex justify-center">
          <div
            className="relative flex h-52 w-52 items-center justify-center rounded-full"
            style={{ background: gradient }}
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center shadow-inner">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Total
              </span>
              <span className="text-3xl font-semibold text-slate-950">
                {total}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.length ? (
            data.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-slate-700">{item.label}</span>
                </div>
                <span className="text-sm font-semibold text-slate-950">
                  {item.value}
                </span>
              </div>
            ))
          ) : (
            <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-sm text-slate-500">
              No subscriptions found yet.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
