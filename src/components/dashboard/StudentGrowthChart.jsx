import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function buildPoints(values, width, height, padding) {
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

export default function StudentGrowthChart({ data = [] }) {
  const values = data.map((item) => item.totalStudents);
  const chartWidth = 680;
  const chartHeight = 240;
  const padding = 26;
  const points = buildPoints(values, chartWidth, chartHeight, padding);
  const linePath = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  const latestTotal = data[data.length - 1]?.totalStudents || 0;
  const latestNew = data[data.length - 1]?.newStudents || 0;

  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Student Growth</CardTitle>
          <p className="mt-1 text-sm text-slate-500">
            Total students accumulated over time
          </p>
        </div>
        <div className="flex gap-3">
          <div className="rounded-2xl bg-sky-50 px-4 py-2 ring-1 ring-sky-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
              Total
            </p>
            <p className="text-lg font-semibold text-slate-950">{latestTotal}</p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-2 ring-1 ring-amber-100">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Today
            </p>
            <p className="text-lg font-semibold text-slate-950">+{latestNew}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {data.length ? (
          <div className="space-y-4">
            <div className="rounded-[28px] bg-gradient-to-br from-sky-50 via-white to-cyan-50 p-4 ring-1 ring-sky-100">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="h-60 w-full"
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
                      stroke="rgba(14,116,144,0.12)"
                      strokeDasharray="6 6"
                    />
                  );
                })}

                <path
                  d={linePath}
                  fill="none"
                  stroke="#0ea5e9"
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
                      <circle cx={x} cy={y} r="4.5" fill="#0284c7" />
                      <circle
                        cx={x}
                        cy={y}
                        r="9"
                        fill="rgba(14,165,233,0.18)"
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
            No student growth data available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
