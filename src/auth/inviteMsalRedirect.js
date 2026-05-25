/** Session markers so MSAL redirect login returns to `/invite/:token` and skips admin landing. */

export const INVITE_RETURN_PATH_KEY = "rental-platform:msalInviteReturnPath";
export const INVITE_LOGIN_FLOW_KEY = "rental-platform:msalInviteLoginFlow";

/** Call immediately before `loginRedirect` from the invitation page only. */
export function stashInvitePathForRedirect() {
  try {
    const path = `${window.location.pathname}${window.location.search}`;
    sessionStorage.setItem(INVITE_RETURN_PATH_KEY, path);
    sessionStorage.setItem(INVITE_LOGIN_FLOW_KEY, "1");
  } catch {
    /* ignore */
  }
}

/** Active while user is completing Entra redirect for an invite-only login. */
export function isInviteMsalLoginFlow() {
  try {
    return sessionStorage.getItem(INVITE_LOGIN_FLOW_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * After `handleRedirectPromise`, if invite flow: clear keys and return path to restore.
 * Path is constrained to `/invite/…` for safety.
 */
export function consumeInviteRedirectIfAny() {
  try {
    const flow = sessionStorage.getItem(INVITE_LOGIN_FLOW_KEY);
    const path = sessionStorage.getItem(INVITE_RETURN_PATH_KEY);
    if (flow === "1" && path?.startsWith("/invite/")) {
      sessionStorage.removeItem(INVITE_LOGIN_FLOW_KEY);
      sessionStorage.removeItem(INVITE_RETURN_PATH_KEY);
      return path;
    }
  } catch {
    /* ignore */
  }
  return null;
}
