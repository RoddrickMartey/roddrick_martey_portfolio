import { useMutation, useQuery } from "@tanstack/react-query"
import { publicApi } from "@/api/publicApi"
import type { CreatePublicContactInput } from "@/api/publicApi"

export const PUBLIC_HOME_QUERY_KEY = ["public", "home"]
export const PUBLIC_PROJECTS_QUERY_KEY = ["public", "projects"]
export const PUBLIC_ABOUT_QUERY_KEY = ["public", "about"]
export const PUBLIC_CONTACT_QUERY_KEY = ["public", "contact"]

export const publicQueryOptions = {
  staleTime: 5 * 60 * 1000, // treat data as fresh for 5 min
  gcTime: 30 * 60 * 1000, // keep unused data in cache for 30 min (v5; use cacheTime in v4)
  retry: 2,
  retryDelay: (attemptIndex: number) =>
    Math.min(1000 * 2 ** attemptIndex, 3000),
  refetchOnWindowFocus: false, // avoids surprise refetches (and errors) when switching tabs
}

export function usePublicHome() {
  return useQuery({
    ...publicQueryOptions,
    queryKey: PUBLIC_HOME_QUERY_KEY,
    queryFn: publicApi.getHome,
  })
}

export function usePublicProjects() {
  return useQuery({
    ...publicQueryOptions,
    queryKey: PUBLIC_PROJECTS_QUERY_KEY,
    queryFn: publicApi.getProjects,
  })
}

export function usePublicAbout() {
  return useQuery({
    ...publicQueryOptions,
    queryKey: PUBLIC_ABOUT_QUERY_KEY,
    queryFn: publicApi.getAbout,
  })
}

export function usePublicContact() {
  return useQuery({
    ...publicQueryOptions,
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
