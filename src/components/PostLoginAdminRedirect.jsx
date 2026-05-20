import { usePostLoginAdminRedirect } from "../hooks/usePostLoginAdminRedirect.js";

/** Runs at app shell (inside Router + AppRolesProvider); keeps admin redirect even if first route is not Home. */
export function PostLoginAdminRedirect() {
  usePostLoginAdminRedirect();
  return null;
}
