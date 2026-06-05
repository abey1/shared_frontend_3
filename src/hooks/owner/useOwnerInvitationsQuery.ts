import { useQuery } from "@tanstack/react-query";
import {
  listInvitations,
  type InvitationListQuery,
} from "../../services/invitationService";
import type { InvitationRow } from "../../types/owner";

function ownerInvitationQueryKey(businessId: string, status: string) {
  return ["owner", "invitations", businessId, status] as const;
}

export type UseOwnerInvitationsQueryArgs = {
  getAccessToken: () => Promise<string | null | undefined>;
  businessId: string | null | undefined;
  status?: string;
  enabled?: boolean;
};

export function useOwnerInvitationsQuery({
  getAccessToken,
  businessId,
  status,
  enabled = true,
}: UseOwnerInvitationsQueryArgs) {
  const qBusinessId = businessId ?? "";
  const ok = Boolean(businessId) && enabled;

  return useQuery({
    queryKey: ownerInvitationQueryKey(qBusinessId, status ?? ""),
    queryFn: async () => {
      const qs: InvitationListQuery = { businessId: qBusinessId };
      if (status) qs.status = status as InvitationListQuery["status"];
      const rows = await listInvitations(getAccessToken, qs);
      return Array.isArray(rows) ? (rows as InvitationRow[]) : [];
    },
    enabled: ok,
  });
}
