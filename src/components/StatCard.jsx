import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "from-sky-500 to-cyan-400",
}) {
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardContent className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <div className="space-y-1">
            <p className="text-3xl font-semibold tracking-tight text-slate-950">
              {value}
            </p>
            {subtitle ? (
              <p className="text-xs font-medium text-slate-500">{subtitle}</p>
            ) : null}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg shadow-slate-900/10`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
