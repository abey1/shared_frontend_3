import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { fetchMyBusinesses } from "../api/businessesMine.js";
import { useGetAccessToken } from "../hooks/useGetAccessToken";

const LS_KEY = "manager_dashboard_selected_business_id";

/** Owner / admin / org manager can use manager inventory APIs. */
function filterManagedBusinesses(rows) {
  return (rows ?? []).filter((b) =>
    ["manager", "admin", "owner"].includes(
      String(b.membershipRole ?? "").toLowerCase(),
    ),
  );
}

const ManagerWorkspaceContext = createContext(null);

export function ManagerWorkspaceProvider({ children }) {
  const getAccessToken = useGetAccessToken();

  const mineQuery = useQuery({
    queryKey: ["manager", "mine-businesses"],
    queryFn: async () => {
      const rows = await fetchMyBusinesses(getAccessToken);
      return Array.isArray(rows) ? rows : [];
    },
  });

  const businesses = mineQuery.data ?? [];
  const managedBusinesses = useMemo(
    () => filterManagedBusinesses(businesses),
    [businesses],
  );

  const [pickerId, setPickerIdState] = useState(null);

  const setSelectedBusinessId = useCallback((id) => {
    setPickerIdState(id);
    try {
      window.localStorage.setItem(LS_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (managedBusinesses.length === 0) {
      setPickerIdState(null);
      return;
    }
    try {
      const saved = window.localStorage.getItem(LS_KEY);
      if (saved && managedBusinesses.some((b) => b.id === saved)) {
        setPickerIdState((prev) => prev ?? saved);
        return;
      }
    } catch {
      /* ignore */
    }
    setPickerIdState((prev) =>
      prev && managedBusinesses.some((b) => b.id === prev)
        ? prev
        : managedBusinesses[0]?.id ?? null,
    );
  }, [managedBusinesses]);

  const selectedBusiness =
    managedBusinesses.find((b) => b.id === pickerId) ??
    managedBusinesses[0] ??
    null;
  const selectedBusinessId = selectedBusiness?.id ?? null;

  const value = useMemo(
    () => ({
      managedBusinesses,
      selectedBusinessId,
      selectedBusiness,
      setSelectedBusinessId,
      isLoading: mineQuery.isLoading,
      isError: mineQuery.isError,
      refetch: mineQuery.refetch,
    }),
    [
      managedBusinesses,
      mineQuery.isError,
      mineQuery.isLoading,
      mineQuery.refetch,
      selectedBusiness,
      selectedBusinessId,
      setSelectedBusinessId,
    ],
  );

  return (
    <ManagerWorkspaceContext.Provider value={value}>
      {children}
    </ManagerWorkspaceContext.Provider>
  );
}

export function useManagerWorkspace() {
  const ctx = useContext(ManagerWorkspaceContext);
  if (!ctx) {
    throw new Error(
      "useManagerWorkspace must be used within ManagerWorkspaceProvider",
    );
  }
  return ctx;
}
