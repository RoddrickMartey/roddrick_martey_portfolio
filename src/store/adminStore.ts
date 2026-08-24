import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface Admin {
  id: string
  email: string
  fullName: string
  avatar: string | null
  createdAt: string
  updatedAt: string
}

interface AdminStore {
  isLoggedIn: boolean
  admin: Admin | null
  setAdmin: (admin: Admin | null) => void
  logout: () => void
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      admin: null,
      setAdmin: (admin) => set({ admin, isLoggedIn: !!admin }),
      logout: () => set({ isLoggedIn: false, admin: null }),
    }),
    {
      name: "admin-storage", // Key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
)
