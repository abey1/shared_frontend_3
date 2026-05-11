/**
 * Backend base URL for API calls (no trailing slash).
 * Vite injects only variables prefixed with `VITE_` into the client bundle.
 * - Relative paths (e.g. `/api` with Vite proxy) are kept as-is.
 * - Bare hostnames get `https://` prepended.
 */
function normalizeApiBase(raw) {
  const u = (raw ?? "").trim().replace(/\/$/, "");
  if (!u) return "";
  if (u.startsWith("/")) return u;
  if (/^https?:\/\//i.test(u)) return u;
  return `https://${u}`;
}

export const API_BASE_URL = normalizeApiBase(
  import.meta.env.VITE_API_BASE_URL ?? "",
);
