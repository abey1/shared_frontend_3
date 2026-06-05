import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
import { unwrapApiErrorPayload } from "../../api/client.js";
import { useOwnerWorkspace } from "../../context/OwnerWorkspaceContext";
import { useGetAccessToken } from "../../hooks/useGetAccessToken";
import {
  businessHeading,
  getBusinessDetail,
  updateBusinessDetail,
} from "../../services/businessService";
import type { LocalBusinessPrefs } from "../../types/owner";

type BizDetailRow = {
  legalName: string;
  name: string | null;
  subdomain: string | null;
  taxId: string | null;
};

function prefsStorageKey(id: string) {
  return `owner_business_prefs_${id}`;
}

function loadPrefs(id: string | null): LocalBusinessPrefs | null {
  if (!id || typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(prefsStorageKey(id));
    if (!raw) return null;
    const j = JSON.parse(raw) as LocalBusinessPrefs;
    return typeof j === "object" && j !== null ? j : null;
  } catch {
    return null;
  }
}

function savePrefs(id: string, prefs: LocalBusinessPrefs) {
  try {
    window.localStorage.setItem(prefsStorageKey(id), JSON.stringify(prefs));
  } catch {
    toast.error("Could not persist display preferences locally.");
  }
}

function unwrapErr(e: unknown): string {
  const rec =
    typeof e === "object" && e !== null ?
      (e as { data?: unknown; message?: string })
    : undefined;

  if (rec?.data && typeof rec.data === "object" && rec.data !== null) {
    const u = unwrapApiErrorPayload(rec.data as Record<string, unknown>);
    if (u.text && u.text !== "Request failed.") return u.text;
  }
  return rec?.message ?? "Unable to save business.";
}

export default function OwnerBusinessPage() {
  const getAccessToken = useGetAccessToken();
  const { selectedBusinessId, selectedBusiness, refetch } = useOwnerWorkspace();
  const queryClient = useQueryClient();

  const detailQuery = useQuery({
    queryKey: ["owner", "business", selectedBusinessId],
    queryFn: () => getBusinessDetail(getAccessToken, selectedBusinessId!),
    enabled: Boolean(selectedBusinessId),
  });

  const biz = detailQuery.data as BizDetailRow | undefined;

  const [legalName, setLegalName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [taxId, setTaxId] = useState("");
  const [subdomain, setSubdomain] = useState("");
  const [prefs, setPrefs] = useState<LocalBusinessPrefs>({
    logoUrl: "",
    hoursText: "",
    taxDisplayNote: "",
  });

  useEffect(() => {
    if (!biz) return;
    setLegalName(biz.legalName ?? "");
    setDisplayName(biz.name ?? "");
    setTaxId(biz.taxId ?? "");
    setSubdomain(biz.subdomain ?? "");
  }, [biz]);

  useEffect(() => {
    const p = loadPrefs(selectedBusinessId);
    setPrefs(
      p ?? {
        logoUrl: "",
        hoursText: "",
        taxDisplayNote: "",
      },
    );
  }, [selectedBusinessId]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!selectedBusinessId) throw new Error("No business.");
      await updateBusinessDetail(getAccessToken, selectedBusinessId, {
        legalName: legalName.trim(),
        name: displayName.trim() ? displayName.trim() : null,
        taxId: taxId.trim() ? taxId.trim() : null,
        subdomain:
          subdomain.trim() ? subdomain.trim().toLowerCase() : null,
      });
      savePrefs(selectedBusinessId, prefs);
    },
    onSuccess: async () => {
      toast.success("Business profile updated.");
      await queryClient.invalidateQueries({
        queryKey: ["owner", "business", selectedBusinessId],
      });
      void refetch();
    },
    onError: (e) => toast.error(unwrapErr(e)),
  });

  if (!selectedBusinessId || !selectedBusiness) {
    return (
      <AdminSectionShell title="Business profile">
        <p className="text-sm text-text-secondary">
          Select an owned organization from the header to edit its profile.
        </p>
      </AdminSectionShell>
    );
  }

  const heading = businessHeading(selectedBusiness);

  return (
    <AdminSectionShell
      title={`Business • ${heading}`}
      subtitle="Branding previews and hours are cached in this browser until API storage is added."
    >
      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle>Company details</CardTitle>
            <CardDescription>Stored in MSSQL (`businesses`).</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="ob-legal">Legal name</Label>
                <Input
                  id="ob-legal"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  disabled={detailQuery.isPending || saveMutation.isPending}
                  minLength={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-display">Display name</Label>
                <Input
                  id="ob-display"
                  value={displayName}
                  placeholder="Friendly brand name shown to renters"
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={detailQuery.isPending || saveMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ob-sub">Subdomain (optional)</Label>
                <Input
                  id="ob-sub"
                  value={subdomain}
                  placeholder="northside-tools"
                  onChange={(e) => setSubdomain(e.target.value)}
                  disabled={detailQuery.isPending || saveMutation.isPending}
                />
                <p className="text-xs text-text-secondary">
                  Lowercase letters, numbers, and hyphens — must be unique in the platform.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ob-tax">Tax identifier</Label>
                <Input
                  id="ob-tax"
                  value={taxId}
                  placeholder="VAT / FEIN reference"
                  onChange={(e) => setTaxId(e.target.value)}
                  disabled={detailQuery.isPending || saveMutation.isPending}
                />
              </div>

              <Button type="submit" disabled={detailQuery.isPending || saveMutation.isPending}>
                {saveMutation.isPending ? "Saving…" : "Save company details"}
              </Button>

              {!detailQuery.isPending && detailQuery.error ? (
                <p className="text-sm text-red-600">
                  Unable to fetch business ({String(detailQuery.error)}).
                </p>
              ) : null}
            </form>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle>Brand & storefront</CardTitle>
            <CardDescription>Saved locally in this browser profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ob-logo">Logo URL (placeholder)</Label>
              <Input
                id="ob-logo"
                value={prefs.logoUrl}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, logoUrl: e.target.value }))
                }
                placeholder="https://..."
              />
            </div>
            <div className="rounded-lg border border-dashed border-border-primary p-10 text-center text-sm text-text-secondary">
              {prefs.logoUrl ?
                (
                  <img
                    src={prefs.logoUrl}
                    alt={`${businessHeading(selectedBusiness)} logo preview`}
                    className="mx-auto max-h-24 object-contain"
                  />
                )
              : "Paste a CDN image URL above to preview the logo badge."}
            </div>

            <div className="space-y-2">
              <Label htmlFor="ob-hours">Business hours</Label>
              <textarea
                id="ob-hours"
                rows={6}
                className="flex w-full rounded-md border border-border-primary bg-background-primary px-3 py-2 text-sm text-text-primary shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-neutral-950/20 dark:focus-visible:ring-white/20"
                placeholder="Weekday / weekend pickups, blackout dates, SLA…"
                value={prefs.hoursText}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, hoursText: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ob-tax-notes">Tax / pricing notes</Label>
              <textarea
                id="ob-tax-notes"
                rows={3}
                className="flex w-full rounded-md border border-border-primary bg-background-primary px-3 py-2 text-sm text-text-primary shadow-sm"
                placeholder="Regional tax handling, surcharge policy…"
                value={prefs.taxDisplayNote}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, taxDisplayNote: e.target.value }))
                }
              />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                if (selectedBusinessId) savePrefs(selectedBusinessId, prefs);
                toast.success("Local preferences cached for this browser.");
              }}
            >
              Save storefront preview
            </Button>
          </CardContent>
        </Card>
      </div>
    </AdminSectionShell>
  );
}
