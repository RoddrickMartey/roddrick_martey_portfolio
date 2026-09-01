import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { certificationApi } from "@/api/certificationApi"
import type {
  CertificationInput,
  CreateCertificationInput,
} from "@/types/certification"

const CERTIFICATIONS_QUERY_KEY = ["certifications"]

export function useCertifications() {
  return useQuery({
    queryKey: CERTIFICATIONS_QUERY_KEY,
    queryFn: () => certificationApi.getAll(),
  })
}

export function useCreateCertification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateCertificationInput) =>
      certificationApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY })
    },
  })
}

export function useUpdateCertification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CertificationInput }) =>
      certificationApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY })
    },
  })
}

export function useDeleteCertification() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => certificationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATIONS_QUERY_KEY })
    },
  })
}
