import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect, useMemo, useState } from "react";
import { graphPhotoRequest } from "../auth/msalConfig";

function getDisplayName(account) {
  if (!account) return "";
  const c = account.idTokenClaims ?? {};
  if (account.name) return account.name;
  if (c.name) return c.name;
  const given = c.given_name;
  const family = c.family_name;
  if (given || family) return [given, family].filter(Boolean).join(" ");
  if (c.preferred_username) return c.preferred_username;
  if (c.email) return c.email;
  if (c.emails?.[0]) return c.emails[0];
  if (account.username) return account.username;
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
 */
export function useAccountProfile() {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [photoUrl, setPhotoUrl] = useState(null);

  const account = useMemo(() => {
    return instance.getActiveAccount() ?? accounts[0] ?? null;
  }, [instance, accounts]);

  const displayName = useMemo(() => {
    const n = getDisplayName(account);
    return n || "Guest";
  }, [account]);

  const initials = useMemo(
    () => getInitials(displayName === "Guest" ? "" : displayName),
    [displayName],
  );

  useEffect(() => {
    if (!isAuthenticated || !account) {
      setPhotoUrl(null);
      return;
    }

    const claimPicture = account.idTokenClaims?.picture;
    if (typeof claimPicture === "string" && /^https?:\/\//i.test(claimPicture)) {
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
        const res = await fetch("https://graph.microsoft.com/v1.0/me/photo/$value", {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
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
  }, [isAuthenticated, account, instance]);

  return { account, displayName, initials, photoUrl, isAuthenticated };
}
