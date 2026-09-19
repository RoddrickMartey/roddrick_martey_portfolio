import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AdminSidebar } from "../components/admin-sidebar"
import { Outlet } from "react-router-dom"

function AdminLayout() {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <div className="fixed top-3 left-3 z-50 md:hidden">
        <SidebarTrigger className="border border-border bg-background/90 shadow-sm backdrop-blur-sm" />
      </div>
      <main className="min-h-screen min-w-0 flex-1 bg-background pt-14 md:pt-0">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}

export default AdminLayout
