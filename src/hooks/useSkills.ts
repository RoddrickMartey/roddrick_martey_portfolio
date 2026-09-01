import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { skillApi } from "@/api/skillApi"
import type {
  CreateSkillCategoryInput,
  CreateSkillInput,
  SkillCategoryInput,
  SkillInput,
} from "@/types/skill"

const SKILLS_QUERY_KEY = ["skills"]
const SKILL_CATEGORIES_QUERY_KEY = ["skill-categories"]

export function useSkillCategories() {
  return useQuery({
    queryKey: SKILL_CATEGORIES_QUERY_KEY,
    queryFn: skillApi.getCategories,
  })
}

export function useCreateSkillCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateSkillCategoryInput) =>
      skillApi.createCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}

export function useUpdateSkillCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: SkillCategoryInput }) =>
      skillApi.updateCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}

export function useDeleteSkillCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => skillApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
    },
  })
}

export function useSkills() {
  return useQuery({
    queryKey: SKILLS_QUERY_KEY,
    queryFn: () => skillApi.getAll(),
  })
}

export function useCreateSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateSkillInput) => skillApi.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
    },
  })
}

export function useUpdateSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: SkillInput }) =>
      skillApi.update(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
    },
  })
}

export function useDeleteSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => skillApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILLS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: SKILL_CATEGORIES_QUERY_KEY })
    },
  })
}
