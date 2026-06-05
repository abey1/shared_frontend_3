import { useMsal } from "@azure/msal-react";
import { useCallback } from "react";
import { acquireApiAccessToken } from "../api/acquireApiAccessToken";

/**
 * Stable callback for `@tanstack/react-query` callers that need `/users/me`-style Bearer tokens.
 */
export function useGetAccessToken() {
  const { instance, accounts } = useMsal();

  const account = instance.getActiveAccount() ?? accounts[0] ?? null;
  const accountKey =
    account?.homeAccountId ?? account?.localAccountId ?? "__none__";

  return useCallback(
    () =>
      acquireApiAccessToken(instance, instance.getActiveAccount() ?? accounts[0] ?? null),
    [instance, accountKey],
  );
}
