import { apiJson } from "./client";

/**
 * Loads the current user from the API and triggers `UsersService.ensureFromJwt` on the server.
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function fetchCurrentUser(getAccessToken) {
  return apiJson("/users/me", { getAccessToken });
}
