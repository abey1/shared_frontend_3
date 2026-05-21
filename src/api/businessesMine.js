import { apiJson } from "./client";

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function fetchMyBusinesses(getAccessToken) {
  return apiJson("/businesses/mine", { getAccessToken });
}

/**
 * Picker/catalog list: **`platform_admin`** gets every business sorted A–Z by display/legal name;
 * others get only businesses they belong to (same membership set as `/businesses/mine`), sorted.
 *
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function fetchBusinessCatalog(getAccessToken) {
  return apiJson("/businesses/catalog", { getAccessToken });
}
