import { api } from "@/lib/axios"
import {
  type CreateTechnologyInput,
  type Technology,
  type UpdateTechnologyInput,
} from "@/types/technology"

export const technologyApi = {
  getAll: async (): Promise<Technology[]> =>
    (await api.get<Technology[]>("/project-tech")).data,
  create: async (input: CreateTechnologyInput): Promise<Technology> =>
    (await api.post<Technology>("/project-tech", input)).data,
  update: async (
    id: string,
    input: UpdateTechnologyInput
  ): Promise<Technology> =>
    (await api.put<Technology>(`/project-tech/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/project-tech/${id}`)
  },
}
