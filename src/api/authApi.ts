import { api } from "@/lib/axios"

export interface Admin {
  id: string
  email: string
  fullName: string
  avatar: string | null
  createdAt: string
  updatedAt: string
}

const authApi = {
  async login(email: string, password: string): Promise<Admin> {
    const response = await api.post<Admin>("/auth/login", {
      email,
      password,
    })

    return response.data
  },

  async logout(): Promise<void> {
    await api.post("/auth/logout")
  },
}

export default authApi
