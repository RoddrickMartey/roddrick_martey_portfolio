import { useMutation, useQuery } from "@tanstack/react-query"
import { publicApi } from "@/api/publicApi"
import type { CreatePublicContactInput } from "@/api/publicApi"

const PUBLIC_HOME_QUERY_KEY = ["public", "home"]
const PUBLIC_PROJECTS_QUERY_KEY = ["public", "projects"]
const PUBLIC_ABOUT_QUERY_KEY = ["public", "about"]
const PUBLIC_CONTACT_QUERY_KEY = ["public", "contact"]

export function usePublicHome() {
  return useQuery({
    queryKey: PUBLIC_HOME_QUERY_KEY,
    queryFn: publicApi.getHome,
  })
}

export function usePublicProjects() {
  return useQuery({
    queryKey: PUBLIC_PROJECTS_QUERY_KEY,
    queryFn: publicApi.getProjects,
  })
}

export function usePublicAbout() {
  return useQuery({
    queryKey: PUBLIC_ABOUT_QUERY_KEY,
    queryFn: publicApi.getAbout,
  })
}

export function usePublicContact() {
  return useQuery({
    queryKey: PUBLIC_CONTACT_QUERY_KEY,
    queryFn: publicApi.getContact,
  })
}

export function useSubmitPublicContact() {
  return useMutation({
    mutationFn: (input: CreatePublicContactInput) =>
      publicApi.submitContact(input),
  })
}
