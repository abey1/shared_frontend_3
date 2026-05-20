/** Set after MSAL LOGIN_SUCCESS; cleared once /users/me outcome is known. */
export const POST_LOGIN_ADMIN_LANDING_KEY = "rental-platform:openAdminAfterMe";

export function markOpenAdminAfterNextMe() {
  try {
    sessionStorage.setItem(POST_LOGIN_ADMIN_LANDING_KEY, "1");
  } catch {
    /* ignore */
  }
}

export function hasOpenAdminAfterNextMeIntent() {
  try {
    return sessionStorage.getItem(POST_LOGIN_ADMIN_LANDING_KEY) === "1";
  } catch {
    return false;
  }
}

export function clearOpenAdminAfterNextMe() {
  try {
    sessionStorage.removeItem(POST_LOGIN_ADMIN_LANDING_KEY);
  } catch {
    /* ignore */
  }
}
