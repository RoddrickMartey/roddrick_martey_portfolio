import { z } from "zod"

const optionalString = z
  .union([z.string().trim(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value))

export const educationSchema = z.object({
  degree: z.string().trim().min(1, "Degree is required"),
  institution: z.string().trim().min(1, "Institution is required"),
  location: optionalString,
  startDate: z.string().trim().min(1, "Start date is required"),
  endDate: optionalString,
  description: optionalString,
  order: z.coerce.number().int().nonnegative(),
})

export const createEducationSchema = educationSchema
export const updateEducationSchema = educationSchema.partial()

export type EducationFormValues = z.infer<typeof educationSchema>
