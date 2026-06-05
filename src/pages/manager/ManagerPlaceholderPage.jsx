import AdminSectionShell from "../admin/AdminSectionShell.jsx";

const SEGMENTS = {
  categories: {
    title: "Categories",
    subtitle: "Curate equipment groupings and catalog metadata.",
  },
  "tool-requests": {
    title: "Tool Requests",
    subtitle: "Review incoming field requests and approvals.",
  },
  assignments: {
    title: "Assignments",
    subtitle: "Track who is responsible for each asset or job.",
  },
  employees: {
    title: "Employees",
    subtitle: "Directory and permissions for your operating team.",
  },
  "activity-logs": {
    title: "Activity Logs",
    subtitle: "Immutable trail of significant manager actions.",
  },
  reports: {
    title: "Reports",
    subtitle: "Scheduled and ad-hoc operational reporting.",
  },
  notifications: {
    title: "Notifications",
    subtitle: "Channel preferences and delivery health.",
  },
  messages: {
    title: "Messages",
    subtitle: "Internal messaging between managers and crews.",
  },
  settings: {
    title: "Settings",
    subtitle: "Workspace preferences and integrations.",
  },
};

/**
 * @param {{ segment: keyof typeof SEGMENTS }} props
 */
export default function ManagerPlaceholderPage({ segment }) {
  const cfg = SEGMENTS[segment] ?? {
    title: "Section",
    subtitle: "This area will connect to backend services next.",
  };
  return (
    <AdminSectionShell title={cfg.title} subtitle={cfg.subtitle} />
  );
}
