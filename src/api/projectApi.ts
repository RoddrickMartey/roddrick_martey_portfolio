import { api } from "@/lib/axios"
import {
  type CreateProjectInput,
  type Project,
  type ProjectInput,
} from "@/types/project"

export const projectApi = {
  getAll: async (featured?: boolean): Promise<Project[]> =>
    (await api.get<Project[]>("/projects", { params: { featured } })).data,
  getAdminAll: async (featured?: boolean): Promise<Project[]> =>
    (await api.get<Project[]>("/projects/admin", { params: { featured } }))
      .data,
  getBySlug: async (slug: string): Promise<Project> =>
    (await api.get<Project>(`/projects/${slug}`)).data,
  getAdminBySlug: async (slug: string): Promise<Project> =>
    (await api.get<Project>(`/projects/admin/${slug}`)).data,
  create: async (input: CreateProjectInput): Promise<Project> =>
    (await api.post<Project>("/projects", input)).data,
  update: async (id: string, input: ProjectInput): Promise<Project> =>
    (await api.put<Project>(`/projects/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`)
  },
}
