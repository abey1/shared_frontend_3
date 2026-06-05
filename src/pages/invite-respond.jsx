import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { unwrapApiErrorPayload } from "../api/client.js";
import { acquireApiAccessToken } from "../api/acquireApiAccessToken.js";
import {
  acceptInvitationByToken,
  declineInvitationByToken,
  previewInvitationByToken,
} from "../api/invitations.js";
import { loginRequest } from "../auth/msalConfig.js";
import { stashInvitePathForRedirect } from "../auth/inviteMsalRedirect.js";
import { Button } from "../components/ui/button";

function formatExpiry(iso) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso ?? "—";
  }
}

/** Magic-link invitation: preview without auth; accept/decline require MSAL + matching mailbox claim. */
export default function InviteRespondPage() {
  const { token: invitationToken } = useParams();
  const navigate = useNavigate();
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const account = instance.getActiveAccount() ?? accounts[0] ?? null;

  const getAccessToken = useCallback(
    () => acquireApiAccessToken(instance, account),
    [instance, account],
  );

  const [preview, setPreview] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (!invitationToken?.trim()) {
      setPreviewError({ message: "Missing invitation token in URL." });
      return;
    }
    let cancelled = false;
    (async () => {
      setPreviewError(null);
      setPreview(null);
      try {
        console.log(
          "[invite-debug] useEffect → GET preview (public)",
          `/invitations/by-token/.../preview`,
        );
        const data = await previewInvitationByToken(invitationToken);
        if (!cancelled) {
          console.log("[invite-debug] preview OK:", data);
          setPreview(data);
        }
      } catch (e) {
        if (cancelled) return;
        console.warn("[invite-debug] preview failed:", e?.status, e?.data ?? e?.message);
        const { text } = unwrapApiErrorPayload(e?.data ?? {});
        const msg =
          text && text !== "Request failed."
            ? text
            : e?.message ??
              (typeof e?.data === "string" ? e.data : null) ??
              "Could not load this invitation.";
        setPreviewError({ status: e?.status, message: msg });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [invitationToken]);

  async function handleAccept() {
    if (!invitationToken) return;
    setBusy(true);
    setNotice(null);
    try {
      console.log("[invite-debug] handleAccept → POST /invitations/by-token/.../accept");
      const acceptRes = await acceptInvitationByToken(
        getAccessToken,
        invitationToken,
      );
      console.log("[invite-debug] accept response:", acceptRes);
      navigate("/rental-account-dashboard", { replace: true });
    } catch (e) {
      console.warn("[invite-debug] accept error:", e?.status, e?.data ?? e?.message);
      const parsed = unwrapApiErrorPayload(e?.data ?? {});
      const text =
        parsed.text && parsed.text !== "Request failed."
          ? parsed.text
          : e?.message ?? "Could not accept invitation.";
      setNotice({
        text,
        ...(parsed.inviteeEmail ? { inviteeEmail: parsed.inviteeEmail } : {}),
        ...(parsed.tokenMailboxes?.length ? { tokenMailboxes: parsed.tokenMailboxes } : {}),
        ...(parsed.tokenMailboxesMasked?.length
          ? { tokenMailboxesMasked: parsed.tokenMailboxesMasked }
          : {}),
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleDecline() {
    if (!invitationToken) return;
    if (!window.confirm("Decline this invitation? You can be invited again later.")) {
      return;
    }
    setBusy(true);
    setNotice(null);
    try {
      console.log("[invite-debug] handleDecline → POST /invitations/by-token/.../decline");
      const declineRes = await declineInvitationByToken(
        getAccessToken,
        invitationToken,
      );
      console.log("[invite-debug] decline response:", declineRes);
      navigate("/", { replace: true });
    } catch (e) {
      console.warn("[invite-debug] decline error:", e?.status, e?.data ?? e?.message);
      const parsed = unwrapApiErrorPayload(e?.data ?? {});
      const text =
        parsed.text && parsed.text !== "Request failed."
          ? parsed.text
          : e?.message ?? "Could not decline invitation.";
      setNotice({
        text,
        ...(parsed.inviteeEmail ? { inviteeEmail: parsed.inviteeEmail } : {}),
        ...(parsed.tokenMailboxes?.length ? { tokenMailboxes: parsed.tokenMailboxes } : {}),
        ...(parsed.tokenMailboxesMasked?.length
          ? { tokenMailboxesMasked: parsed.tokenMailboxesMasked }
          : {}),
      });
    } finally {
      setBusy(false);
    }
  }

  const signIn = async () => {
    setNotice(null);
    try {
      console.log("[invite-debug] signIn → MSAL loginRedirect (returns to /invite/... after auth)");
      stashInvitePathForRedirect();
      await instance.loginRedirect(loginRequest);
    } catch (e) {
      if (
        e?.errorCode === "user_cancelled" ||
        e?.errorCode === "user_cancelled_error"
      ) {
        return;
      }
      setNotice({ text: e?.message ?? "Sign-in failed." });
    }
  };

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col justify-center px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-text-primary">
        Business invitation
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Sign in with the invited email address, then choose to accept or
        decline.
      </p>

      {previewError ? (
        <p className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
          {previewError.message}
        </p>
      ) : !preview ? (
        <p className="mt-6 text-sm text-text-secondary">Loading…</p>
      ) : (
        <div className="mt-6 rounded-xl border border-border-primary bg-background-primary p-6 shadow-sm">
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="font-medium text-text-primary">Organization</dt>
              <dd className="text-text-secondary">{preview.businessName}</dd>
            </div>
            <div>
              <dt className="font-medium text-text-primary">Role</dt>
              <dd className="capitalize text-text-secondary">{preview.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-text-primary">Expires</dt>
              <dd className="text-text-secondary">
                {formatExpiry(preview.expiresAt)}
              </dd>
            </div>
          </dl>

          {!isAuthenticated ? (
            <div className="mt-6">
              <Button type="button" onClick={() => void signIn()}>
                Sign in to respond
              </Button>
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="button" disabled={busy} onClick={() => handleAccept()}>
                {busy ? "Working…" : "Accept"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={busy}
                onClick={() => handleDecline()}
              >
                Decline
              </Button>
            </div>
          )}
        </div>
      )}

      {notice ? (
        <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100">
          <p className="whitespace-pre-wrap break-words">{notice.text}</p>
          {notice.inviteeEmail ? (
            <p className="mt-2 text-xs font-medium opacity-90">
              Invitation email:{" "}
              <span className="font-mono">{notice.inviteeEmail}</span>
            </p>
          ) : null}
          {notice.tokenMailboxes?.length ? (
            <p className="mt-2 text-xs opacity-90">
              Mailboxes inferred from JWT (exact):{" "}
              <span className="font-mono">{notice.tokenMailboxes.join(", ")}</span>
            </p>
          ) : null}
          {!notice.tokenMailboxes?.length && notice.tokenMailboxesMasked?.length ? (
            <p className="mt-2 text-xs opacity-90">
              Mailboxes from your token (masked; update API for full email list):{" "}
              <span className="font-mono">{notice.tokenMailboxesMasked.join(", ")}</span>
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
