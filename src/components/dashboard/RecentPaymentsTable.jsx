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

function getStatusClass(status) {
  if (status === "SUCCESS") {
    return "bg-emerald-50 text-emerald-700 ring-emerald-100";
  }

  if (status === "PENDING") {
    return "bg-amber-50 text-amber-700 ring-amber-100";
  }

  return "bg-rose-50 text-rose-700 ring-rose-100";
}

export default function RecentPaymentsTable({ payments = [] }) {
  return (
    <Card className="border-white/70 bg-white/80 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.35)] backdrop-blur">
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
        <p className="text-sm text-slate-500">
          Latest payment activity across the platform
        </p>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-100 hover:bg-transparent">
              <TableHead>Student</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length ? (
              payments.map((payment) => (
                <TableRow key={payment.id} className="border-slate-100">
                  <TableCell className="py-4">
                    <div>
                      <p className="font-medium text-slate-900">
                        {payment.studentName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {payment.studentEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {payment.planName}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-950">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(payment.amount)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getStatusClass(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {formatDate(payment.paidAt || payment.createdAt)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow className="border-slate-100">
                <TableCell
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No payments recorded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
