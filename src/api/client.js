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

  const methodUpper = String(init.method ?? "GET").toUpperCase();
  const isBodylessMethod = methodUpper === "GET" || methodUpper === "HEAD";

  let token = accessToken;
  if (getAccessToken && (token === undefined || token === null)) {
    token = await getAccessToken();
  }
  if (typeof token === "string" && token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let resolvedBody = body;
  if (!isBodylessMethod && json !== undefined) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    resolvedBody = JSON.stringify(json);
  }

  /** GET/HEAD must not include a body (RFC 9110); gateways often reply 400 otherwise. */
  const includeBody =
    !isBodylessMethod &&
    resolvedBody !== undefined &&
    resolvedBody !== null;

  /** @type {RequestInit} */
  const fetchOptions = {
    ...rest,
    headers,
    ...(includeBody ? { body: resolvedBody } : {}),
  };

  return fetch(apiUrl(path), fetchOptions);
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

/**
 * Parses nested Nest `AllExceptionsFilter` bodies: `{ message: string | { message?, ...extras } }`.
 * Returns human text plus optional extras from structured HttpException payloads.
 *
 * @param {unknown} data Response body parsed from `apiFetch` / `apiJson`
 * @returns {{ text: string, inviteeEmail?: string, tokenMailboxes?: string[], tokenMailboxesMasked?: string[] }}
 */
export function unwrapApiErrorPayload(data) {
  const blob = data?.message;
  if (typeof blob === 'string') {
    return { text: blob };
  }
  if (blob !== null && typeof blob === "object") {
    const nested = /** @type {Record<string, unknown>} */ (blob);
    const text =
      typeof nested.message === "string"
        ? nested.message
        : typeof nested.error === "string"
          ? nested.error
          : "Request failed.";

    const inviteeEmail = nested.inviteeEmail;
    let tokenMailboxes;
    const rawBoxes = nested.tokenMailboxes;
    if (Array.isArray(rawBoxes)) {
      const m = rawBoxes.filter((x) => typeof x === "string");
      if (m.length) tokenMailboxes = m;
    }
    let tokenMailboxesMasked;
    const rawMasked = nested.tokenMailboxesMasked;
    if (Array.isArray(rawMasked)) {
      const m = rawMasked.filter((x) => typeof x === "string");
      if (m.length) tokenMailboxesMasked = m;
    }

    return {
      text,
      ...(typeof inviteeEmail === "string" ? { inviteeEmail } : {}),
      ...(tokenMailboxes ? { tokenMailboxes } : {}),
      ...(tokenMailboxesMasked ? { tokenMailboxesMasked } : {}),
    };
  }
  return { text: "Request failed." };
}
