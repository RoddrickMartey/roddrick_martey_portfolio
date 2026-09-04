import { Outlet } from "react-router-dom"
import MainNav from "@/components/main-nav"

function MainLayout() {
  return (
    <main className="min-h-screen">
      <MainNav />
      <Outlet />
    </main>
  )
}

export default MainLayout
