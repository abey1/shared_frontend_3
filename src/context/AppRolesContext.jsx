import { useIsAuthenticated } from "@azure/msal-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clearOpenAdminAfterNextMe } from "../auth/postLoginAdminLanding.js";

const PLATFORM_ADMIN = "platform_admin";

const initialState = {
  me: null,
  appRoles: [],
  /** 'idle' | 'loading' | 'ready' | 'error' — alignment with last /users/me for active MSAL account */
  meStatus: "idle",
  /** MSAL homeAccountId the stored `me` / `appRoles` belong to */
  sessionHomeAccountId: null,
};

const AppRolesContext = createContext(null);

export function AppRolesProvider({ children }) {
  const isAuthenticated = useIsAuthenticated();
  const [state, setState] = useState(initialState);

  const resetSession = useCallback(() => {
    setState(initialState);
  }, []);

  const beginMeFetch = useCallback((homeAccountId) => {
    setState((prev) => ({
      ...initialState,
      meStatus: "loading",
      sessionHomeAccountId: homeAccountId ?? prev.sessionHomeAccountId,
    }));
  }, []);

  const completeMeFetch = useCallback((meJson, homeAccountId) => {
    const appRoles = Array.isArray(meJson?.appRoles) ? meJson.appRoles : [];
    setState({
      me: meJson,
      appRoles,
      meStatus: "ready",
      sessionHomeAccountId: homeAccountId ?? null,
    });
  }, []);

  const failMeFetch = useCallback(() => {
    setState((prev) => ({
      ...initialState,
      meStatus: "error",
      sessionHomeAccountId: prev.sessionHomeAccountId,
    }));
  }, []);

  /**
   * Only clear the post-login admin landing flag when the user **actually logs out**
   * (was authenticated, now not). Clearing whenever `isAuthenticated` is false also
   * runs on early renders and wipes the flag set in `main.jsx` after `handleRedirectPromise`.
   */
  const wasAuthenticatedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated) {
      wasAuthenticatedRef.current = true;
      return;
    }

    resetSession();
    if (wasAuthenticatedRef.current) {
      clearOpenAdminAfterNextMe();
    }
    wasAuthenticatedRef.current = false;
  }, [isAuthenticated, resetSession]);

  const value = useMemo(
    () => ({
      ...state,
      isPlatformAdmin: state.appRoles.includes(PLATFORM_ADMIN),
      resetSession,
      beginMeFetch,
      completeMeFetch,
      failMeFetch,
    }),
    [state, resetSession, beginMeFetch, completeMeFetch, failMeFetch],
  );

  return (
    <AppRolesContext.Provider value={value}>{children}</AppRolesContext.Provider>
  );
}

export function useAppRoles() {
  const ctx = useContext(AppRolesContext);
  if (!ctx) {
    throw new Error("useAppRoles must be used within AppRolesProvider");
  }
  return ctx;
}

export { PLATFORM_ADMIN };
