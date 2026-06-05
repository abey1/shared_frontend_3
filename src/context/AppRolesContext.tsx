import { useIsAuthenticated } from "@azure/msal-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { clearOpenAdminAfterNextMe } from "../auth/postLoginAdminLanding.js";

export const PLATFORM_ADMIN = "platform_admin";
export const BUSINESS_OWNER = "business_owner";
export const BUSINESS_MANAGER = "business_manager";

type MeStatus = "idle" | "loading" | "ready" | "error";

export type AppRolesState = {
  me: Record<string, unknown> | null;
  appRoles: string[];
  meStatus: MeStatus;
  sessionHomeAccountId: string | null;
};

type AppRolesContextValue = AppRolesState & {
  isPlatformAdmin: boolean;
  isBusinessOwner: boolean;
  isBusinessManager: boolean;
  resetSession: () => void;
  beginMeFetch: (homeAccountId?: string | null) => void;
  completeMeFetch: (meJson: unknown, homeAccountId?: string | null) => void;
  failMeFetch: () => void;
};

const initialState: AppRolesState = {
  me: null,
  appRoles: [],
  meStatus: "idle",
  sessionHomeAccountId: null,
};

const AppRolesContext = createContext<AppRolesContextValue | null>(null);

export function AppRolesProvider({ children }: { children: ReactNode }) {
  const isAuthenticated = useIsAuthenticated();
  const [state, setState] = useState<AppRolesState>(initialState);

  const resetSession = useCallback(() => {
    setState(initialState);
  }, []);

  const beginMeFetch = useCallback((homeAccountId?: string | null) => {
    setState((prev) => ({
      ...initialState,
      meStatus: "loading",
      sessionHomeAccountId: homeAccountId ?? prev.sessionHomeAccountId,
    }));
  }, []);

  const completeMeFetch = useCallback(
    (meJson: unknown, homeAccountId?: string | null) => {
      const record =
        meJson !== null && typeof meJson === "object"
          ? (meJson as Record<string, unknown>)
          : null;
      const roles = record?.["appRoles"];
      const appRoles = Array.isArray(roles)
        ? (roles as string[])
        : [];
      setState({
        me: record,
        appRoles,
        meStatus: "ready",
        sessionHomeAccountId: homeAccountId ?? null,
      });
    },
    [],
  );

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

  const value = useMemo<AppRolesContextValue>(
    () => ({
      ...state,
      isPlatformAdmin: state.appRoles.includes(PLATFORM_ADMIN),
      isBusinessOwner: state.appRoles.includes(BUSINESS_OWNER),
      isBusinessManager: state.appRoles.includes(BUSINESS_MANAGER),
      resetSession,
      beginMeFetch,
      completeMeFetch,
      failMeFetch,
    }),
    [
      beginMeFetch,
      completeMeFetch,
      failMeFetch,
      resetSession,
      state,
    ],
  );

  return (
    <AppRolesContext.Provider value={value}>
      {children}
    </AppRolesContext.Provider>
  );
}

export function useAppRoles(): AppRolesContextValue {
  const ctx = useContext(AppRolesContext);
  if (!ctx) {
    throw new Error("useAppRoles must be used within AppRolesProvider");
  }
  return ctx;
}
