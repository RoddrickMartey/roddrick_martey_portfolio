export type Education = {
  id: string
  degree: string
  institution: string
  location: string | null
  startDate: string
  endDate: string | null
  description: string | null
  order: number
  adminId: string
  createdAt: string
  updatedAt: string
}

export type EducationInput = {
  degree?: string
  institution?: string
  location?: string
  startDate?: string
  endDate?: string | null
  description?: string
  order?: number
}

export type CreateEducationInput = EducationInput & {
  degree: string
  institution: string
  startDate: string
}
