import { api } from "@/lib/axios"
import {
  type CreateExperienceInput,
  type Experience,
  type ExperienceInput,
} from "@/types/experience"

export const experienceApi = {
  getAll: async (): Promise<Experience[]> =>
    (await api.get<Experience[]>("/experiences")).data,
  getOne: async (id: string): Promise<Experience> =>
    (await api.get<Experience>(`/experiences/${id}`)).data,
  create: async (input: CreateExperienceInput): Promise<Experience> =>
    (await api.post<Experience>("/experiences", input)).data,
  update: async (id: string, input: ExperienceInput): Promise<Experience> =>
    (await api.put<Experience>(`/experiences/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/experiences/${id}`)
  },
}
