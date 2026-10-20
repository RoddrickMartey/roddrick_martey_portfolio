import { QueryClient } from "@tanstack/react-query"
import { persistQueryClient } from "@tanstack/react-query-persist-client"
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister"

const PUBLIC_QUERY_PREFIX = "public"
const PUBLIC_CACHE_BUSTER = "public-cache-v1"
const PUBLIC_CACHE_MAX_AGE = 24 * 60 * 60 * 1000

function isPublicQuery(query: { queryKey: readonly unknown[] }) {
  return query.queryKey[0] === PUBLIC_QUERY_PREFIX
}

export function persistPublicQueryCache(queryClient: QueryClient) {
  const persister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "portfolio-public-query-cache",
  })

  return persistQueryClient({
    queryClient,
    persister,
    maxAge: PUBLIC_CACHE_MAX_AGE,
    buster: PUBLIC_CACHE_BUSTER,
    dehydrateOptions: {
      shouldDehydrateQuery: isPublicQuery,
    },
  })
}
