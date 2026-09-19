import { useMutation, useQuery } from "@tanstack/react-query"
import { publicApi } from "@/api/publicApi"
import type { CreatePublicContactInput } from "@/api/publicApi"

const PUBLIC_HOME_QUERY_KEY = ["public", "home"]
const PUBLIC_PROJECTS_QUERY_KEY = ["public", "projects"]
const PUBLIC_ABOUT_QUERY_KEY = ["public", "about"]
const PUBLIC_CONTACT_QUERY_KEY = ["public", "contact"]

const baseOptions = {
  staleTime: 5 * 60 * 1000, // treat data as fresh for 5 min
  gcTime: 30 * 60 * 1000, // keep unused data in cache for 30 min (v5; use cacheTime in v4)
  retry: 2,
  refetchOnWindowFocus: false, // avoids surprise refetches (and errors) when switching tabs
}

export function usePublicHome() {
  return useQuery({
    ...baseOptions,
    queryKey: PUBLIC_HOME_QUERY_KEY,
    queryFn: publicApi.getHome,
  })
}

export function usePublicProjects() {
  return useQuery({
    ...baseOptions,
    queryKey: PUBLIC_PROJECTS_QUERY_KEY,
    queryFn: publicApi.getProjects,
  })
}

export function usePublicAbout() {
  return useQuery({
    ...baseOptions,
    queryKey: PUBLIC_ABOUT_QUERY_KEY,
    queryFn: publicApi.getAbout,
  })
}

export function usePublicContact() {
  return useQuery({
    ...baseOptions,
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
