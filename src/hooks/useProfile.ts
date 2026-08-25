import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { profileApi } from "@/api/profileApi"
import type {
  UpdateProfileAvatarInput,
  UpdateProfileBasicInput,
  UpdateProfileContactInput,
  UpdateProfileResumeInput,
  UpdateProfileSettingsInput,
} from "@/types/profile"

const PROFILE_QUERY_KEY = ["admin-profile"]

export function useProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: profileApi.getProfile,
  })
}

export function useUpdateProfileBasic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileBasicInput) =>
      profileApi.updateBasic(input),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile)
    },
  })
}

export function useUpdateProfileContact() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileContactInput) =>
      profileApi.updateContact(input),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile)
    },
  })
}

export function useUpdateProfileSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileSettingsInput) =>
      profileApi.updateSettings(input),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile)
    },
  })
}

export function useUpdateProfileAvatar() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileAvatarInput) =>
      profileApi.updateAvatar(input),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile)
    },
  })
}

export function useUpdateProfileResume() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdateProfileResumeInput) =>
      profileApi.updateResume(input),
    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(PROFILE_QUERY_KEY, updatedProfile)
    },
  })
}
