import { Bell, Lock, Palette } from "lucide-react";
import AdminSectionShell from "../admin/AdminSectionShell.jsx";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Label } from "../../components/ui/label.jsx";

export default function OwnerSettingsPage() {
  return (
    <AdminSectionShell
      title="Settings"
      subtitle="Operational preferences for storefront communications and security posture."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="size-5" aria-hidden />
              Notifications
            </CardTitle>
            <CardDescription>Outbound events for SLA breaches + payouts.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-text-secondary">
            <NotificationToggle title="Weekly revenue digest (email placeholder)" checked />
            <NotificationToggle title="Overdue pickups / deliveries" checked />
            <NotificationToggle title="Chargeback watchdog" checked={false} />
            <Button type="button" variant="outline" size="sm" className="w-fit mt-2" disabled>
              Save routing rules
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="size-5" aria-hidden />
              Security placeholder
            </CardTitle>
            <CardDescription>Native Entra federation covers auth today.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-text-secondary">
            <p>Use Microsoft Entra External ID MFA + Conditional Access policies for owner seats.</p>
            <Button type="button" variant="outline" size="sm" disabled>
              Open session policy playbook
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border-primary lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="size-5" aria-hidden />
              Business preferences placeholder
            </CardTitle>
            <CardDescription>Locale defaults for quotes and invoices.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4 text-sm">
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Primary currency</Label>
              <p className="text-base font-medium">USD · placeholder</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-text-secondary">Tax mode</Label>
              <p className="text-base font-medium">Pass-through estimation</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminSectionShell>
  );
}

function NotificationToggle({
  title,
  checked,
}: {
  title: string;
  checked?: boolean;
}) {
  const id = encodeURIComponent(title);
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center justify-between rounded-lg border border-border-primary px-3 py-3"
    >
      <span className="mr-6 text-text-primary">{title}</span>
      <input defaultChecked={checked} type="checkbox" id={id} className="h-4 w-4 accent-neutral-950" disabled />
    </label>
  );
}
