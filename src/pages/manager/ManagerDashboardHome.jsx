import { useQuery } from "@tanstack/react-query";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { useGetAccessToken } from "../../hooks/useGetAccessToken";
import { fetchManagerToolsSummary } from "../../api/managerTools.js";
import { useManagerWorkspace } from "../../context/ManagerWorkspaceContext.jsx";

const trendDemo = Array.from({ length: 12 }).map((_, i) => ({
  label: `W${i + 1}`,
  usage: Math.round(40 + Math.sin(i) * 15 + i * 3),
}));

export default function ManagerDashboardHome() {
  const getAccessToken = useGetAccessToken();
  const ws = useManagerWorkspace();

  const summaryQuery = useQuery({
    queryKey: [
      "manager",
      "tools-summary",
      ws.selectedBusinessId ?? "",
    ],
    queryFn: () =>
      fetchManagerToolsSummary(getAccessToken, ws.selectedBusinessId),
    enabled: Boolean(ws.selectedBusinessId),
  });

  const s = summaryQuery.data ?? {};

  return (
    <AdminSectionShell
      title="Dashboard"
      subtitle="Operational snapshot for inventory and teams. Data loads per selected organization."
    >
      {!ws.selectedBusinessId && !ws.isLoading ? (
        <p className="text-sm text-text-secondary">
          Select or join an organization with manager access to load KPIs.
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Total tools", s.totalTools ?? "—"],
          ["Available", s.availableTools ?? "—"],
          ["Maintenance", s.maintenanceTools ?? "—"],
          ["Pending requests", s.pendingRequests ?? "—"],
          ["Active employees", s.activeEmployees ?? "—"],
        ].map(([label, val]) => (
          <Card key={label} className="border-border-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight tabular-nums">
                {summaryQuery.isPending ? "…" : val}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="border-border-primary">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Tool usage trends</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendDemo}>
                <CartesianGrid strokeDasharray="4 8" opacity={0.35} />
                <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 11 }} />
                <YAxis hide />
                <Tooltip formatter={(value) => [value, "Usage index"]} />
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-3 text-xs text-text-secondary">
              Illustrative series — connect telemetry when analytics APIs ship.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader className="pb-0">
            <CardTitle className="text-lg">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6 text-sm text-text-secondary">
            {["Inventory sync", "Assignment updated", "Audit export"].map(
              (x, i) => (
                <div
                  key={x}
                  className="flex items-center justify-between rounded-lg border border-border-primary px-3 py-2"
                >
                  <span>{x}</span>
                  <span className="text-xs opacity-70">Placeholder {i + 1}</span>
                </div>
              ),
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-border-primary">
        <CardHeader className="pb-0">
          <CardTitle className="text-lg">Recent requests</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 pt-6 sm:grid-cols-3">
          {["Extra drill set", "Lift gate truck", "Concrete mixer"].map(
            (t) => (
              <div
                key={t}
                className="rounded-lg border border-dashed border-border-primary px-3 py-4 text-sm text-text-secondary"
              >
                {t}
                <p className="mt-1 text-xs opacity-70">Awaiting workflow API</p>
              </div>
            ),
          )}
        </CardContent>
      </Card>
    </AdminSectionShell>
  );
}
