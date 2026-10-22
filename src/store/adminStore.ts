import { create } from "zustand"
import { type Admin } from "@/types/api"

interface AdminStore {
  isLoggedIn: boolean
  admin: Admin | null
  setAdmin: (admin: Admin | null) => void
  updateAdmin: (admin: Partial<Admin>) => void
  logout: () => void
}

if (typeof window !== "undefined") {
  window.localStorage.removeItem("admin-storage")
}

export const useAdminStore = create<AdminStore>()((set) => ({
  isLoggedIn: false,
  admin: null,
  setAdmin: (admin) => set({ admin, isLoggedIn: !!admin }),
  updateAdmin: (updatedFields) =>
    set((state) => ({
      admin: state.admin ? { ...state.admin, ...updatedFields } : null,
    })),
  logout: () => set({ isLoggedIn: false, admin: null }),
}))
