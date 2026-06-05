import { useMsal } from "@azure/msal-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Pencil,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { acquireApiAccessToken } from "../../api/acquireApiAccessToken";
import { fetchBusinessCatalog } from "../../api/businessesMine.js";
import {
  createInvitation,
  deleteInvitation,
  listInvitations,
  patchInvitation,
} from "../../api/invitations.js";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Label } from "../../components/ui/label.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table.jsx";
import { useAppRoles } from "../../context/AppRolesContext";
import { cn } from "../../lib/cn.js";
import AdminSectionShell from "./AdminSectionShell.jsx";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ROLES = [
  { value: "owner", label: "Owner" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "member", label: "Member" },
];

const INV_STATUSES = [
  { value: "", label: "All statuses" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "expired", label: "Expired" },
  { value: "revoked", label: "Revoked" },
];

const EDIT_STATUSES = [
  { value: "pending", label: "Pending" },
  { value: "expired", label: "Expired" },
  { value: "revoked", label: "Revoked" },
];

const PIE_COLORS = {
  pending: "#ca8a04",
  accepted: "#16a34a",
  expired: "#6b7280",
  revoked: "#dc2626",
};

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return String(iso);
  }
}

function toDatetimeLocalValue(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalToIso(local) {
  if (!local) return undefined;
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function businessDisplay(b) {
  if (!b) return "";
  const n = b.name?.trim();
  return n || b.legalName || b.id;
}

function SortHeaderButton({ column, children }) {
  const sorted = column.getIsSorted();
  return (
    <button
      type="button"
      className={cn(
        "-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-left text-sm font-medium text-text-primary hover:bg-neutral-100 dark:hover:bg-neutral-800",
      )}
      onClick={column.getToggleSortingHandler()}
    >
      {children}
      {sorted === "asc" ? (
        <ArrowUp className="h-4 w-4 shrink-0 text-text-secondary" />
      ) : sorted === "desc" ? (
        <ArrowDown className="h-4 w-4 shrink-0 text-text-secondary" />
      ) : (
        <ArrowUpDown className="h-4 w-4 shrink-0 opacity-40" />
      )}
    </button>
  );
}

function selectClassName() {
  return cn(
    "flex h-10 w-full rounded-md border border-border-primary bg-background-primary px-3 py-2 text-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950/20 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-white/20",
  );
}

export default function AdminInvitationsPage() {
  const { instance, accounts } = useMsal();
  const { isPlatformAdmin } = useAppRoles();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  /** Stable key so MSAL account object identity changes do not thrash effects/callbacks. */
  const accountKey =
    account?.homeAccountId ?? account?.localAccountId ?? null;

  const getAccessToken = useCallback(
    () => {
      const acc = instance.getActiveAccount() ?? accounts[0] ?? null;
      return acquireApiAccessToken(instance, acc);
    },
    [instance, accountKey],
  );

  const [mineBusinesses, setMineBusinesses] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [loadingBiz, setLoadingBiz] = useState(true);
  const [loadingInv, setLoadingInv] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  /** List scope: `""` means all businesses (platform admin only). */
  const [listBusinessScope, setListBusinessScope] = useState("");
  const [apiStatusFilter, setApiStatusFilter] = useState("");

  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);

  const [formEmail, setFormEmail] = useState("");
  const [formRole, setFormRole] = useState("member");
  /** Selected business id, or `"__manual__"` for platform admins entering a raw UUID. */
  const [createBizChoice, setCreateBizChoice] = useState("");
  const [createManualBusinessId, setCreateManualBusinessId] = useState("");
  const [formExpires, setFormExpires] = useState("");

  const [editing, setEditing] = useState(null);
  const [editStatus, setEditStatus] = useState("pending");
  const [editExpires, setEditExpires] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const businessById = useMemo(() => {
    const m = new Map();
    for (const b of mineBusinesses) {
      m.set(b.id, b);
    }
    return m;
  }, [mineBusinesses]);

  /** One gate for list + chart: avoids flashing table/content while businesses are in flight. */
  const invitationsDataLoading = loadingBiz || loadingInv;

  const refreshBusinesses = useCallback(async () => {
    setLoadingBiz(true);
    setError(null);
    try {
      const list = await fetchBusinessCatalog(getAccessToken);
      const arr = Array.isArray(list) ? list : [];
      setMineBusinesses(arr);

      if (!isPlatformAdmin && arr.length > 0) {
        setListBusinessScope((prev) => prev || arr[0].id);
      }

      if (arr.length > 0) {
        setCreateBizChoice((prev) => {
          if (prev === "__manual__" && isPlatformAdmin) return prev;
          if (prev && arr.some((b) => b.id === prev)) return prev;
          return arr[0].id;
        });
      } else if (isPlatformAdmin) {
        setCreateBizChoice("__manual__");
      }
    } catch (e) {
      setError(e?.message ?? "Could not load businesses.");
      setMineBusinesses([]);
    } finally {
      setLoadingBiz(false);
    }
  }, [getAccessToken, isPlatformAdmin]);

  const refreshInvitations = useCallback(async () => {
    if (loadingBiz) {
      return;
    }

    if (!isPlatformAdmin && mineBusinesses.length === 0) {
      setInvitations([]);
      setLoadingInv(false);
      return;
    }

    if (!isPlatformAdmin && !listBusinessScope) {
      /* Businesses are loaded but scope not set yet — keep loadingInv true */
      return;
    }

    setLoadingInv(true);
    setError(null);
    try {
      const q = {};
      if (apiStatusFilter) q.status = apiStatusFilter;
      if (isPlatformAdmin) {
        if (listBusinessScope) q.businessId = listBusinessScope;
      } else {
        q.businessId = listBusinessScope;
      }
      const list = await listInvitations(getAccessToken, q);
      setInvitations(Array.isArray(list) ? list : []);
    } catch (e) {
      setError(e?.message ?? "Could not load invitations.");
      setInvitations([]);
    } finally {
      setLoadingInv(false);
    }
  }, [
    getAccessToken,
    isPlatformAdmin,
    listBusinessScope,
    apiStatusFilter,
    loadingBiz,
    mineBusinesses.length,
  ]);

  useEffect(() => {
    void refreshBusinesses();
  }, [refreshBusinesses]);

  useEffect(() => {
    void refreshInvitations();
  }, [refreshInvitations]);

  const resolveBusinessLabel = useCallback(
    (businessId) => {
      const b = businessById.get(businessId);
      if (b) return businessDisplay(b);
      return businessId ? `${businessId.slice(0, 8)}…` : "—";
    },
    [businessById],
  );

  const globalFilterFn = useCallback(
    (row, _columnId, filterValue) => {
      const q = (filterValue ?? "").trim().toLowerCase();
      if (!q) return true;
      const inv = row.original;
      const biz = resolveBusinessLabel(inv.businessId).toLowerCase();
      const hay = [
        inv.email,
        inv.role,
        inv.status,
        biz,
        formatDate(inv.expiresAt),
        formatDate(inv.createdAt),
        inv.invitationToken,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    },
    [resolveBusinessLabel],
  );

  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Email</SortHeaderButton>
        ),
        cell: ({ getValue }) => (
          <span className="font-medium text-text-primary">{getValue()}</span>
        ),
      },
      {
        id: "business",
        accessorFn: (row) => resolveBusinessLabel(row.businessId),
        header: ({ column }) => (
          <SortHeaderButton column={column}>Business</SortHeaderButton>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Role</SortHeaderButton>
        ),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Status</SortHeaderButton>
        ),
        cell: ({ getValue }) => (
          <span className="capitalize text-text-secondary">{getValue()}</span>
        ),
      },
      {
        accessorKey: "expiresAt",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Expires</SortHeaderButton>
        ),
        sortingFn: (a, b) =>
          new Date(a.original.expiresAt) - new Date(b.original.expiresAt),
        cell: ({ getValue }) => (
          <span className="text-text-secondary">{formatDate(getValue())}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Created</SortHeaderButton>
        ),
        sortingFn: (a, b) =>
          new Date(a.original.createdAt) - new Date(b.original.createdAt),
        cell: ({ getValue }) => (
          <span className="text-text-secondary">{formatDate(getValue())}</span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        enableGlobalFilter: false,
        cell: ({ row }) => {
          const inv = row.original;
          const canEdit = inv.status === "pending";
          const canDelete = inv.status !== "accepted";
          return (
            <div className="flex items-center justify-end gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                disabled={!canEdit}
                title={
                  canEdit
                    ? "Edit invitation"
                    : "Only pending invitations can be edited"
                }
                onClick={() => {
                  setEditing(inv);
                  setEditStatus(inv.status);
                  setEditExpires(toDatetimeLocalValue(inv.expiresAt));
                }}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30"
                disabled={!canDelete}
                title={
                  canDelete
                    ? "Delete invitation"
                    : "Accepted invitations cannot be deleted"
                }
                onClick={() => {
                  if (
                    !window.confirm(
                      `Delete invitation for ${inv.email}? This cannot be undone.`,
                    )
                  ) {
                    return;
                  }
                  void (async () => {
                    try {
                      await deleteInvitation(getAccessToken, inv.id);
                      await refreshInvitations();
                    } catch (e) {
                      window.alert(
                        e?.data?.message ?? e?.message ?? "Delete failed.",
                      );
                    }
                  })();
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [getAccessToken, refreshInvitations, resolveBusinessLabel],
  );

  const table = useReactTable({
    data: invitations,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
  });

  const chartRows = useMemo(() => {
    const acc = {
      pending: 0,
      accepted: 0,
      expired: 0,
      revoked: 0,
    };
    for (const inv of invitations) {
      if (acc[inv.status] !== undefined) acc[inv.status] += 1;
    }
    return Object.entries(acc)
      .map(([name, value]) => ({
        name,
        value,
        fill: PIE_COLORS[name] ?? "#888888",
      }))
      .filter((r) => r.value > 0);
  }, [invitations]);

  async function onCreateSubmit(e) {
    e.preventDefault();
    const bid =
      createBizChoice === "__manual__"
        ? createManualBusinessId.trim()
        : createBizChoice.trim();
    if (!bid) {
      window.alert("Select or enter a business.");
      return;
    }
    setSubmitting(true);
    try {
      const body = {
        businessId: bid,
        email: formEmail.trim(),
        role: formRole,
        ...(formExpires ? { expiresAt: fromDatetimeLocalToIso(formExpires) } : {}),
      };
      // #region invitation mail debug trace (browser console)
      console.log(
        "[invitations-debug] onCreateSubmit → POST /invitations",
        { businessId: body.businessId, role: body.role, hasExpiresAt: !!body.expiresAt },
      );
      const created = await createInvitation(getAccessToken, body);
      console.log("[invitations-debug] POST /invitations response:", created);
      if (created?.emailSent === false) {
        console.warn(
          "[invitations-debug] emailSent=false → API skipped SMTP or send failed. Check MAIL_ENABLED, MAIL_FROM, PUBLIC_APP_URL, SMTP_* on backend and Azure log stream.",
        );
      }
      if (created?.emailSent === true) {
        console.info(
          "[invitations-debug] emailSent=true → SMTP handshake completed server-side.",
        );
      }
      // #endregion
      setFormEmail("");
      setFormExpires("");
      await refreshInvitations();
    } catch (err) {
      const msg =
        err?.data?.message ??
        (typeof err?.data === "string" ? err.data : null) ??
        err?.message ??
        "Could not create invitation.";
      window.alert(msg);
    } finally {
      setSubmitting(false);
    }
  }

  async function onSaveEdit(e) {
    e.preventDefault();
    if (!editing) return;
    setEditSaving(true);
    try {
      const body = {};
      if (editStatus !== editing.status) body.status = editStatus;
      const nextIso = fromDatetimeLocalToIso(editExpires);
      const prevIso = editing.expiresAt
        ? new Date(editing.expiresAt).toISOString()
        : null;
      if (nextIso && nextIso !== prevIso) body.expiresAt = nextIso;
      if (Object.keys(body).length === 0) {
        setEditing(null);
        return;
      }
      await patchInvitation(getAccessToken, editing.id, body);
      setEditing(null);
      await refreshInvitations();
    } catch (err) {
      const msg =
        err?.data?.message ??
        (typeof err?.data === "string" ? err.data : null) ??
        err?.message ??
        "Could not update invitation.";
      window.alert(msg);
    } finally {
      setEditSaving(false);
    }
  }

  return (
    <AdminSectionShell
      title="Invitations"
      subtitle="Pending and accepted invitations to organizations (email-based onboarding)."
    >
      {error ? (
        <p className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Create invitation</CardTitle>
            <CardDescription>
              Send a pending invite for a business you manage. Expiry defaults to
              seven days on the server if left empty.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={onCreateSubmit}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              <div className="space-y-2 md:col-span-2 lg:col-span-1">
                <Label htmlFor="inv-email">Email</Label>
                <Input
                  id="inv-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inv-role">Role</Label>
                <select
                  id="inv-role"
                  className={selectClassName()}
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value)}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="inv-biz">Business</Label>
                {mineBusinesses.length === 0 && !isPlatformAdmin ? (
                  <p className="text-sm text-text-secondary">
                    You need to belong to a business before you can send invitations.
                  </p>
                ) : (
                  <>
                    <select
                      id="inv-biz"
                      className={selectClassName()}
                      value={
                        createBizChoice === "__manual__"
                          ? "__manual__"
                          : mineBusinesses.some((b) => b.id === createBizChoice)
                            ? createBizChoice
                            : (mineBusinesses[0]?.id ?? "__manual__")
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "__manual__") {
                          setCreateBizChoice("__manual__");
                        } else {
                          setCreateBizChoice(v);
                          setCreateManualBusinessId("");
                        }
                      }}
                    >
                      {mineBusinesses.map((b) => (
                        <option key={b.id} value={b.id}>
                          {businessDisplay(b)}
                        </option>
                      ))}
                      {isPlatformAdmin ? (
                        <option value="__manual__">
                          Other (enter business ID)…
                        </option>
                      ) : null}
                    </select>
                    {createBizChoice === "__manual__" ? (
                      <Input
                        id="inv-biz-manual"
                        className="mt-2"
                        placeholder="Business UUID"
                        value={createManualBusinessId}
                        onChange={(e) =>
                          setCreateManualBusinessId(e.target.value)
                        }
                      />
                    ) : null}
                  </>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="inv-exp">Expires (optional)</Label>
                <Input
                  id="inv-exp"
                  type="datetime-local"
                  value={formExpires}
                  onChange={(e) => setFormExpires(e.target.value)}
                />
              </div>
              <div className="flex items-end md:col-span-2 lg:col-span-3">
                <Button
                  type="submit"
                  disabled={
                    submitting ||
                    loadingBiz ||
                    (!mineBusinesses.length && !isPlatformAdmin)
                  }
                >
                  {submitting ? "Sending…" : "Send invitation"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2">
            <CardHeader className="space-y-4">
              <div>
                <CardTitle>All invitations</CardTitle>
                <CardDescription>
                  Sort by clicking column headers. Use the search box to filter
                  rows.
                </CardDescription>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
                <div className="min-w-[180px] flex-1 space-y-2">
                  <Label htmlFor="inv-filter-search">Search</Label>
                  <Input
                    id="inv-filter-search"
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Filter by email, status, business…"
                  />
                </div>
                {isPlatformAdmin ? (
                  <div className="min-w-[200px] space-y-2">
                    <Label htmlFor="inv-list-biz">Business scope</Label>
                    <select
                      id="inv-list-biz"
                      className={selectClassName()}
                      value={listBusinessScope}
                      onChange={(e) => setListBusinessScope(e.target.value)}
                    >
                      <option value="">All businesses</option>
                      {mineBusinesses.map((b) => (
                        <option key={b.id} value={b.id}>
                          {businessDisplay(b)}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : null}
                <div className="min-w-[200px] space-y-2">
                  <Label htmlFor="inv-api-status">API status filter</Label>
                  <select
                    id="inv-api-status"
                    className={selectClassName()}
                    value={apiStatusFilter}
                    onChange={(e) => setApiStatusFilter(e.target.value)}
                  >
                    {INV_STATUSES.map((s) => (
                      <option key={s.value || "all"} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {invitationsDataLoading ? (
                <p className="text-sm text-text-secondary">Loading…</p>
              ) : !isPlatformAdmin && !listBusinessScope ? (
                <p className="text-sm text-text-secondary">
                  Join a business to manage invitations, or ask a platform admin
                  for access.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                      <TableRow key={hg.id}>
                        {hg.headers.map((header) => (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center text-text-secondary"
                        >
                          No invitations match.
                        </TableCell>
                      </TableRow>
                    ) : (
                      table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Card className="min-h-[320px] xl:col-span-1">
            <CardHeader>
              <CardTitle>By status</CardTitle>
              <CardDescription>
                Distribution of invitations currently loaded (after API filters).
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[280px]">
              {invitationsDataLoading ? (
                <p className="text-sm text-text-secondary">Loading…</p>
              ) : invitations.length === 0 ? (
                <p className="text-sm text-text-secondary">No data.</p>
              ) : chartRows.length === 0 ? (
                <p className="text-sm text-text-secondary">
                  No status breakdown for the current rows.
                </p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartRows}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={2}
                    >
                      {chartRows.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}`, String(name)]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      formatter={(value) => (
                        <span className="capitalize">{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {editing ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-inv-title"
        >
          <Card className="max-h-[90vh] w-full max-w-md overflow-y-auto">
            <CardHeader>
              <CardTitle id="edit-inv-title">Edit invitation</CardTitle>
              <CardDescription>
                {editing.status === "pending"
                  ? "Update expiry or mark as expired/revoked."
                  : "Only pending invitations can change status or expiry."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={onSaveEdit} className="space-y-4">
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">
                    {editing.email}
                  </span>
                </p>
                {editing.status === "pending" ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="edit-status">Status</Label>
                      <select
                        id="edit-status"
                        className={selectClassName()}
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        {EDIT_STATUSES.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-exp">Expires</Label>
                      <Input
                        id="edit-exp"
                        type="datetime-local"
                        value={editExpires}
                        onChange={(e) => setEditExpires(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    This invitation is not pending; close and use list filters
                    instead.
                  </p>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditing(null)}
                  >
                    Cancel
                  </Button>
                  {editing.status === "pending" ? (
                    <Button type="submit" disabled={editSaving}>
                      {editSaving ? "Saving…" : "Save"}
                    </Button>
                  ) : null}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </AdminSectionShell>
  );
}
