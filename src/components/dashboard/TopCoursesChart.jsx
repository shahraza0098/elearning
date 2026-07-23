import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopCoursesChart({ data = [] }) {
  const maxScore = Math.max(...data.map((item) => item.score), 1);

  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader>
        <CardTitle>Popular Courses</CardTitle>
        <p className="text-sm text-slate-500">
          Ranked by completions, reviews, and course activity
        </p>
      </CardHeader>

      <CardContent>
        {data.length ? (
          <div className="space-y-4">
            {data.map((course, index) => (
              <div key={course.id} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {index + 1}. {course.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {course.completions} completions | {course.reviews} reviews
                      {" | "}INR {course.price.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {course.score} pts
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400"
                    style={{
                      width: `${Math.max((course.score / maxScore) * 100, 8)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-dashed border-slate-200 bg-slate-50 px-6 py-16 text-center text-sm text-slate-500">
            No published courses available yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
