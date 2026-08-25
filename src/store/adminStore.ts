import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { type Admin } from "@/types/api"

interface AdminStore {
  isLoggedIn: boolean
  admin: Admin | null
  setAdmin: (admin: Admin | null) => void
  updateAdmin: (admin: Partial<Admin>) => void
  logout: () => void
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      admin: null,
      setAdmin: (admin) => set({ admin, isLoggedIn: !!admin }),
      updateAdmin: (updatedFields) =>
        set((state) => ({
          admin: state.admin ? { ...state.admin, ...updatedFields } : null,
        })),
      logout: () => set({ isLoggedIn: false, admin: null }),
    }),
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
