import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { contactApi } from "@/api/contactApi"
import type { UpdateContactMessageInput } from "@/types/contact"

const CONTACT_MESSAGES_QUERY_KEY = ["contact-messages"]

export function useContactMessages() {
  return useQuery({
    queryKey: CONTACT_MESSAGES_QUERY_KEY,
    queryFn: contactApi.getAll,
  })
}

export function useUpdateContactMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      input,
    }: {
      id: string
      input: UpdateContactMessageInput
    }) => contactApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_MESSAGES_QUERY_KEY })
    },
  })
}

export function useDeleteContactMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => contactApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CONTACT_MESSAGES_QUERY_KEY })
    },
  })
}
