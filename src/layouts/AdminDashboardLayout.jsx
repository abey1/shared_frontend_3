import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  LayoutDashboard,
  MailPlus,
  Menu,
  PanelLeftClose,
  Store,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  NavLink,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { logoutRequest } from "../auth/msalConfig";
import { useAppRoles } from "../context/AppRolesContext.jsx";
import { cn } from "../lib/cn.js";
import { Button } from "../components/ui/button.jsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/businesses", label: "Businesses", icon: Store },
  { to: "/users", label: "Users", icon: Users },
  { to: "/active-rentals", label: "Active Rentals", icon: CalendarClock },
  {
    to: "/revenue-overview",
    label: "Revenue Overview",
    icon: DollarSign,
  },
  { to: "/invitations", label: "Invitations", icon: MailPlus },
];

/** Human-readable breadcrumb derived from pathname (matches Outlet page titles). */
const HEADER_TITLE = {
  "/dashboard": "Dashboard",
  "/businesses": "Businesses",
  "/users": "Users",
  "/active-rentals": "Active Rentals",
  "/revenue-overview": "Revenue Overview",
  "/invitations": "Invitations",
};

export default function AdminDashboardLayout() {
  const isAuthenticated = useIsAuthenticated();
  const { isPlatformAdmin, meStatus, resetSession } = useAppRoles();
  const location = useLocation();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  const headerTitle =
    HEADER_TITLE[location.pathname] ?? "Dashboard";

  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  const signOut = useCallback(() => {
    resetSession();
    instance.logoutRedirect({
      ...logoutRequest,
      account: account ?? undefined,
    });
  }, [account, instance, resetSession]);

  const SidebarNav = ({ onNavigate } = {}) => (
    <>
      <div
        className={cn(
          "flex shrink-0 items-center border-b border-border-primary px-2 py-3",
          sidebarCollapsed ? "justify-center px-2" : "justify-between gap-2",
        )}
      >
        {!sidebarCollapsed && (
          <span className="truncate pl-2 text-base font-semibold tracking-tight text-text-primary">
            Admin Page
          </span>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(sidebarCollapsed && "mx-auto shrink-0")}
          title={
            sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
          }
          aria-expanded={!sidebarCollapsed}
          onClick={() => setSidebarCollapsed((c) => !c)}
        >
          <PanelLeftClose
            className={cn(
              "size-[1.125rem] text-text-secondary transition-transform duration-300",
              sidebarCollapsed && "rotate-180",
            )}
            aria-hidden
          />
          {sidebarCollapsed && (
            <span className="sr-only">Expand sidebar</span>
          )}
        </Button>
      </div>

      <nav
        className="flex flex-1 flex-col gap-1 overflow-y-auto p-2 pb-24"
        aria-label="Admin"
      >
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/dashboard"}
            title={sidebarCollapsed ? label : undefined}
            onClick={() => onNavigate?.()}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                sidebarCollapsed && "justify-center px-2",
                isActive
                  ? "bg-neutral-100 text-text-primary dark:bg-neutral-800"
                  : "text-text-secondary hover:bg-neutral-50 hover:text-text-primary dark:hover:bg-neutral-900",
              )
            }
          >
            <Icon className="size-[1.125rem] shrink-0" aria-hidden />
            {!sidebarCollapsed && (
              <span className="truncate">{label}</span>
            )}
            {sidebarCollapsed && (
              <span className="sr-only">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );

  const sidebarWidthClass = sidebarCollapsed
    ? "md:w-[4.25rem]"
    : "md:w-64";

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (meStatus === "loading" || meStatus === "idle") {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background-primary">
        <div className="flex flex-col items-center gap-3 text-center">
          <div
            className="size-10 animate-spin rounded-full border-2 border-border-primary border-t-neutral-900 dark:border-t-white"
            aria-hidden
          />
          <p className="text-sm text-text-secondary">Loading workspace…</p>
        </div>
      </div>
    );
  }

  if (meStatus === "error" || !isPlatformAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-svh w-full bg-background-primary text-text-primary">
      {/* Mobile drawer backdrop */}
      {mobileDrawerOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] transition-opacity md:hidden"
          aria-label="Close menu"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      {/* Sidebar: drawer on mobile, column on desktop */}
      <aside
        id="admin-sidebar-nav"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden border-border-primary bg-neutral-950/[0.02] backdrop-blur-sm transition-all duration-300 ease-in-out dark:bg-neutral-950/40 md:sticky md:top-0 md:z-30 md:h-svh md:shrink-0 md:border-r",
          sidebarWidthClass,
          "border-r md:translate-x-0",
          "w-[min(18rem,85vw)] max-w-none md:max-w-none",
          mobileDrawerOpen
            ? "translate-x-0 shadow-xl"
            : "-translate-x-full md:translate-x-0 md:shadow-none",
        )}
      >
        <SidebarNav onNavigate={() => setMobileDrawerOpen(false)} />
      </aside>

      <div className="flex min-h-svh min-w-0 flex-1 flex-col">
        {/* Top header */}
        <header className="sticky top-0 z-20 flex min-h-[3.75rem] items-center justify-between gap-4 border-b border-border-primary bg-background-primary/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background-primary/75 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileDrawerOpen((o) => !o)}
              aria-expanded={mobileDrawerOpen}
              aria-controls="admin-sidebar-nav"
              title="Open navigation"
            >
              <Menu className="size-5" aria-hidden />
            </Button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="hidden shrink-0 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary md:flex md:items-center md:gap-1"
              title="Back to site home"
            >
              <ChevronLeft className="size-4" aria-hidden />
              Site
            </button>
            <div className="min-w-0 border-l border-border-primary pl-3 md:ml-2">
              <p className="truncate text-[0.6875rem] font-medium uppercase tracking-wider text-text-secondary">
                Admin
              </p>
              <h2 className="truncate text-lg font-semibold md:text-xl">
                {headerTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => navigate("/")}
            >
              View site
              <ChevronRight className="size-4 opacity-70" aria-hidden />
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={signOut}>
              Sign out
            </Button>
          </div>
        </header>

        {/* Routed main content */}
        <main className="flex flex-1 flex-col overflow-auto bg-neutral-950/[0.015] dark:bg-neutral-950/20">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
