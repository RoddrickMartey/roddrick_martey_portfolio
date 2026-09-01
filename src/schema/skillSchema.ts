import { z } from "zod"

export const skillLevelSchema = z.enum([
  "BEGINNER",
  "INTERMEDIATE",
  "ADVANCED",
  "EXPERT",
])

export const skillCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  order: z.coerce.number().int().nonnegative(),
})

export const skillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required"),
  categoryId: z.string().trim().optional().nullable(),
  level: skillLevelSchema,
  order: z.coerce.number().int().nonnegative(),
})

export const createSkillCategorySchema = skillCategorySchema
export const updateSkillCategorySchema = skillCategorySchema.partial()
export const createSkillSchema = skillSchema
export const updateSkillSchema = skillSchema.partial()

export type SkillCategoryFormValues = z.infer<typeof skillCategorySchema>
export type SkillFormValues = z.infer<typeof skillSchema>
