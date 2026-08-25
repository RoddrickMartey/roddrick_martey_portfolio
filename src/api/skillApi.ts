import { api } from "@/lib/axios"
import {
  type CreateSkillCategoryInput,
  type CreateSkillInput,
  type Skill,
  type SkillCategory,
  type SkillCategoryInput,
  type SkillInput,
} from "@/types/skill"

export const skillApi = {
  getCategories: async (): Promise<SkillCategory[]> =>
    (await api.get<SkillCategory[]>("/skill-categories")).data,
  getCategory: async (id: string): Promise<SkillCategory> =>
    (await api.get<SkillCategory>(`/skill-categories/${id}`)).data,
  createCategory: async (
    input: CreateSkillCategoryInput
  ): Promise<SkillCategory> =>
    (await api.post<SkillCategory>("/skill-categories", input)).data,
  updateCategory: async (
    id: string,
    input: SkillCategoryInput
  ): Promise<SkillCategory> =>
    (await api.put<SkillCategory>(`/skill-categories/${id}`, input)).data,
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/skill-categories/${id}`)
  },

  getAll: async (categoryId?: string): Promise<Skill[]> =>
    (await api.get<Skill[]>("/skills", { params: { categoryId } })).data,
  getOne: async (id: string): Promise<Skill> =>
    (await api.get<Skill>(`/skills/${id}`)).data,
  create: async (input: CreateSkillInput): Promise<Skill> =>
    (await api.post<Skill>("/skills", input)).data,
  update: async (id: string, input: SkillInput): Promise<Skill> =>
    (await api.put<Skill>(`/skills/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/skills/${id}`)
  },
}
