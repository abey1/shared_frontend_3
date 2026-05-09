/**
 * Microsoft Entra External ID — public SPA settings only.
 * Never put a client secret in the frontend; secrets are for confidential server apps only.
 */

const clientId = import.meta.env.VITE_MSAL_CLIENT_ID ?? "";
const authority = import.meta.env.VITE_MSAL_AUTHORITY ?? "";

const redirectUri =
  import.meta.env.VITE_MSAL_REDIRECT_URI || window.location.origin;

const postLogoutRedirectUri =
  import.meta.env.VITE_MSAL_POST_LOGOUT_REDIRECT_URI ||
  window.location.origin;

function parseKnownAuthorities() {
  const raw = import.meta.env.VITE_MSAL_KNOWN_AUTHORITIES;
  if (raw) {
    const list = raw.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean);
    if (list.length) return list;
  }
  if (!authority) return undefined;
  try {
    const host = new URL(authority).hostname;
    if (host && host !== "login.microsoftonline.com") return [host];
  } catch {
    /* ignore */
  }
  return undefined;
}

export const msalConfig = {
  auth: {
    clientId,
    authority,
    redirectUri,
    postLogoutRedirectUri,
    navigateToLoginRequestUrl: true,
    knownAuthorities: parseKnownAuthorities(),
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const extraScopes =
  import.meta.env.VITE_MSAL_SCOPES?.split(/[,;\s]+/).map((s) => s.trim()).filter(Boolean) ??
  [];

/** Base delegated scopes for OIDC + optional API scopes (e.g. api://.../access_as_user). */
export const loginRequest = {
  scopes: [...new Set(["openid", "profile", "offline_access", ...extraScopes])],
};

/** Use when your External ID tenant has a dedicated sign-up user flow authority. */
export function getSignUpLoginRequest() {
  const signupAuthority = import.meta.env.VITE_MSAL_SIGNUP_AUTHORITY?.trim();
  if (signupAuthority) {
    return { ...loginRequest, authority: signupAuthority };
  }
  return {
    ...loginRequest,
    extraQueryParameters: { prompt: "create" },
  };
}

/** Optional: fetch profile photo via Microsoft Graph (grant `User.Read` on the app registration). */
export const graphPhotoRequest = {
  scopes: ["User.Read"],
};

export const logoutRequest = {
  postLogoutRedirectUri,
};
