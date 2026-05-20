import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useMemo, useRef } from "react";
import { acquireApiAccessToken } from "../api/acquireApiAccessToken";
import { fetchCurrentUser } from "../api/usersMe";
import { apiAccessTokenRequest } from "../auth/msalConfig";
import { useAppRoles } from "../context/AppRolesContext.jsx";

/**
 * After Entra login, calls `GET /users/me` with an API access token so the Nest API
 * can upsert `dbo.users` / `dbo.user_identities`.
 */
export function useBackendUserSync() {
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const { beginMeFetch, completeMeFetch, failMeFetch } = useAppRoles();
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
      completeMeFetch({ appRoles: [] }, account.homeAccountId);
      return;
    }

    const expectedHomeAccountId = account.homeAccountId;
    beginMeFetch(expectedHomeAccountId);
    let cancelled = false;

    (async () => {
      try {
        const data = await fetchCurrentUser(() =>
          acquireApiAccessToken(instance, account),
        );
        if (cancelled) return;
        const active = instance.getActiveAccount();
        if (active?.homeAccountId !== expectedHomeAccountId) return;
        completeMeFetch(data, expectedHomeAccountId);
      } catch (err) {
        if (!cancelled && import.meta.env.DEV) {
          console.warn("[useBackendUserSync] /users/me failed:", err);
        }
        if (!cancelled) failMeFetch();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    isAuthenticated,
    account?.homeAccountId,
    instance,
    account,
    beginMeFetch,
    completeMeFetch,
    failMeFetch,
  ]);
}
