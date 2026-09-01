import { Outlet } from "react-router-dom"
import MainNav from "@/components/main-nav"

function MainLayout() {
  return (
    <main className="min-h-screen bg-[#F7F8FA] text-[#161A22] dark:bg-[#10131A] dark:text-[#E8EAF0]">
      <MainNav />
      <Outlet />
    </main>
  )
}

export default MainLayout
