import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { technologyApi } from "@/api/technologyApi"
import type {
  CreateTechnologyInput,
  UpdateTechnologyInput,
} from "@/types/technology"

const TECHNOLOGIES_QUERY_KEY = ["technologies"]

export function useTechnologies() {
  return useQuery({
    queryKey: TECHNOLOGIES_QUERY_KEY,
    queryFn: technologyApi.getAll,
  })
}

export function useCreateTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateTechnologyInput) => technologyApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGIES_QUERY_KEY })
    },
  })
}

export function useUpdateTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateTechnologyInput }) =>
      technologyApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGIES_QUERY_KEY })
    },
  })
}

export function useDeleteTechnology() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => technologyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TECHNOLOGIES_QUERY_KEY })
    },
  })
}
