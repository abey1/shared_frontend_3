import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useMemo, useRef } from "react";
import { acquireApiAccessToken } from "../api/acquireApiAccessToken";
import { fetchCurrentUser } from "../api/usersMe";
import { apiAccessTokenRequest } from "../auth/msalConfig";

/**
 * After Entra login, calls `GET /users/me` with an API access token so the Nest API
 * can upsert `dbo.users` / `dbo.user_identities`.
 */
export function useBackendUserSync() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const warnedNoScopes = useRef(false);

  const account = useMemo(
    () => instance.getActiveAccount() ?? accounts[0] ?? null,
    [instance, accounts],
  );

  useEffect(() => {
    if (!isAuthenticated || !account) return;
    if (!apiAccessTokenRequest.scopes.length) {
      if (import.meta.env.DEV && !warnedNoScopes.current) {
        warnedNoScopes.current = true;
        console.warn(
          "[useBackendUserSync] Set VITE_MSAL_SCOPES to include an `api://...` scope so the SPA can call the backend.",
        );
      }
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        await fetchCurrentUser(() => acquireApiAccessToken(instance, account));
      } catch (err) {
        if (!cancelled && import.meta.env.DEV) {
          console.warn("[useBackendUserSync] /users/me failed:", err);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, account?.homeAccountId, instance, account]);
}
