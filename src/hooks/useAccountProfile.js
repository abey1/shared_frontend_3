import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useMemo, useState } from "react";
import {
  graphPhotoRequest,
  silentIdTokenRequest,
} from "../auth/msalConfig";

/** Email-style values often appear under different keys in Entra External ID / CIAM tokens. */
function emailFromClaims(c) {
  if (!c || typeof c !== "object") return null;
  if (typeof c.email === "string" && c.email.trim()) return c.email.trim();
  if (Array.isArray(c.emails) && typeof c.emails[0] === "string") {
    return c.emails[0].trim() || null;
  }
  if (
    typeof c.preferred_username === "string" &&
    c.preferred_username.includes("@")
  ) {
    return c.preferred_username.trim();
  }
  for (const key of Object.keys(c)) {
    const lower = key.toLowerCase();
    if (
      lower.endsWith("emailaddress") ||
      lower.includes("identity/claims/emailaddress")
    ) {
      const v = c[key];
      if (typeof v === "string" && v.trim()) return v.trim();
      if (Array.isArray(v) && typeof v[0] === "string" && v[0].trim()) {
        return v[0].trim();
      }
    }
  }
  return null;
}

function getDisplayName(account, claims) {
  if (!account) return "";
  const c =
    claims && typeof claims === "object"
      ? claims
      : account.idTokenClaims ?? {};
  if (account.name?.trim()) return account.name.trim();
  if (typeof c.name === "string" && c.name.trim()) return c.name.trim();
  const given = c.given_name;
  const family = c.family_name;
  if (given || family) return [given, family].filter(Boolean).join(" ").trim();
  if (typeof c.nickname === "string" && c.nickname.trim()) {
    return c.nickname.trim();
  }
  const mail = emailFromClaims(c);
  if (mail) return mail;
  if (
    typeof c.preferred_username === "string" &&
    c.preferred_username.trim()
  ) {
    return c.preferred_username.trim();
  }
  if (typeof c.unique_name === "string" && c.unique_name.trim()) {
    return c.unique_name.trim();
  }
  if (typeof c.upn === "string" && c.upn.trim()) return c.upn.trim();
  if (account.username?.trim()) return account.username.trim();
  return "";
}

function getInitials(displayName) {
  const t = displayName.trim();
  if (!t) return "?";
  const parts = t.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  if (parts[0].length >= 2) return parts[0].slice(0, 2).toUpperCase();
  return parts[0][0].toUpperCase();
}

/**
 * Active MSAL account display info; photo from `picture` claim URL or Microsoft Graph (silent `User.Read`).
 *
 * CIAM / External ID: `AccountInfo.idTokenClaims` from cache is often sparse. We merge claims from
 * `acquireTokenSilent` (openid/profile) so name/email appear when the user flow emits them.
 */
export function useAccountProfile() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [photoUrl, setPhotoUrl] = useState(null);
  const [freshIdTokenClaims, setFreshIdTokenClaims] = useState(null);

  const account = useMemo(() => {
    return instance.getActiveAccount() ?? accounts[0] ?? null;
  }, [instance, accounts]);

  const mergedClaims = useMemo(() => {
    return {
      ...(account?.idTokenClaims ?? {}),
      ...(freshIdTokenClaims ?? {}),
    };
  }, [account?.idTokenClaims, freshIdTokenClaims]);

  useEffect(() => {
    if (!isAuthenticated || !account?.homeAccountId) {
      setFreshIdTokenClaims(null);
      return;
    }

    const expectedHomeAccountId = account.homeAccountId;
    setFreshIdTokenClaims(null);

    let cancelled = false;

    instance
      .acquireTokenSilent({
        ...silentIdTokenRequest,
        account,
      })
      .then((result) => {
        if (cancelled) return;
        if (result.account?.homeAccountId !== expectedHomeAccountId) return;
        if (!result.idTokenClaims || typeof result.idTokenClaims !== "object") {
          return;
        }
        setFreshIdTokenClaims(result.idTokenClaims);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, account?.homeAccountId, instance, account]);

  const displayName = useMemo(() => {
    if (!account) return "Guest";
    return getDisplayName(account, mergedClaims) || "User";
  }, [account, mergedClaims]);

  const rawForInitials = useMemo(() => {
    if (!account) return "";
    return getDisplayName(account, mergedClaims) || "User";
  }, [account, mergedClaims]);

  const initials = useMemo(() => getInitials(rawForInitials), [rawForInitials]);

  useEffect(() => {
    if (!isAuthenticated || !account) {
      setPhotoUrl(null);
      return;
    }

    const claimPicture = mergedClaims?.picture;
    if (
      typeof claimPicture === "string" &&
      /^https?:\/\//i.test(claimPicture)
    ) {
      setPhotoUrl(claimPicture);
      return;
    }

    setPhotoUrl(null);

    let cancelled = false;
    let objectUrl = null;

    (async () => {
      try {
        const result = await instance.acquireTokenSilent({
          ...graphPhotoRequest,
          account,
        });
        const res = await fetch(
          "https://graph.microsoft.com/v1.0/me/photo/$value",
          {
            headers: { Authorization: `Bearer ${result.accessToken}` },
          },
        );
        if (!res.ok) return;
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        if (!cancelled) setPhotoUrl(objectUrl);
      } catch (e) {
        if (e instanceof InteractionRequiredAuthError) return;
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [isAuthenticated, account, instance, mergedClaims?.picture]);

  return {
    account,
    /** Raw claim map (cache + last silent ID token), for debugging or custom UI. */
    idTokenClaims: mergedClaims,
    displayName,
    initials,
    photoUrl,
    isAuthenticated,
  };
}
