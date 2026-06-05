import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@relume_io/relume-ui";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  createManagerTool,
  deleteManagerTool,
  fetchManagerTools,
  updateManagerTool,
} from "../../api/managerTools.js";
import { unwrapApiErrorPayload } from "../../api/client.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button";
import { useManagerWorkspace } from "../../context/ManagerWorkspaceContext.jsx";
import { useGetAccessToken } from "../../hooks/useGetAccessToken";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
import {
  defaultManagerToolValues,
  managerToolFormSchema,
  MANAGER_TOOL_STATUSES,
} from "./managerToolFormSchema.js";

const STATUS_LABEL = {
  available: "Available",
  in_use: "In Use",
  maintenance: "Maintenance",
};

const IMAGE_MAX_BYTES = 750_000;

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ToolSkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="h-64 animate-pulse rounded-xl border border-border-primary bg-neutral-100 dark:bg-neutral-900"
        />
      ))}
    </div>
  );
}

export default function ManagerToolsPage() {
  const getAccessToken = useGetAccessToken();
  const qc = useQueryClient();
  const ws = useManagerWorkspace();
  const businessId = ws.selectedBusinessId;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const filters = useMemo(
    () => ({
      ...(debouncedSearch.trim() ? { q: debouncedSearch.trim() } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
    }),
    [debouncedSearch, statusFilter],
  );

  const toolsQuery = useQuery({
    queryKey: ["manager", "tools", businessId ?? "", filters],
    queryFn: () => fetchManagerTools(getAccessToken, businessId, filters),
    enabled: Boolean(businessId),
  });

  const form = useForm({
    resolver: zodResolver(managerToolFormSchema),
    defaultValues: defaultManagerToolValues(),
  });

  const openCreate = useCallback(() => {
    setEditingId(null);
    form.reset(defaultManagerToolValues());
    setDialogOpen(true);
  }, [form]);

  const openEdit = useCallback(
    (row) => {
      setEditingId(row.id);
      form.reset({
        name: row.name ?? "",
        description: row.description ?? "",
        category: row.category ?? "",
        imageUrl: row.imageUrl ?? "",
        quantity: Number(row.quantity) || 0,
        status: row.status ?? "available",
        serialNumber: row.serialNumber ?? "",
      });
      setDialogOpen(true);
    },
    [form],
  );

  const createMut = useMutation({
    mutationFn: async (values) => {
      if (!businessId) throw new Error("Missing business");
      return createManagerTool(getAccessToken, {
        businessId,
        name: values.name,
        description: values.description || undefined,
        category: values.category,
        imageUrl: values.imageUrl || undefined,
        quantity: values.quantity,
        status: values.status,
        serialNumber: values.serialNumber || undefined,
      });
    },
    onSuccess: () => {
      toast.success("Tool created");
      qc.invalidateQueries({ queryKey: ["manager", "tools"] });
      qc.invalidateQueries({ queryKey: ["manager", "tools-summary"] });
      setDialogOpen(false);
      form.reset(defaultManagerToolValues());
    },
    onError: (err) => {
      const { text } = unwrapApiErrorPayload(err?.data ?? {});
      toast.error(text || err?.message || "Could not create tool");
    },
  });

  const updateMut = useMutation({
    mutationFn: async (values) => {
      if (!businessId || !editingId) throw new Error("Missing context");
      return updateManagerTool(getAccessToken, businessId, editingId, {
        name: values.name,
        description: values.description || null,
        category: values.category,
        imageUrl: values.imageUrl || null,
        quantity: values.quantity,
        status: values.status,
        serialNumber: values.serialNumber || null,
      });
    },
    onSuccess: () => {
      toast.success("Tool updated");
      qc.invalidateQueries({ queryKey: ["manager", "tools"] });
      qc.invalidateQueries({ queryKey: ["manager", "tools-summary"] });
      setDialogOpen(false);
      setEditingId(null);
      form.reset(defaultManagerToolValues());
    },
    onError: (err) => {
      const { text } = unwrapApiErrorPayload(err?.data ?? {});
      toast.error(text || err?.message || "Could not update tool");
    },
  });

  const deleteMut = useMutation({
    mutationFn: async (id) => {
      if (!businessId) throw new Error("Missing business");
      return deleteManagerTool(getAccessToken, businessId, id);
    },
    onSuccess: () => {
      toast.success("Tool deleted");
      qc.invalidateQueries({ queryKey: ["manager", "tools"] });
      qc.invalidateQueries({ queryKey: ["manager", "tools-summary"] });
    },
    onError: (err) => {
      const { text } = unwrapApiErrorPayload(err?.data ?? {});
      toast.error(text || err?.message || "Could not delete");
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (editingId) updateMut.mutate(values);
    else createMut.mutate(values);
  });

  const busy = createMut.isPending || updateMut.isPending;

  const onPickImage = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      toast.error("Image must be smaller than ~750 KB");
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      form.setValue("imageUrl", dataUrl, { shouldValidate: true, shouldDirty: true });
      toast.success("Image attached");
    } catch {
      toast.error("Could not read image");
    }
  };

  const tools = Array.isArray(toolsQuery.data) ? toolsQuery.data : [];

  return (
    <AdminSectionShell
      title="Tools"
      subtitle="Create, edit, and filter on-site inventory. Data is scoped to the selected organization."
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="relative min-w-[12rem] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-secondary" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, category, serial…"
              className="h-10 pl-9"
              disabled={!businessId}
            />
          </div>
          <select
            className="h-10 rounded-md border border-border-primary bg-background-primary px-3 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            disabled={!businessId}
          >
            <option value="">All statuses</option>
            {MANAGER_TOOL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_LABEL[s] ?? s}
              </option>
            ))}
          </select>
        </div>
        <Button
          type="button"
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 !bg-indigo-600 !text-white shadow-sm hover:!bg-indigo-700 sm:w-auto"
          onClick={openCreate}
          disabled={!businessId}
        >
          <Plus className="size-4" aria-hidden />
          Add tool
        </Button>
      </div>

      {toolsQuery.isLoading ? (
        <ToolSkeletonGrid />
      ) : (
        <>
          {!businessId && !ws.isLoading ? (
            <p className="mt-6 text-sm text-text-secondary">
              Join an organization with manager access to manage tools.
            </p>
          ) : null}

          {businessId && tools.length === 0 ? (
            <Card className="mt-6 border-dashed border-border-primary">
              <CardContent className="py-16 text-center text-sm text-text-secondary">
                No tools yet. Add your first item to populate the grid.
              </CardContent>
            </Card>
          ) : null}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((t) => (
              <Card key={t.id} className="overflow-hidden border-border-primary">
                <div className="aspect-[16/10] w-full bg-neutral-100 dark:bg-neutral-900">
                  {t.imageUrl ? (
                    <img
                      src={t.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-text-secondary">
                      No image
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-2 text-base">{t.name}</CardTitle>
                  <p className="text-xs text-text-secondary">
                    {t.category} · Qty {t.quantity}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium dark:bg-neutral-800">
                      {STATUS_LABEL[t.status] ?? t.status}
                    </span>
                    {t.serialNumber ? (
                      <span className="text-xs text-text-secondary">
                        SN {t.serialNumber}
                      </span>
                    ) : null}
                  </div>
                  {t.description ? (
                    <p className="line-clamp-3 text-text-secondary">{t.description}</p>
                  ) : null}
                  <p className="text-xs text-text-secondary">
                    Added{" "}
                    {t.createdAt
                      ? new Date(t.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="inline-flex items-center gap-1"
                      onClick={() => openEdit(t)}
                    >
                      <Pencil className="size-3.5" aria-hidden />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="inline-flex items-center gap-1 text-red-600 dark:text-red-400"
                      onClick={() => {
                        if (
                          typeof window !== "undefined" &&
                          window.confirm(`Delete "${t.name}"?`)
                        ) {
                          deleteMut.mutate(t.id);
                        }
                      }}
                      disabled={deleteMut.isPending}
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setEditingId(null);
            form.reset(defaultManagerToolValues());
          }
        }}
      >
        <DialogContent className="flex max-h-[min(90dvh,720px)] flex-col gap-0 overflow-hidden border-border-primary bg-background-primary p-0 sm:max-w-lg">
          <DialogHeader className="shrink-0 border-b border-border-primary px-6 py-4">
            <DialogTitle>
              {editingId ? "Edit tool" : "Add tool"}
            </DialogTitle>
            <DialogDescription>
              Fields are validated before save. Images are inlined for MVP — swap
              for blob storage when your infra is ready.
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex min-h-0 flex-1 flex-col overflow-hidden"
            onSubmit={onSubmit}
          >
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-6 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="tool-name">Tool name</Label>
              <Input
                id="tool-name"
                {...form.register("name")}
                className={form.formState.errors.name ? "border-red-500" : ""}
              />
              {form.formState.errors.name ? (
                <p className="text-xs text-red-600">
                  {String(form.formState.errors.name.message ?? "")}
                </p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tool-desc">Description</Label>
              <textarea
                id="tool-desc"
                rows={3}
                className="flex w-full rounded-md border border-border-primary bg-transparent px-3 py-2 text-sm outline-none ring-offset-background-primary focus-visible:ring-2 focus-visible:ring-border-primary"
                {...form.register("description")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tool-cat">Category</Label>
                <Input id="tool-cat" {...form.register("category")} />
                {form.formState.errors.category ? (
                  <p className="text-xs text-red-600">
                    {String(form.formState.errors.category.message ?? "")}
                  </p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tool-qty">Quantity</Label>
                <Input
                  id="tool-qty"
                  type="number"
                  min={0}
                  {...form.register("quantity", { valueAsNumber: true })}
                />
                {form.formState.errors.quantity ? (
                  <p className="text-xs text-red-600">
                    {String(form.formState.errors.quantity.message ?? "")}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Status</Label>
              <Controller
                control={form.control}
                name="status"
                render={({ field }) => (
                  <select
                    className="h-10 w-full rounded-md border border-border-primary bg-background-primary px-3 text-sm"
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  >
                    {MANAGER_TOOL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABEL[s] ?? s}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tool-serial">Serial number</Label>
              <Input id="tool-serial" {...form.register("serialNumber")} />
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickImage}
              />
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload image
                </Button>
                {form.watch("imageUrl") ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      form.setValue("imageUrl", "", { shouldDirty: true })
                    }
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
              {form.formState.errors.imageUrl ? (
                <p className="text-xs text-red-600">
                  {String(form.formState.errors.imageUrl.message ?? "")}
                </p>
              ) : null}
              {form.watch("imageUrl") ? (
                <img
                  src={form.watch("imageUrl")}
                  alt=""
                  className="mt-2 max-h-40 rounded-md border border-border-primary object-contain"
                />
              ) : null}
            </div>
            </div>

            <DialogFooter className="shrink-0 gap-2 border-t border-border-primary bg-background-primary px-6 py-4 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                disabled={busy}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="inline-flex w-full shrink-0 items-center justify-center !bg-indigo-600 !text-white shadow-sm hover:!bg-indigo-700 sm:w-auto"
                disabled={busy}
              >
                {busy ? "Saving…" : editingId ? "Save changes" : "Create tool"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminSectionShell>
  );
}
