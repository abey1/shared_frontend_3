import { API_BASE_URL } from "./config";

/**
 * Absolute URL for a backend path. If `VITE_API_BASE_URL` is empty, uses same-origin paths only.
 */
export function apiUrl(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) return normalized;
  return `${API_BASE_URL}${normalized}`;
}

/**
 * `fetch` to your API with a stable base URL, optional JSON body, and optional Bearer token.
 *
 * @param {string} path - e.g. `/v1/items`
 * @param {RequestInit & {
 *   json?: unknown;
 *   accessToken?: string | null;
 *   getAccessToken?: () => Promise<string | null | undefined>;
 * }} [init]
 */
export async function apiFetch(path, init = {}) {
  const {
    json,
    accessToken,
    getAccessToken,
    headers: initHeaders,
    body,
    ...rest
  } = init;

  const headers = new Headers(initHeaders);

  let token = accessToken;
  if (getAccessToken && (token === undefined || token === null)) {
    token = await getAccessToken();
  }
  if (typeof token === "string" && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let resolvedBody = body;
  if (json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    resolvedBody = JSON.stringify(json);
  }

  return fetch(apiUrl(path), {
    ...rest,
    headers,
    body: resolvedBody,
  });
}

/**
 * Like `apiFetch`, but parses JSON and throws if the response is not OK.
 */
export async function apiJson(path, init = {}) {
  const res = await apiFetch(path, init);
  const text = await res.text();
  let data;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  } else {
    data = null;
  }
  if (!res.ok) {
    const err = new Error(`API ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}
