import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { educationApi } from "@/api/educationApi"
import type { CreateEducationInput, EducationInput } from "@/types/education"

const EDUCATION_QUERY_KEY = ["education"]

export function useEducation() {
  return useQuery({
    queryKey: EDUCATION_QUERY_KEY,
    queryFn: educationApi.getAll,
  })
}

export function useCreateEducation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateEducationInput) => educationApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY })
    },
  })
}

export function useUpdateEducation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: EducationInput }) =>
      educationApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY })
    },
  })
}

export function useDeleteEducation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => educationApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EDUCATION_QUERY_KEY })
    },
  })
}
