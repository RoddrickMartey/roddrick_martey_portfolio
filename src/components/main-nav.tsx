import { useEffect, useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Menu, X, Home, FolderGit2, User, Mail, Moon, Sun } from "lucide-react"

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

  // Close on outside click
  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }

    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
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
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-5 left-5 z-50 flex h-16 w-16 items-center justify-center rounded-none border border-border bg-card text-foreground shadow-lg shadow-black/5 transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <Menu
            className={`absolute h-7 w-7 transition-all duration-200 ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute h-7 w-7 text-primary transition-all duration-200 ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </span>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="menu"
        className={`fixed top-24 left-5 z-50 w-64 origin-top-left rounded-none border border-border bg-card p-2 shadow-xl shadow-black/10 transition-all duration-200 ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path
            return (
              <button
                key={path}
                type="button"
                role="menuitem"
                onClick={() => handleNavigate(path)}
                className={`flex items-center gap-3 rounded-none px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </nav>

        <div className="my-2 h-px bg-border" />

        <button
          type="button"
          role="menuitem"
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-none px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          {isDark ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
          {isDark ? "Light mode" : "Dark mode"}
        </button>
      </div>
    </>
  )
}

export default MainNav
