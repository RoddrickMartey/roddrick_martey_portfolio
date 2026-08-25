import type { Technology } from "./technology"

export type ProjectTechnology = {
  projectId: string
  techId: string
  description: string | null
  tech: Pick<Technology, "id" | "name" | "description">
}

export type Project = {
  id: string
  title: string
  slug: string
  summary: string
  problem: string | null
  approach: string | null
  challenge: string | null
  outcome: string | null
  liveUrl: string | null
  githubUrl: string | null
  imageUrl: string | null
  imagePublicId: string | null
  featured: boolean
  published: boolean
  order: number
  adminId: string
  createdAt: string
  updatedAt: string
  techStack: ProjectTechnology[]
}

export type ProjectInput = {
  title?: string
  summary?: string
  problem?: string
  approach?: string
  challenge?: string
  outcome?: string
  liveUrl?: string | null
  githubUrl?: string | null
  featured?: boolean
  published?: boolean
  order?: number
  imageBase64?: string
  techIds?: string[]
}

export type CreateProjectInput = ProjectInput & {
  title: string
  summary: string
}
