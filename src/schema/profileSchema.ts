/**
 * Profile DTOs - Separate validation schemas for granular profile updates
 * Modular approach enables clear API contracts, easier testing, and type safety
 * Schemas kept separate for clarity; merged in service layer for flexible updates
 */

import { z } from "zod"

/**
 * Update basic profile info: identity and professional info
 * All optional to support partial updates (PUT /profile/basic)
 */
export const updateProfileBasicSchema = z.object({
  fullName: z.string().min(1, "Full name is required").optional(),
  title: z.string().min(1, "Title is required").optional(),
  summary: z.string().min(1, "Summary is required").optional(),
  location: z.string().nullable().optional(),
  nationality: z.string().nullable().optional(),
})
export type UpdateProfileBasicInput = z.infer<typeof updateProfileBasicSchema>

/**
 * Update contact info: email, phone, social media URLs
 * Social URLs validated if provided; nullable for privacy
 */
export const updateProfileContactSchema = z.object({
  email: z.string().email("Valid email is required").optional(),
  phone: z.string().nullable().optional(),
  linkedinUrl: z.string().url("Valid URL is required").nullable().optional(),
  githubUrl: z.string().url("Valid URL is required").nullable().optional(),
  websiteUrl: z.string().url("Valid URL is required").nullable().optional(),
})
export type UpdateProfileContactInput = z.infer<
  typeof updateProfileContactSchema
>

/**
 * Update media uploads (base64 encoded)
 * Base64 encoding simplifies mobile integration without multipart form-data
 */
export const updateProfileMediaSchema = z.object({
  avatarBase64: z.string().optional(),
  resumeBase64: z.string().optional(),
})
export type UpdateProfileMediaInput = z.infer<typeof updateProfileMediaSchema>

/**
 * Update profile settings: availability status for opportunity seeking
 */
export const updateProfileSettingsSchema = z.object({
  openToWork: z.boolean(),
})
export type UpdateProfileSettingsInput = z.infer<
  typeof updateProfileSettingsSchema
>
