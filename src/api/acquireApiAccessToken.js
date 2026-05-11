import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { apiAccessTokenRequest } from "../auth/msalConfig";

/**
 * Returns an access token for your backend (`api://...` scopes in `VITE_MSAL_SCOPES` only).
 * OIDC and Microsoft Graph scopes must be acquired in separate MSAL calls.
 */
export async function acquireApiAccessToken(msalInstance, account) {
  if (!account) return null;
  if (!apiAccessTokenRequest.scopes.length) return null;
  try {
    const result = await msalInstance.acquireTokenSilent({
      scopes: apiAccessTokenRequest.scopes,
      account,
    });
    return result.accessToken;
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      const result = await msalInstance.acquireTokenPopup({
        scopes: apiAccessTokenRequest.scopes,
        account,
      });
      return result.accessToken;
    }
    throw err;
  }
}
