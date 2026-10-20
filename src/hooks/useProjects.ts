import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { projectApi } from "@/api/projectApi"
import type { CreateProjectInput, ProjectInput } from "@/types/project"
import type { PublicProject } from "@/api/publicApi"
import {
  PUBLIC_PROJECTS_QUERY_KEY,
  publicQueryOptions,
} from "@/hooks/usePublic"

const PROJECTS_QUERY_KEY = ["projects"]
const PROJECT_QUERY_KEY = (slug: string) => ["projects", slug]

export function useProjects(featured?: boolean) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, { featured }],
    queryFn: () => projectApi.getAll(featured),
  })
}

export function useAdminProjects(featured?: boolean) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, "admin", { featured }],
    queryFn: () => projectApi.getAdminAll(featured),
  })
}

export function useProject(slug: string) {
  const queryClient = useQueryClient()

  return useQuery({
    ...publicQueryOptions,
    queryKey: PROJECT_QUERY_KEY(slug),
    queryFn: () => projectApi.getBySlug(slug),
    enabled: !!slug,
    placeholderData: () => {
      const project = queryClient
        .getQueryData<PublicProject[]>(PUBLIC_PROJECTS_QUERY_KEY)
        ?.find((item) => item.slug === slug)

      if (!project) {
        return undefined
      }

      return {
        ...project,
        problem: null,
        approach: null,
        challenge: null,
        outcome: null,
        imagePublicId: null,
        adminId: "",
        order: 0,
        createdAt: "",
        updatedAt: "",
      }
    },
  })
}

export function useAdminProject(slug: string) {
  return useQuery({
    queryKey: [...PROJECT_QUERY_KEY(slug), "admin"],
    queryFn: () => projectApi.getAdminBySlug(slug),
    enabled: !!slug,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateProjectInput) => projectApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProjectInput }) =>
      projectApi.update(id, input),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
      queryClient.setQueryData(
        PROJECT_QUERY_KEY(updatedProject.slug),
        updatedProject
      )
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}
