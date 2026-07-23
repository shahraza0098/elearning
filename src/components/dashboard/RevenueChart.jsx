import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildLinePoints(values, width, height, padding) {
  const maxValue = Math.max(...values, 1);
  const stepX =
    values.length > 1 ? (width - padding * 2) / (values.length - 1) : 0;

  return values.map((value, index) => {
    const x = padding + index * stepX;
    const y =
      height - padding - (value / maxValue) * (height - padding * 2);

    return [x, y];
  });
}

export default function RevenueChart({ data = [] }) {
  const values = data.map((item) => item.value);
  const totalRevenue = values.reduce((sum, value) => sum + value, 0);
  const chartWidth = 680;
  const chartHeight = 260;
  const padding = 26;
  const points = buildLinePoints(values, chartWidth, chartHeight, padding);
  const linePath = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  const areaPath = `${linePath} L ${chartWidth - padding} ${
    chartHeight - padding
  } L ${padding} ${chartHeight - padding} Z`;

  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <div>
          <CardTitle>Revenue (30 Days)</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Last 30 days collection trend
          </p>
        </div>
        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-right ring-1 ring-emerald-100">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Total
          </p>
          <p className="text-lg font-semibold text-emerald-950">
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(totalRevenue)}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {data.length ? (
          <div className="space-y-4">
            <div className="rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-4 text-white">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-64 w-full"
                preserveAspectRatio="none"
              >
                {[0, 1, 2, 3].map((row) => {
                  const y = padding + ((chartHeight - padding * 2) / 3) * row;

                  return (
                    <line
                      key={row}
                      x1={padding}
                      x2={chartWidth - padding}
                      y1={y}
                      y2={y}
                      stroke="rgba(255,255,255,0.12)"
                      strokeDasharray="6 6"
                    />
                  );
                })}

                <defs>
                  <linearGradient id="revenueArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                <path d={areaPath} fill="url(#revenueArea)" />
                <path
                  d={linePath}
                  fill="none"
                  stroke="#6ee7b7"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {points
                  .filter(
                    (_, index) =>
                      index % 5 === 0 || index === points.length - 1
                  )
                  .map(([x, y], index) => (
                    <g key={`${x}-${y}-${index}`}>
                      <circle cx={x} cy={y} r="4.5" fill="#dcfce7" />
                      <circle
                        cx={x}
                        cy={y}
                        r="9"
                        fill="rgba(220,252,231,0.18)"
                      />
                    </g>
                  ))}
              </svg>
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs font-medium text-slate-500">
              {data
                .filter((_, index) => index % 7 === 0 || index === data.length - 1)
                .map((item) => (
                  <div
                    key={item.date}
                    className="rounded-xl bg-slate-50 px-3 py-2 text-center"
                  >
                    {item.date}
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
            No revenue data available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
