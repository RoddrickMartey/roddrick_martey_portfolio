import { api } from "@/lib/axios"
import {
  type Profile,
  type UpdateProfileAvatarInput,
  type UpdateProfileBasicInput,
  type UpdateProfileContactInput,
  type UpdateProfileResumeInput,
  type UpdateProfileSettingsInput,
} from "@/types/profile"

export const profileApi = {
  getProfile: async (): Promise<Profile> =>
    (await api.get<Profile>("/profile")).data,
  updateBasic: async (input: UpdateProfileBasicInput): Promise<Profile> =>
    (await api.put<Profile>("/profile/basic", input)).data,
  updateContact: async (input: UpdateProfileContactInput): Promise<Profile> =>
    (await api.put<Profile>("/profile/contact", input)).data,
  updateSettings: async (input: UpdateProfileSettingsInput): Promise<Profile> =>
    (await api.put<Profile>("/profile/settings", input)).data,
  updateAvatar: async (input: UpdateProfileAvatarInput): Promise<Profile> =>
    (await api.put<Profile>("/profile/avatar", input)).data,
  updateResume: async (input: UpdateProfileResumeInput): Promise<Profile> =>
    (await api.put<Profile>("/profile/resume", input)).data,
  downloadResume: async (): Promise<Blob> => {
    const response = await api.get("/profile/resume/download", {
      responseType: "blob",
    })
    return response.data
  },
}
