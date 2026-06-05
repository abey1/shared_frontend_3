import { apiJson } from "./client";

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function fetchMyBusinesses(getAccessToken) {
  return apiJson("/businesses/mine", { getAccessToken });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} id
 */
export function fetchBusinessById(getAccessToken, id) {
  return apiJson(`/businesses/${encodeURIComponent(id)}`, { getAccessToken });
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

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} id
 * @param {Record<string, unknown>} body
 */
export function patchBusiness(getAccessToken, id, body) {
  const path = `/businesses/${encodeURIComponent(id)}`;
  return apiJson(path, { method: "PATCH", getAccessToken, json: body });
}
