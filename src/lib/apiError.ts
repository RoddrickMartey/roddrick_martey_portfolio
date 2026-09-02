import { isAxiosError } from "axios"

type ApiErrorResponse = {
  error?: string
  issues?: Array<{ message?: string }>
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!isAxiosError<ApiErrorResponse>(error)) return fallback

  const response = error.response?.data
  return response?.issues?.[0]?.message ?? response?.error ?? fallback
}
