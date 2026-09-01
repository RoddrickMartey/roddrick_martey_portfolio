import { z } from "zod"

const optionalString = z
  .union([z.string().trim(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value))

export const technologySchema = z.object({
  name: z.string().trim().min(1, "Technology name is required"),
  description: optionalString,
})

export const createTechnologySchema = technologySchema
export const updateTechnologySchema = technologySchema.partial()

export type TechnologyFormValues = z.infer<typeof technologySchema>
