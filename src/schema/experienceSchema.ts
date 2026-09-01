import { z } from "zod"

const optionalString = z
  .union([z.string().trim(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value))

export const experienceSchema = z.object({
  role: z.string().trim().min(1, "Role is required"),
  organization: z.string().trim().min(1, "Organization is required"),
  employmentType: optionalString,
  description: optionalString,
  location: optionalString,
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: optionalString,
  bullets: z.array(z.string().trim().min(1)).default([]),
  order: z.coerce.number().int().nonnegative(),
})

export const createExperienceSchema = experienceSchema
export const updateExperienceSchema = experienceSchema.partial()

export type ExperienceFormValues = z.input<typeof experienceSchema>
export type ExperienceUpdateFormValues = z.input<typeof updateExperienceSchema>
