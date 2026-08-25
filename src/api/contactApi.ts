import { api } from "@/lib/axios"
import {
  type ContactMessage,
  type CreateContactMessageInput,
  type UpdateContactMessageInput,
} from "@/types/contact"

export const contactApi = {
  create: async (input: CreateContactMessageInput): Promise<ContactMessage> =>
    (await api.post<ContactMessage>("/contact-messages", input)).data,
  getAll: async (): Promise<ContactMessage[]> =>
    (await api.get<ContactMessage[]>("/contact-messages")).data,
  getOne: async (id: string): Promise<ContactMessage> =>
    (await api.get<ContactMessage>(`/contact-messages/${id}`)).data,
  update: async (
    id: string,
    input: UpdateContactMessageInput
  ): Promise<ContactMessage> =>
    (await api.patch<ContactMessage>(`/contact-messages/${id}`, input)).data,
  delete: async (id: string): Promise<void> => {
    await api.delete(`/contact-messages/${id}`)
  },
}
