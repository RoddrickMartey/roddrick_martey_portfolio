/**
 * Project DTOs - Portfolio project management validation
 * Supports rich project narratives: problem statement, approach, challenges, outcomes
 * Includes tech stack assignment (by existing Tech IDs), media uploads, and publication workflow
 */

import { z } from "zod"

const optionalUrlSchema = z
  .union([
    z.string().url("Must be a valid URL (e.g., https://example.com)"),
    z.literal(""),
    z.null(),
  ])
  .optional()
  .transform((val) => (val === "" ? null : val))

export const createProjectSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .trim()
    .min(1, "Title is required"),
  summary: z
    .string({ message: "Summary is required" })
    .trim()
    .min(1, "Summary is required"),

  problem: z.string().trim().optional(),
  approach: z.string().trim().optional(),
  challenge: z.string().trim().optional(),
  outcome: z.string().trim().optional(),

  liveUrl: optionalUrlSchema,
  githubUrl: optionalUrlSchema,

  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  order: z.number().int().default(0),

  imageBase64: z.string().optional(),

  // References existing Tech records by ID — created separately via the Tech module
  techIds: z.array(z.string().trim().min(1)).optional(),
})

export const updateProjectSchema = createProjectSchema.partial()

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
