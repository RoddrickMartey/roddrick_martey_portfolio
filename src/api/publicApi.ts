import { api } from "@/lib/axios"

export type PublicHomeProfile = {
  fullName: string
  title: string
  summary: string
  location: string | null
  avatarUrl: string | null
  linkedinUrl: string | null
  githubUrl: string | null
  websiteUrl: string | null
  openToWork: boolean
}

export type PublicProjectTechnology = {
  tech: {
    name: string
  }
}

export type PublicHomeProject = {
  title: string
  slug: string
  summary: string
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
  techStack: PublicProjectTechnology[]
}

export type PublicSkill = {
  name: string
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"
}

export type PublicHomeResponse = {
  profile: PublicHomeProfile
  projects: PublicHomeProject[]
  skills: PublicSkill[]
}

export type PublicProject = PublicHomeProject & {
  problem: string | null
  approach: string | null
  challenge: string | null
  outcome: string | null
  featured: boolean
  techStack: Array<{
    description: string | null
    tech: {
      name: string
      description: string | null
    }
  }>
}

export type PublicAboutProfile = PublicHomeProfile & {
  nationality: string | null
  email: string
  resumeUrl: string | null
}

export type PublicExperience = {
  role: string
  organization: string
  employmentType: string | null
  location: string | null
  startDate: string
  endDate: string | null
  bullets: string[]
  description: string | null
}

export type PublicEducation = {
  degree: string
  institution: string
  location: string | null
  startDate: string
  endDate: string | null
  description: string | null
}

export type PublicCertification = {
  name: string
  issuer: string
  platform: string | null
  dateEarned: string | null
  verifyUrl: string | null
  honours: boolean
  featured: boolean
}

export type PublicSkillCategory = {
  name: string
  skills: PublicSkill[]
}

export type PublicAboutResponse = {
  profile: PublicAboutProfile
  experiences: PublicExperience[]
  education: PublicEducation[]
  certifications: PublicCertification[]
  skillCategories: PublicSkillCategory[]
}

export type PublicContactResponse = {
  email: string
  phone?: never
  linkedinUrl: string | null
  githubUrl: string | null
  location: string | null
}

export type CreatePublicContactInput = {
  name: string
  email: string
  subject?: string
  message: string
}

export type CreatePublicContactResponse = {
  id: string
  createdAt: string
}

export const publicApi = {
  getHome: async (): Promise<PublicHomeResponse> =>
    (await api.get<PublicHomeResponse>("/public/home")).data,
  getProjects: async (): Promise<PublicProject[]> =>
    (await api.get<PublicProject[]>("/public/projects")).data,
  getAbout: async (): Promise<PublicAboutResponse> =>
    (await api.get<PublicAboutResponse>("/public/about")).data,
  getContact: async (): Promise<PublicContactResponse> =>
    (await api.get<PublicContactResponse>("/public/contact")).data,
  submitContact: async (
    input: CreatePublicContactInput
  ): Promise<CreatePublicContactResponse> =>
    (await api.post<CreatePublicContactResponse>("/public/contact", input))
      .data,
}
