import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  clearOpenAdminAfterNextMe,
  hasOpenAdminAfterNextMeIntent,
} from "../auth/postLoginAdminLanding.js";
import { useAppRoles } from "../context/AppRolesContext.jsx";

/**
 * Sends platform admins to `/dashboard` once `/users/me` is ready when a post-login intent
 * exists (see `main.jsx` + MSAL after `handleRedirectPromise`). Mounted from
 * `PostLoginAdminRedirect` in `App.jsx`.
 */
export function usePostLoginAdminRedirect() {
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const homeAccountId =
    instance.getActiveAccount()?.homeAccountId ??
    accounts[0]?.homeAccountId ??
    null;
  const { isPlatformAdmin, meStatus } = useAppRoles();

  useEffect(() => {
    if (!isAuthenticated || !homeAccountId) {
      return;
    }
    if (meStatus !== "ready" && meStatus !== "error") {
      return;
    }

    if (!hasOpenAdminAfterNextMeIntent()) {
      return;
    }

    if (meStatus === "error" || !isPlatformAdmin) {
      clearOpenAdminAfterNextMe();
      return;
    }

    navigate("/dashboard", { replace: true });
    setTimeout(() => clearOpenAdminAfterNextMe(), 0);
  }, [
    isAuthenticated,
    homeAccountId,
    meStatus,
    isPlatformAdmin,
    navigate,
  ]);
}
