import { useAdminStore } from "@/store/adminStore"
import { clearPersistedPublicQueryCache } from "@/lib/queryPersistence"
import { queryClient } from "@/lib/queryClient"

export function clearAdminSession() {
  useAdminStore.getState().logout()
  queryClient.clear()
  clearPersistedPublicQueryCache()
}
