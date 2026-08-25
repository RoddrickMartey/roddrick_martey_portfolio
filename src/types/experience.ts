export type Experience = {
  id: string
  role: string
  organization: string
  employmentType: string | null
  description: string | null
  location: string | null
  startDate: string
  endDate: string | null
  bullets: string[]
  order: number
  adminId: string
  createdAt: string
  updatedAt: string
}

export type ExperienceInput = {
  role?: string
  organization?: string
  employmentType?: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string | null
  bullets?: string[]
  order?: number
}

export type CreateExperienceInput = ExperienceInput & {
  role: string
  organization: string
  startDate: string
}
