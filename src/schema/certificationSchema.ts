import { z } from "zod"

const optionalString = z
  .union([z.string().trim(), z.literal("")])
  .optional()
  .transform((value) => (value === "" ? undefined : value))

export const certificationSchema = z.object({
  name: z.string().trim().min(1, "Certification name is required"),
  issuer: z.string().trim().min(1, "Issuer is required"),
  platform: optionalString,
  dateEarned: optionalString,
  verifyUrl: optionalString,
  honours: z.boolean().default(false),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().nonnegative(),
})

export const createCertificationSchema = certificationSchema
export const updateCertificationSchema = certificationSchema.partial()

export type CertificationFormValues = z.input<typeof certificationSchema>
export type CertificationUpdateFormValues = z.input<
  typeof updateCertificationSchema
>
