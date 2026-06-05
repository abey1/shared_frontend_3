import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createInvitation,
  deleteInvitation,
  patchInvitation,
  resendInvitation,
  type CreateInvitationPayload,
} from "../../services/invitationService";

import { unwrapApiErrorPayload } from "../../api/client.js";

function unwrapErr(e: unknown): string {
  const rec =
    typeof e === "object" && e !== null ?
      (e as { data?: unknown; message?: string })
    : undefined;

  if (rec?.data && typeof rec.data === "object" && rec.data !== null) {
    const u = unwrapApiErrorPayload(rec.data as Record<string, unknown>);
    if (u.text && u.text !== "Request failed.") return u.text;
  }
  if (rec?.message && typeof rec.message === "string") {
    return rec.message;
  }
  return typeof e === "string" ? e : "Request failed";
}

/** Mutations wired for owner invitations (manager-only role enforced by caller payloads). */
export function useOwnerInvitationCommands(
  businessId: string | undefined,
  getAccessToken: () => Promise<string | null | undefined>,
) {
  const queryClient = useQueryClient();

  const invalidate = () => {
    if (!businessId) return;
    void queryClient.invalidateQueries({
      queryKey: ["owner", "invitations", businessId],
    });
  };

  const createPending = useMutation({
    mutationFn: async (
      vars: Omit<CreateInvitationPayload, "businessId" | "role"> & {
        role?: CreateInvitationPayload["role"];
      },
    ) => {
      if (!businessId) throw new Error("Missing business.");
      const body: CreateInvitationPayload = {
        businessId,
        email: vars.email,
        role: vars.role ?? "manager",
        ...(vars.expiresAt ? { expiresAt: vars.expiresAt } : {}),
      };
      return createInvitation(getAccessToken, body);
    },
    onSuccess: (data) => {
      invalidate();
      if (typeof data === "object" && data !== null && "emailSent" in data) {
        const sent = Boolean((data as { emailSent?: boolean }).emailSent);
        toast.success(sent ? "Invitation sent." : "Invitation created (email not sent — check MAIL_*).");
      } else toast.success("Invitation sent.");
    },
    onError: (e: unknown) => toast.error(unwrapErr(e)),
  });

  const patchPending = useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: { status?: string; expiresAt?: string };
    }) => patchInvitation(getAccessToken, id, body),
    onSuccess: () => {
      invalidate();
      toast.success("Invitation updated.");
    },
    onError: (e: unknown) => toast.error(unwrapErr(e)),
  });

  const removeInvitation = useMutation({
    mutationFn: async (id: string) => deleteInvitation(getAccessToken, id),
    onSuccess: () => {
      invalidate();
      toast.success("Invitation removed.");
    },
    onError: (e: unknown) => toast.error(unwrapErr(e)),
  });

  const resendInvitationMut = useMutation({
    mutationFn: async (id: string) => resendInvitation(getAccessToken, id),
    onSuccess: (data) => {
      invalidate();
      const sent =
        typeof data === "object" &&
        data !== null &&
        "emailSent" in data ?
          Boolean((data as { emailSent?: boolean }).emailSent)
        : true;
      toast.success(sent ? "Invitation email resent." : "Resend finished (SMTP may be disabled).");
    },
    onError: (e: unknown) => toast.error(unwrapErr(e)),
  });

  return {
    createPending,
    patchPending,
    removeInvitation,
    resendInvitationMut,
  };
}
