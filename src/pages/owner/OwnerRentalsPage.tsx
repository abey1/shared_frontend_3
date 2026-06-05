import { CalendarClock } from "lucide-react";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
import { Button } from "../../components/ui/button";
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
import { cn } from "../../lib/cn.js";

export default function OwnerRentalsPage() {
  const rows = [
    {
      id: "stub-01",
      item: "12\" Concrete Saw",
      renter: "Summit Scaffold Co.",
      status: "active",
      eta: "+2 days",
      deposit: "$500",
    },
    {
      id: "stub-02",
      item: "Scissor Lift 19'",
      renter: "Northwind HVAC",
      status: "overdue",
      eta: "+5 days overdue",
      deposit: "$800",
    },
    {
      id: "stub-03",
      item: "Plate Compactor",
      renter: "Cityscapes LLC",
      status: "available",
      eta: "On lot",
      deposit: "$0",
    },
  ];

  return (
    <AdminSectionShell
      title="Rentals"
      subtitle="Fleet availability and renter SLA watchlist for your storefront."
    >
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarClock className="size-5" aria-hidden /> Active rentals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">{rows.filter((r) => r.status === "active").length}</p>
          </CardContent>
        </Card>

        <Card className="border-border-primary border-red-400/70">
          <CardHeader>
            <CardTitle>Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold text-red-700 dark:text-red-200">
              {rows.filter((r) => r.status === "overdue").length}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle>Available tools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold">
              {rows.filter((r) => r.status === "available").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border-primary">
        <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-lg">Operational queue</CardTitle>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" disabled>
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-950/[0.03] dark:bg-neutral-950/40">
              <TableRow>
                <TableHead>Equipment</TableHead>
                <TableHead>Renter</TableHead>
                <TableHead>Deposit</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.item}</TableCell>
                  <TableCell className="text-text-secondary">{r.renter}</TableCell>
                  <TableCell className="tabular-nums">{r.deposit}</TableCell>
                  <TableCell className="text-text-secondary">{r.eta}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-semibold capitalize",
                        r.status === "active" &&
                          "bg-sky-100 text-sky-950 dark:bg-sky-950/40 dark:text-sky-50",
                        r.status === "overdue" &&
                          "bg-red-100 text-red-950 dark:bg-red-950/50 dark:text-red-50",
                        r.status === "available" &&
                          "bg-neutral-100 text-neutral-950 dark:bg-neutral-800 dark:text-neutral-50",
                      )}
                    >
                      {r.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminSectionShell>
  );
}
