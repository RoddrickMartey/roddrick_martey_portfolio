export type Admin = {
  id: string
  email: string
  fullName: string | null
  avatar: string | null
  createdAt: string
  updatedAt: string
}

export type LogoutResponse = { message: string }
