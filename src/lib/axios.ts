import axios, { AxiosError } from "axios"

interface ApiErrorResponse {
  error?: string
  code?: string
  meta?: Record<string, unknown>
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { status, data } = error.response
      const errorCode = data?.code
      const requestUrl = error.config?.url ?? ""

      const isPublicRequest = requestUrl.includes("/public/")
      const isLoginRequest = requestUrl.endsWith("/auth/login")
      const isAdminRequest = !isPublicRequest && !isLoginRequest

      const isSessionError =
        status === 401 &&
        !isLoginRequest &&
        (errorCode === "AUTH_REQUIRED" ||
          errorCode === "TOKEN_EXPIRED" ||
          errorCode === "TOKEN_INVALID")

      if (isSessionError && isAdminRequest) {
        window.dispatchEvent(new Event("admin:session-expired"))
      }

      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
