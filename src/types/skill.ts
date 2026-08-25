export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"

export type SkillCategorySummary = {
  id: string
  name: string
  order: number
  adminId: string
  createdAt: string
}

export type Skill = {
  id: string
  name: string
  categoryId: string | null
  level: SkillLevel
  order: number
  adminId: string
  createdAt: string
  category: SkillCategorySummary | null
}

export type SkillInput = {
  name?: string
  categoryId?: string | null
  level?: SkillLevel
  order?: number
}

export type CreateSkillInput = SkillInput & {
  name: string
  level: SkillLevel
}

export type SkillCategory = SkillCategorySummary & {
  skills: Omit<Skill, "category">[]
}

export type SkillCategoryInput = {
  name?: string
  order?: number
}

export type CreateSkillCategoryInput = SkillCategoryInput & { name: string }
