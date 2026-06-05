/** Row from `GET /businesses/mine` (includes linkage role). */
export type MineBusinessRow = {
  id: string;
  legalName: string;
  name: string | null;
  subdomain: string | null;
  taxId: string | null;
  verificationStatus?: string;
  membershipRole: "owner" | "admin" | "manager" | "member";
  createdAt?: string;
  updatedAt?: string;
};

export type InvitationRow = {
  id: string;
  email: string;
  businessId: string;
  role: "owner" | "admin" | "manager" | "member";
  status: "pending" | "accepted" | "expired" | "revoked";
  invitedBy: string;
  invitationToken: string;
  expiresAt: string;
  createdAt: string;
  acceptedAt: string | null;
  acceptedUserId: string | null;
};

export type LocalBusinessPrefs = {
  logoUrl: string;
  hoursText: string;
  taxDisplayNote: string;
};
