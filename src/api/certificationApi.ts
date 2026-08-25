import { api } from "@/lib/axios"
import {
  type Certification,
  type CertificationInput,
  type CreateCertificationInput,
} from "@/types/certification"

export const certificationApi = {
  getAll: async (featured?: boolean): Promise<Certification[]> =>
    (
      await api.get<Certification[]>("/certifications", {
        params: { featured },
      })
    ).data,
  getOne: async (id: string): Promise<Certification> =>
    (await api.get<Certification>(`/certifications/${id}`)).data,
  create: async (input: CreateCertificationInput): Promise<Certification> =>
    (await api.post<Certification>("/certifications", input)).data,
  update: async (
    id: string,
    input: CertificationInput
  ): Promise<Certification> =>
    (await api.put<Certification>(`/certifications/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/certifications/${id}`)
  },
}
