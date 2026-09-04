import { api } from "@/lib/axios"

export type RequestLog = {
  id: string
  requestId: string
  method: string
  fullUrl: string
  statusCode: number
  responseTime: number
  userAgent: string | null
  remoteAddress: string | null
  message: string
  createdAt: string
}

export type RequestLogsPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type RequestLogsResponse = {
  data: RequestLog[]
  pagination: RequestLogsPagination
}

export const requestLogApi = {
  getPage: async (page = 1, limit = 20): Promise<RequestLogsResponse> =>
    (
      await api.get<RequestLogsResponse>("/request-logs", {
        params: { page, limit },
      })
    ).data,
}
