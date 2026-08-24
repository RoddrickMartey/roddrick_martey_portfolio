// src/types/dashboard.ts

export type DashboardCounts = {
  projects: number
  publishedProjects: number
  featuredProjects: number
  skills: number
  skillCategories: number
  experiences: number
  certifications: number
  education: number
  tech: number
  unreadMessages: number
  totalMessages: number
}

export type DashboardRecentMessage = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: string // ISO date string — Prisma DateTime serializes to string over JSON
}

export type DashboardRecentProject = {
  id: string
  title: string
  slug: string
  published: boolean
  updatedAt: string // ISO date string
}

export type ProfileStatus = {
  exists: boolean
  missingFields: string[]
  isComplete?: boolean // only present when exists === true
}

export type DashboardOverview = {
  counts: DashboardCounts
  recentMessages: DashboardRecentMessage[]
  recentProjects: DashboardRecentProject[]
  profileStatus: ProfileStatus
}
