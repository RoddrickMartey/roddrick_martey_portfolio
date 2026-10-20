import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import MainNav from "@/components/main-nav"

function MainLayout() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
  }, [pathname, search])

  return (
    <>
      <a
        href="#main-content"
        className="fixed top-2 left-2 z-100 -translate-y-20 bg-background px-4 py-2 text-sm font-medium text-foreground shadow-lg transition-transform focus:translate-y-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
      >
        Skip to content
      </a>
      <MainNav />
      <div id="main-content" className="min-h-screen w-full">
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout
