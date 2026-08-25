import { api } from "@/lib/axios"
import { type DashboardOverview } from "@/types/dashboard"

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardOverview> => {
    const response = await api.get<DashboardOverview>("/dashboard")
    return response.data
  },
}
