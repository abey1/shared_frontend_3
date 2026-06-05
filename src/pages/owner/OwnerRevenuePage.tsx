import { DollarSign } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table.jsx";

const chartPlaceholder = Array.from({ length: 12 }).map((_, i) => ({
  label: `W${i + 1}`,
  revenue: Math.round(i * 120 + Math.sin(i) * 500 + 5200),
}));

export default function OwnerRevenuePage() {
  return (
    <AdminSectionShell
      title="Revenue"
      subtitle="Aggregated payouts + rental fees scoped to upcoming supplier APIs."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <DollarSign className="size-5" aria-hidden /> Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">—</p>
            <p className="mt-2 text-xs text-text-secondary">
              Stripe Connect payouts appear here soon.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">This week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">—</p>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">This month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">—</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border-primary">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Rolling revenue</CardTitle>
        </CardHeader>
        <CardContent className="h-72 pt-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartPlaceholder}>
              <CartesianGrid strokeDasharray="4 8" opacity={0.4} />
              <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis hide />
              <Tooltip
                formatter={(value: number | string) => [`$${value}`, "Revenue"]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#818cf8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="mt-4 text-xs text-text-secondary">
            Placeholder trend — plugs into payouts once ledger endpoints publish.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border-primary">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Recent transactions</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader className="bg-neutral-950/[0.03] dark:bg-neutral-950/40">
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm text-text-secondary">
              {[1, 2, 3, 4, 5].map((slot) => (
                <TableRow key={slot}>
                  <TableCell className="text-text-secondary">INV-000{slot}</TableCell>
                  <TableCell>Sample renter #{slot}</TableCell>
                  <TableCell>Placeholder</TableCell>
                  <TableCell className="text-right tabular-nums">—</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminSectionShell>
  );
}
