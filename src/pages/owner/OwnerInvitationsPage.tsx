import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Mail,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
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
import { useOwnerWorkspace } from "../../context/OwnerWorkspaceContext";
import { useGetAccessToken } from "../../hooks/useGetAccessToken";
import { useOwnerInvitationCommands } from "../../hooks/owner/useOwnerInvitationCommands";
import { useOwnerInvitationsQuery } from "../../hooks/owner/useOwnerInvitationsQuery";
import { cn } from "../../lib/cn.js";
import type { InvitationRow } from "../../types/owner";

const MANAGER_ROLE: InvitationRow["role"] = "manager";

function formatDate(iso: string | null | undefined) {
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

function toDatetimeLocalValue(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalToIso(local: string): string | undefined {
  if (!local) return undefined;
  const d = new Date(local);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
}

function SortHeaderButton({
  column,
  children,
}: {
  column: {
    getIsSorted: () => false | "asc" | "desc";
    getToggleSortingHandler: () => () => void;
  };
  children: React.ReactNode;
}) {
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

function statusBadgeClass(status: string) {
  switch (status) {
    case "pending":
      return "bg-amber-100 text-amber-950 dark:bg-amber-950/60 dark:text-amber-50";
    case "accepted":
      return "bg-emerald-100 text-emerald-950 dark:bg-emerald-950/50 dark:text-emerald-50";
    case "expired":
      return "bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50";
    case "revoked":
      return "bg-red-100 text-red-950 dark:bg-red-950/50 dark:text-red-50";
    default:
      return "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50";
  }
}

export default function OwnerInvitationsPage() {
  const getAccessToken = useGetAccessToken();
  const { selectedBusinessId, selectedBusiness, refetch: refetchWorkspace } =
    useOwnerWorkspace();

  const [filterStatus, setFilterStatus] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [formEmail, setFormEmail] = useState("");
  const [formExpires, setFormExpires] = useState("");

  const [editRow, setEditRow] = useState<InvitationRow | null>(null);
  const [editExpires, setEditExpires] = useState("");

  const invQuery = useOwnerInvitationsQuery({
    getAccessToken,
    businessId: selectedBusinessId,
    status: filterStatus || undefined,
  });

  const commands = useOwnerInvitationCommands(selectedBusinessId, getAccessToken);

  const invitations = invQuery.data ?? [];

  const globalFilterFn = (
    row: Row<InvitationRow>,
    _: string,
    v: unknown,
  ) => {
    const q = String(v ?? "").trim().toLowerCase();
    if (!q) return true;
    const inv = row.original;
    const hay = [inv.email, inv.status, formatDate(inv.expiresAt)].join(" ").toLowerCase();
    return hay.includes(q);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "email",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Email</SortHeaderButton>
        ),
        cell: ({ getValue }) => (
          <span className="font-medium text-text-primary">{getValue() as string}</span>
        ),
      },
      {
        id: "role",
        accessorFn: () => "manager",
        header: () => <span className="text-sm font-medium">Role</span>,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Status</SortHeaderButton>
        ),
        cell: ({ getValue }) => (
          <span
            className={cn(
              "inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
              statusBadgeClass(getValue() as string),
            )}
          >
            {String(getValue())}
          </span>
        ),
      },
      {
        accessorKey: "expiresAt",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Expires</SortHeaderButton>
        ),
        sortingFn: (a, b) =>
          new Date(a.original.expiresAt).getTime() - new Date(b.original.expiresAt).getTime(),
        cell: ({ row }) => (
          <span className="text-text-secondary">{formatDate(row.original.expiresAt)}</span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: ({ column }) => (
          <SortHeaderButton column={column}>Created</SortHeaderButton>
        ),
        sortingFn: (a, b) =>
          new Date(a.original.createdAt).getTime() - new Date(b.original.createdAt).getTime(),
        cell: ({ row }) => (
          <span className="text-text-secondary">{formatDate(row.original.createdAt)}</span>
        ),
      },
      {
        id: "actions",
        header: () => <span className="sr-only">Actions</span>,
        enableSorting: false,
        enableGlobalFilter: false,
        cell: ({ row }: { row: { original: InvitationRow } }) => {
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
                title="Resend invitation email"
                disabled={!canEdit || commands.resendInvitationMut.isPending}
                onClick={() => commands.resendInvitationMut.mutate(inv.id)}
              >
                <RefreshCw className="h-4 w-4" />
                <span className="sr-only">Resend</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                title="Adjust expiry"
                disabled={!canEdit}
                onClick={() => {
                  setEditRow(inv);
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
                title="Cancel invitation"
                disabled={!canDelete}
                onClick={() => {
                  if (
                    !window.confirm(
                      `Cancel invitation for ${inv.email}? This removes the pending invite.`,
                    )
                  )
                    return;
                  commands.removeInvitation.mutate(inv.id);
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [commands],
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

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedBusinessId || !selectedBusiness) {
      toast.error("Select an organization.");
      return;
    }
    const email = formEmail.trim();
    if (!email.includes("@")) {
      toast.error("Enter a valid email.");
      return;
    }
    const expiresIso = fromDatetimeLocalToIso(formExpires);
    try {
      await commands.createPending.mutateAsync({
        email,
        role: MANAGER_ROLE,
        ...(expiresIso ? { expiresAt: expiresIso } : {}),
      });
      setFormEmail("");
      setFormExpires("");
    } catch {
      /* toast handled in mutation */
    }
  }

  async function onSaveExpiry(e: React.FormEvent) {
    e.preventDefault();
    if (!editRow) return;
    const nextIso = fromDatetimeLocalToIso(editExpires);
    const prevIso = editRow.expiresAt ? new Date(editRow.expiresAt).toISOString() : null;
    if (nextIso && nextIso !== prevIso) {
      try {
        await commands.patchPending.mutateAsync({
          id: editRow.id,
          body: { expiresAt: nextIso },
        });
      } catch {
        /* toast handled */
        return;
      }
    }
    setEditRow(null);
  }

  if (!selectedBusinessId || !selectedBusiness) {
    return (
      <AdminSectionShell title="Invitations">
        <p className="text-sm text-text-secondary">
          Choose an owned organization from the header to manage invitations.
        </p>
      </AdminSectionShell>
    );
  }

  const displayName =
    selectedBusiness?.name?.trim() || selectedBusiness?.legalName || selectedBusiness?.id;

  return (
    <AdminSectionShell
      title="Manager invitations"
      subtitle={`Invite store managers only for ${displayName}. All invites use role “manager”.`}
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <Card className="border-border-primary lg:col-span-6">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2">
              <Mail className="size-5" aria-hidden /> Invite manager
            </CardTitle>
            <CardDescription>
              We email a secure invitation link scoped to your selected business only.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={onCreate}>
              <input type="hidden" name="role" value={MANAGER_ROLE} readOnly />

              <div className="space-y-2">
                <Label htmlFor="invite-email-owner">Email</Label>
                <Input
                  id="invite-email-owner"
                  placeholder="lead.manager@business.com"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  disabled={commands.createPending.isPending}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invite-exp-owner">Expires</Label>
                <Input
                  id="invite-exp-owner"
                  type="datetime-local"
                  value={formExpires}
                  onChange={(e) => setFormExpires(e.target.value)}
                  disabled={commands.createPending.isPending}
                />
                <p className="text-xs text-text-secondary">
                  Optional — leave blank for the default expiry window enforced by your API server.
                </p>
              </div>

              <Button type="submit" disabled={commands.createPending.isPending}>
                {commands.createPending.isPending ? "Sending…" : "Send invitation"}
              </Button>

              {!invQuery.isPending && (
                invQuery.error ?
                  <p className="text-sm text-red-700 dark:text-red-300">
                    {invQuery.error instanceof Error ? invQuery.error.message : String(invQuery.error)}
                  </p>
                : null
              )}
            </form>
          </CardContent>
        </Card>

        <Card className="border-border-primary lg:col-span-6">
          <CardHeader className="space-y-1">
            <CardTitle>Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-text-secondary">
            <p>
              Managers gain operational access scoped by your memberships and policies. Accepted
              users must sign in using the inbox that receives the invitation.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() =>
                Promise.all([invQuery.refetch(), refetchWorkspace()]).catch(() => undefined)
              }
            >
              Refresh data
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-3 lg:col-span-12">
          <Card className="border-border-primary pt-6">
            <CardHeader className="pb-6">
              <CardTitle className="text-lg">Invitation history</CardTitle>
              <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="status-filter-owner">API status filter</Label>
                    <select
                      id="status-filter-owner"
                      className={cn(
                        "h-11 min-w-[10rem] rounded-md border border-border-primary bg-background-primary px-3 text-sm shadow-sm",
                      )}
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="">All statuses</option>
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="expired">Expired</option>
                      <option value="revoked">Revoked</option>
                    </select>
                  </div>
                  <div className="grow space-y-1 md:w-80">
                    <Label htmlFor="table-search-owner">Search</Label>
                    <Input
                      id="table-search-owner"
                      value={globalFilter}
                      placeholder="Email, dates, …"
                      onChange={(event) =>
                        table.setGlobalFilter(String(event.target.value))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className={cn("rounded-xl border border-border-primary shadow-sm px-8 py-12")}>
            {invQuery.isPending ? (
              <p className="text-center text-xs text-muted-foreground">Loading invitations …</p>
            ) :
              invitations.length === 0 ? (
              <div className="mx-auto grid max-w-sm justify-items-start gap-y-8 text-muted-foreground">
                <Mail className="h-40 w-full text-muted-foreground" />
                <p className="text-center text-xs">No invitations for this scope yet.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-neutral-950/[0.02] dark:bg-neutral-950/40">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
                              {header.isPlaceholder ?
                                null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody className="bg-background-primary">
                      {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} className="border-border-secondary">
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {editRow ?
        (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
            <div className="w-full max-w-md rounded-xl border border-border-primary bg-background-primary p-6 shadow-xl">
              <h3 className="text-lg font-semibold">Adjust expiry</h3>
              <p className="mt-2 text-xs text-text-secondary">{editRow.email}</p>
              <form className="mt-6 space-y-4" onSubmit={onSaveExpiry}>
                <div className="space-y-2">
                  <Label htmlFor="dlg-exp-owner">Expiry</Label>
                  <Input
                    id="dlg-exp-owner"
                    type="datetime-local"
                    value={editExpires}
                    onChange={(e) => setEditExpires(e.target.value)}
                  />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" size="sm">
                    Save
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={() => setEditRow(null)}>
                    Close
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )
      : null}
    </AdminSectionShell>
  );
}
