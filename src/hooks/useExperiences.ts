import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { experienceApi } from "@/api/experienceApi"
import type { CreateExperienceInput, ExperienceInput } from "@/types/experience"

const EXPERIENCES_QUERY_KEY = ["experiences"]

export function useExperiences() {
  return useQuery({
    queryKey: EXPERIENCES_QUERY_KEY,
    queryFn: experienceApi.getAll,
  })
}

export function useCreateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateExperienceInput) => experienceApi.create(input),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: EXPERIENCES_QUERY_KEY })
    },
  })
}

export function useUpdateExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ExperienceInput }) =>
      experienceApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY })
    },
  })
}

export function useDeleteExperience() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => experienceApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCES_QUERY_KEY })
    },
  })
}
