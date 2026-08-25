export type Certification = {
  id: string
  name: string
  issuer: string
  platform: string | null
  dateEarned: string | null
  verifyUrl: string | null
  honours: boolean
  featured: boolean
  order: number
  adminId: string
  createdAt: string
  updatedAt: string
}

export type CertificationInput = {
  name?: string
  issuer?: string
  platform?: string
  dateEarned?: string | null
  verifyUrl?: string | null
  honours?: boolean
  featured?: boolean
  order?: number
}

export type CreateCertificationInput = CertificationInput & {
  name: string
  issuer: string
}
