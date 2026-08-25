import { api } from "@/lib/axios"
import { type Admin, type LogoutResponse } from "@/types/api"

const authApi = {
  async login(email: string, password: string): Promise<Admin> {
    const response = await api.post<Admin>("/auth/login", {
      email,
      password,
    })

    return response.data
  },

  async logout(): Promise<LogoutResponse> {
    const response = await api.post<LogoutResponse>("/auth/logout")
    return response.data
  },
}

export type { Admin }
export default authApi
