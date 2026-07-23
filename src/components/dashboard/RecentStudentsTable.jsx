import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getSubscriptionClass(status) {
  if (status === "ACTIVE") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (status === "AUTHENTICATED") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  if (status === "NONE") {
    return "bg-slate-100 text-slate-700 ring-slate-200";
  }

  return "bg-indigo-50 text-indigo-700 ring-indigo-100";
}

export default function RecentStudentsTable({ students = [] }) {
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader>
        <CardTitle>Recent Students</CardTitle>
        <p className="text-sm text-slate-500">
          New learner signups and subscription state
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.length ? (
              students.map((student) => (
                <TableRow key={student.id} className="border-slate-100">
                  <TableCell className="py-4">
                    <div>
                      <p className="font-medium text-slate-900">{student.name}</p>
                      <p className="text-xs text-slate-500">{student.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    @{student.username}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {student.planName}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getSubscriptionClass(
                        student.subscriptionStatus
                      )}`}
                    >
                      {student.subscriptionStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {formatDate(student.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-slate-100">
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No students registered yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
