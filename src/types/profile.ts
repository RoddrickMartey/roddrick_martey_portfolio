export type Profile = {
  id: string
  fullName: string
  title: string
  summary: string
  location: string | null
  nationality: string | null
  phone: string | null
  email: string
  linkedinUrl: string | null
  githubUrl: string | null
  websiteUrl: string | null
  resumeUrl: string | null
  resumePublicId: string | null
  avatarUrl: string | null
  avatarPublicId: string | null
  openToWork: boolean
  adminId: string
  createdAt: string
  updatedAt: string
}

export type UpdateProfileBasicInput = {
  fullName?: string
  title?: string
  summary?: string
  location?: string | null
  nationality?: string | null
}

export type UpdateProfileContactInput = {
  email?: string
  phone?: string | null
  linkedinUrl?: string | null
  githubUrl?: string | null
  websiteUrl?: string | null
}

export type UpdateProfileSettingsInput = {
  openToWork: boolean
}

export type UpdateProfileAvatarInput = {
  avatarBase64: string
}

export type UpdateProfileResumeInput = {
  resumeBase64: string
}
