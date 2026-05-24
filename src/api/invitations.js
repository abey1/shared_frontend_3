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
 * Create invitation. Response includes **`emailSent`**: SMTP send completed (`true`),
 * or skipped/failed (`false`). See backend logs / App Service MAIL_* env if `false`.
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {{ businessId: string; email: string; role: string; expiresAt?: string }} body
 * @returns {Promise<object>}
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

/**
 * Public preview (no Bearer). Validates token + pending + not expired.
 * @param {string} invitationToken invitation_token GUID from email link
 */
export function previewInvitationByToken(invitationToken) {
  return apiJson(
    `/invitations/by-token/${encodeURIComponent(invitationToken)}/preview`,
  );
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function acceptInvitationByToken(getAccessToken, invitationToken) {
  return apiJson(
    `/invitations/by-token/${encodeURIComponent(invitationToken)}/accept`,
    { method: "POST", getAccessToken },
  );
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 */
export function declineInvitationByToken(getAccessToken, invitationToken) {
  return apiJson(
    `/invitations/by-token/${encodeURIComponent(invitationToken)}/decline`,
    { method: "POST", getAccessToken },
  );
}
