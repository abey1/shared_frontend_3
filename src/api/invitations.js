import { apiJson } from "./client";

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {Record<string, string | undefined>} [query]
 */
export function listInvitations(getAccessToken, query = {}) {
  const params = new URLSearchParams();
  if (query.businessId) params.set("businessId", query.businessId);
  if (query.status) params.set("status", query.status);
  if (query.email) params.set("email", query.email);
  const qs = params.toString();
  const path = qs ? `/invitations?${qs}` : "/invitations";
  return apiJson(path, { getAccessToken });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {{ businessId: string; email: string; role: string; expiresAt?: string }} body
 */
export function createInvitation(getAccessToken, body) {
  return apiJson("/invitations", {
    method: "POST",
    getAccessToken,
    json: body,
  });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} id
 * @param {{ status?: string; expiresAt?: string }} body
 */
export function patchInvitation(getAccessToken, id, body) {
  return apiJson(`/invitations/${id}`, {
    method: "PATCH",
    getAccessToken,
    json: body,
  });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} id
 */
export function deleteInvitation(getAccessToken, id) {
  return apiJson(`/invitations/${id}`, {
    method: "DELETE",
    getAccessToken,
  });
}
