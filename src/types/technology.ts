export type Technology = {
  id: string
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
}

export type CreateTechnologyInput = {
  name: string
  description?: string
}

export type UpdateTechnologyInput = {
  name?: string
  description?: string | null
}
