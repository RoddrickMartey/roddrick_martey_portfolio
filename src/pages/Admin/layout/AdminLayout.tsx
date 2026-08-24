import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "../components/admin-sidebar"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <main className="min-h-screen w-full bg-background">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout
