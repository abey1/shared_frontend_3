import { apiJson } from "./client.js";

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} businessId
 */
export function fetchManagerToolsSummary(getAccessToken, businessId) {
  const q = new URLSearchParams({ businessId });
  return apiJson(`/manager-tools/dashboard/summary?${q}`, { getAccessToken });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} businessId
 * @param {{ q?: string; status?: string }} [filters]
 */
export function fetchManagerTools(getAccessToken, businessId, filters = {}) {
  const q = new URLSearchParams({ businessId });
  if (filters.q?.trim()) q.set("q", filters.q.trim());
  if (filters.status?.trim()) q.set("status", filters.status.trim());
  return apiJson(`/manager-tools?${q}`, { getAccessToken });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {Record<string, unknown>} body
 */
export function createManagerTool(getAccessToken, body) {
  return apiJson("/manager-tools", {
    method: "POST",
    getAccessToken,
    json: body,
  });
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} businessId
 * @param {string} id
 * @param {Record<string, unknown>} body
 */
export function updateManagerTool(getAccessToken, businessId, id, body) {
  const q = new URLSearchParams({ businessId });
  return apiJson(
    `/manager-tools/${encodeURIComponent(id)}?${q}`,
    {
      method: "PATCH",
      getAccessToken,
      json: body,
    },
  );
}

/**
 * @param {() => Promise<string | null | undefined>} getAccessToken
 * @param {string} businessId
 * @param {string} id
 */
export function deleteManagerTool(getAccessToken, businessId, id) {
  const q = new URLSearchParams({ businessId });
  return apiJson(
    `/manager-tools/${encodeURIComponent(id)}?${q}`,
    {
      method: "DELETE",
      getAccessToken,
    },
  );
}
