import { api } from "@/lib/axios"
import {
  type CreateEducationInput,
  type Education,
  type EducationInput,
} from "@/types/education"

export const educationApi = {
  getAll: async (): Promise<Education[]> =>
    (await api.get<Education[]>("/education")).data,
  getOne: async (id: string): Promise<Education> =>
    (await api.get<Education>(`/education/${id}`)).data,
  create: async (input: CreateEducationInput): Promise<Education> =>
    (await api.post<Education>("/education", input)).data,
  update: async (id: string, input: EducationInput): Promise<Education> =>
    (await api.put<Education>(`/education/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/education/${id}`)
  },
}
