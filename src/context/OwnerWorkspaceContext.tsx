import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchMyBusinesses } from "../api/businessesMine.js";
import { useGetAccessToken } from "../hooks/useGetAccessToken";
import type { MineBusinessRow } from "../types/owner";

const LS_SELECTED_BIZ = "owner_dashboard_selected_business_id";

export type OwnerWorkspaceValue = {
  businesses: MineBusinessRow[];
  ownedBusinesses: MineBusinessRow[];
  selectedBusinessId: string | null;
  setSelectedBusinessId: (id: string) => void;
  selectedBusiness: MineBusinessRow | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<unknown>;
};

const OwnerWorkspaceContext = createContext<OwnerWorkspaceValue | null>(null);

export function OwnerWorkspaceProvider({ children }: { children: ReactNode }) {
  const getAccessToken = useGetAccessToken();

  const mineQuery = useQuery({
    queryKey: ["owner", "mine-businesses"],
    queryFn: async () => {
      const rows = await fetchMyBusinesses(getAccessToken);
      return (Array.isArray(rows) ? rows : []) as MineBusinessRow[];
    },
  });

  const businesses = mineQuery.data ?? [];
  const ownedBusinesses = useMemo(
    () => businesses.filter((b) => b.membershipRole === "owner"),
    [businesses],
  );

  const [pickerId, setPickerId] = useState<string | null>(null);

  const setSelectedBusinessId = useCallback((id: string) => {
    setPickerId(id);
    try {
      window.localStorage.setItem(LS_SELECTED_BIZ, id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (ownedBusinesses.length === 0) {
      setPickerId(null);
      return;
    }
    try {
      const saved = window.localStorage.getItem(LS_SELECTED_BIZ);
      if (saved && ownedBusinesses.some((o) => o.id === saved)) {
        setPickerId((prev) => prev ?? saved);
        return;
      }
    } catch {
      /* ignore */
    }
    setPickerId((prev) =>
      prev && ownedBusinesses.some((o) => o.id === prev) ?
        prev
      : ownedBusinesses[0].id,
    );
  }, [ownedBusinesses]);

  const selectedBusiness = useMemo(() => {
    const id =
      pickerId && ownedBusinesses.some((o) => o.id === pickerId) ?
        pickerId
      : ownedBusinesses[0]?.id;
    if (!id) return null;
    return ownedBusinesses.find((b) => b.id === id) ?? null;
  }, [pickerId, ownedBusinesses]);

  const value = useMemo<OwnerWorkspaceValue>(
    () => ({
      businesses,
      ownedBusinesses,
      selectedBusinessId: selectedBusiness?.id ?? null,
      setSelectedBusinessId,
      selectedBusiness,
      isLoading: mineQuery.isPending,
      isError: mineQuery.isError,
      refetch: () => mineQuery.refetch(),
    }),
    [
      businesses,
      ownedBusinesses,
      selectedBusiness,
      setSelectedBusinessId,
      mineQuery.isPending,
      mineQuery.isError,
      mineQuery,
    ],
  );

  return (
    <OwnerWorkspaceContext.Provider value={value}>
      {children}
    </OwnerWorkspaceContext.Provider>
  );
}

export function useOwnerWorkspace(): OwnerWorkspaceValue {
  const ctx = useContext(OwnerWorkspaceContext);
  if (!ctx) {
    throw new Error("useOwnerWorkspace requires OwnerWorkspaceProvider");
  }
  return ctx;
}
