import { useBackendUserSync } from "../hooks/useBackendUserSync";

/** Runs user upsert against the Nest API when MSAL has an active session. Renders nothing. */
export function BackendUserSync() {
  useBackendUserSync();
  return null;
}
