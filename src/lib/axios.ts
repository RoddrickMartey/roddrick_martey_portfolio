import axios, { AxiosError } from "axios"
import { useAdminStore } from "@/store/adminStore"

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

      const isLoginRequest = error.config?.url?.endsWith("/auth/login")
      console.log(error.config?.url, isLoginRequest)

      const isSessionError =
        status === 401 &&
        !isLoginRequest &&
        (errorCode === "AUTH_REQUIRED" ||
          errorCode === "TOKEN_EXPIRED" ||
          errorCode === "TOKEN_INVALID")

      if (isSessionError) {
        useAdminStore.getState().logout()
        console.log("Reached this line")

        if (window.location.pathname !== "/") {
          window.location.href = "/"
        }
      }

      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)
