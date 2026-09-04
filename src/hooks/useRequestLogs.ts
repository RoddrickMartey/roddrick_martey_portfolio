import { useQuery } from "@tanstack/react-query"
import { requestLogApi } from "@/api/requestLogApi"

const REQUEST_LOGS_QUERY_KEY = ["request-logs"]

export function useRequestLogs(page = 1, limit = 20) {
  return useQuery({
    queryKey: [...REQUEST_LOGS_QUERY_KEY, { page, limit }],
    queryFn: () => requestLogApi.getPage(page, limit),
  })
}
