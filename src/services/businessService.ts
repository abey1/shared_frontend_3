import { fetchBusinessById, patchBusiness } from "../api/businessesMine.js";
import type { MineBusinessRow } from "../types/owner";

export type BusinessPatchBody = Partial<{
  legalName: string;
  name: string | null;
  subdomain: string | null;
  taxId: string | null;
}>;

export async function getBusinessDetail(
  getAccessToken: () => Promise<string | null | undefined>,
  id: string,
) {
  return fetchBusinessById(getAccessToken, id);
}

export async function updateBusinessDetail(
  getAccessToken: () => Promise<string | null | undefined>,
  id: string,
  body: BusinessPatchBody,
) {
  return patchBusiness(getAccessToken, id, body as Record<string, unknown>);
}

export function businessHeading(b: MineBusinessRow) {
  const n = b.name?.trim();
  const legal = b.legalName.trim();
  return (n && n.length > 0 ? n : null) ?? legal ?? b.id;
}