import { Users } from "lucide-react";
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

export default function OwnerCustomersPage() {
  return (
    <AdminSectionShell
      title="Customers"
      subtitle="Renter personas + recurrence signals will stream from bookings."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[["Total customers", "482"], ["Active", "128"], ["Returning", "64"], ["Overdue renters", "5"]].map(
          ([label, value]) => (
            <Card key={label} className="border-border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-text-secondary">
                  <Users className="size-4" aria-hidden />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent className="-mt-2">
                <p className="text-3xl font-semibold text-text-primary">{value}</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <Card className="border-border-primary">
        <CardHeader>
          <CardTitle className="text-lg">Activity heatmap placeholder</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-neutral-950/[0.03] dark:bg-neutral-950/40">
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Last rental</TableHead>
                <TableHead>Open tickets</TableHead>
                <TableHead>Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm text-text-secondary">
              {[1, 2, 3, 4].map((i) => (
                <TableRow key={i}>
                  <TableCell>Prototype renter #{i}</TableCell>
                  <TableCell>Feb {10 + i}, 2026</TableCell>
                  <TableCell>—</TableCell>
                  <TableCell>Healthy</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminSectionShell>
  );
}
