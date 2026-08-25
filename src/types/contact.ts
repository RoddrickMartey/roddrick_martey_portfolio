export type ContactMessage = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: string
}

export type CreateContactMessageInput = {
  name: string
  email: string
  subject?: string
  message: string
}

export type UpdateContactMessageInput = {
  read: boolean
}
