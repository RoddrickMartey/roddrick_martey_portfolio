import { z } from "zod"

export const publicContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  subject: z.string().trim().optional(),
  message: z.string().trim().min(1, "Message is required"),
})

export type PublicContactFormValues = z.infer<typeof publicContactSchema>
