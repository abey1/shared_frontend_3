import {
  createInvitation as apiCreateInvitation,
  deleteInvitation as apiDeleteInvitation,
  listInvitations as apiListInvitations,
  patchInvitation as apiPatchInvitation,
  resendInvitation as apiResendInvitation,
} from "../api/invitations.js";
import type { InvitationRow } from "../types/owner";

export type InvitationListQuery = {
  businessId: string;
  status?: InvitationRow["status"];
  email?: string;
};

export type CreateInvitationPayload = {
  businessId: string;
  email: string;
  role: InvitationRow["role"];
  expiresAt?: string;
};

export function listInvitations(
  getAccessToken: () => Promise<string | null | undefined>,
  query: InvitationListQuery,
) {
  return apiListInvitations(getAccessToken, query as Record<
    string,
    string | undefined
  >);
}

export function createInvitation(
  getAccessToken: () => Promise<string | null | undefined>,
  body: CreateInvitationPayload,
) {
  return apiCreateInvitation(getAccessToken, body);
}

export function patchInvitation(
  getAccessToken: () => Promise<string | null | undefined>,
  id: string,
  body: { status?: string; expiresAt?: string },
) {
  return apiPatchInvitation(getAccessToken, id, body);
}

export function deleteInvitation(
  getAccessToken: () => Promise<string | null | undefined>,
  id: string,
) {
  return apiDeleteInvitation(getAccessToken, id);
}

export function resendInvitation(
  getAccessToken: () => Promise<string | null | undefined>,
  id: string,
) {
  return apiResendInvitation(getAccessToken, id);
}
