import { api } from "@/lib/axios"
import { type DashboardOverview } from "@/types/dashboard"

export const dashboardApi = {
  getDashboardData: async () => {
    const response = await api.get<DashboardOverview>("/dashboard")
    return response.data
  },
}
