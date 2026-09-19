import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import {
  Menu,
  X,
  Home,
  FolderGit2,
  User,
  Mail,
  Moon,
  Sun,
  ArrowUpRight,
} from "lucide-react"

type NavItem = {
  label: string
  path: string
  icon: React.ComponentType<{ className?: string }>
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", icon: Home },
  { label: "Projects", path: "/projects", icon: FolderGit2 },
  { label: "About", path: "/about", icon: User },
  { label: "Contact", path: "/contact", icon: Mail },
]

function MainNav() {
  const [open, setOpen] = useState(false)
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  )
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Close on Escape
  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const handleNavigate = (path: string) => {
    setOpen(false)
    navigate(path)
  }

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
  }

  return (
    <>
      {/* Trigger - Kept at h-16 w-16 as requested */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-6 left-6 z-50 flex h-16 w-16 items-center justify-center border border-border bg-card text-foreground shadow-xl transition-all duration-300 hover:border-primary active:scale-95"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <Menu
            className={`absolute h-7 w-7 transition-all duration-300 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute h-7 w-7 text-primary transition-all duration-300 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </span>
      </button>

      {/* Full-Screen Drawer Navigation */}
      <div
        ref={panelRef}
        role="menu"
        className={`fixed inset-0 z-40 flex flex-col justify-between bg-background/95 p-8 backdrop-blur-md transition-all duration-500 ease-in-out sm:p-16 lg:p-24 ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-full opacity-0"
        }`}
      >
        {/* Navigation Section */}
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center pt-10">
          <p className="mb-8 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Navigation
          </p>
          <nav className="flex flex-col space-y-4 sm:space-y-6">
            {NAV_ITEMS.map(({ label, path }, index) => {
              const isActive = location.pathname === path
              return (
                <button
                  key={path}
                  type="button"
                  role="menuitem"
                  onClick={() => handleNavigate(path)}
                  style={{
                    transitionDelay: `${open ? index * 75 + 100 : 0}ms`,
                  }}
                  className={`group flex items-center justify-between text-left transition-all duration-300 ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span
                      className={`font-mono text-sm transition-colors duration-300 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span
                      className={`text-4xl font-light tracking-tight transition-all duration-300 sm:text-6xl md:text-7xl ${
                        isActive
                          ? "translate-x-2 font-semibold text-primary"
                          : "text-foreground hover:translate-x-3 hover:text-primary"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  <ArrowUpRight
                    className={`h-8 w-8 transition-all duration-300 ${
                      isActive
                        ? "translate-x-0 text-primary opacity-100"
                        : "-translate-x-4 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100"
                    }`}
                  />
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer Utilities */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-t border-border/60 pt-6">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            AVAILABLE FOR WORK
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={toggleTheme}
            className="flex items-center gap-3 border border-border bg-card px-5 py-3 text-xs font-medium tracking-wider text-foreground uppercase transition-colors hover:border-primary hover:bg-muted"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-primary" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4 text-primary" aria-hidden="true" />
            )}
            {isDark ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </>
  )
}

export default MainNav
