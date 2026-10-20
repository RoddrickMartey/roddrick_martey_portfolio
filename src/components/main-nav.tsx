import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Moon, Sun, ArrowUpRight, MapPin, Globe } from "lucide-react"
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { useTheme } from "@/components/theme-provider"
import type { PublicHomeProfile } from "@/api/publicApi"

type NavItem = {
  label: string
  path: string
  hint: string
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", path: "/", hint: "Start here" },
  { label: "Projects", path: "/projects", hint: "Selected work" },
  { label: "About", path: "/about", hint: "Story & skills" },
  { label: "Contact", path: "/contact", hint: "Say hello" },
]

const FOCUSABLE =
  "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])"

/* "/projects/some-slug" still highlights "Projects" */
function isActivePath(current: string, path: string) {
  if (path === "/") {
    return current === "/"
  }
  return current === path || current.startsWith(`${path}/`)
}

type MainNavProps = {
  /** Optional. Fills the side panel and the availability badge. */
  profile?: PublicHomeProfile | null
}

function MainNav({ profile }: MainNavProps) {
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()

  const isDark = resolvedTheme === "dark"
  const openToWork = profile?.openToWork ?? true

  const socials = [
    { href: profile?.githubUrl, label: "GitHub", Icon: GithubLogoIcon },
    { href: profile?.linkedinUrl, label: "LinkedIn", Icon: LinkedinLogoIcon },
    { href: profile?.websiteUrl, label: "Website", Icon: Globe },
  ].filter((s) => Boolean(s.href))

  const showAside = Boolean(profile?.fullName)

  // Close the drawer whenever the route changes
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setOpen(false)
  }

  // Escape closes, Tab stays inside the drawer, focus returns to the button
  useEffect(() => {
    if (!open) {
      return
    }

    const getFocusable = () => {
      const inPanel = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      )
      return [triggerRef.current, ...inPanel].filter(
        (el): el is HTMLElement => el !== null
      )
    }

    const frame = requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    })

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        return
      }
      if (event.key !== "Tab") {
        return
      }

      const items = getFocusable()
      if (items.length === 0) {
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (!active || !items.includes(active)) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKey)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener("keydown", handleKey)
      triggerRef.current?.focus()
    }
  }, [open])

  // Stop the page behind from scrolling while the drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  /* Shared entrance animation for staggered pieces */
  const reveal = (delay: number) => ({
    style: { transitionDelay: `${open ? delay : 0}ms` },
    className: `transition-all duration-500 motion-reduce:transition-none ${
      open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
    }`,
  })

  return (
    <>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="main-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed top-[max(1.5rem,env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))] z-50 flex h-16 w-16 items-center justify-center border border-border bg-card text-foreground shadow-xl transition-all duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none active:scale-95 motion-reduce:transition-none"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <Menu
            className={`absolute h-7 w-7 transition-all duration-300 motion-reduce:transition-none ${
              open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            className={`absolute h-7 w-7 text-primary transition-all duration-300 motion-reduce:transition-none ${
              open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          />
        </span>
      </button>

      {/* Full-screen drawer */}
      <div
        ref={panelRef}
        id="main-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        inert={!open}
        className={`fixed inset-0 z-40 flex flex-col bg-background/90 px-8 pt-24 pb-6 backdrop-blur-md transition-all duration-500 ease-in-out motion-reduce:transition-none sm:px-16 sm:pt-28 sm:pb-10 lg:px-24 ${
          open
            ? "visible translate-x-0 opacity-100"
            : "invisible -translate-x-full opacity-0"
        }`}
      >
        {/* Main area: links (+ optional side panel on large screens).
            min-h-0 + flex-1 means it only ever uses the space above the footer. */}
        <div
          className={`mx-auto grid min-h-0 w-full max-w-6xl flex-1 items-center gap-12 ${
            showAside ? "lg:grid-cols-[1fr_18rem] lg:gap-16" : ""
          }`}
        >
          {/* Links */}
          <div>
            {/* Label hidden on very short screens to save space */}
            <div
              {...reveal(50)}
              className={`mb-4 flex items-center gap-4 sm:mb-6 [@media(max-height:560px)]:hidden ${reveal(50).className}`}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Navigation
              </p>
              <span className="h-px flex-1 bg-border/60" />
            </div>

            <nav aria-label="Main" className="border-t border-border/60">
              {NAV_ITEMS.map(({ label, path, hint }, index) => {
                const isActive = isActivePath(location.pathname, path)
                return (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      transitionDelay: `${open ? index * 75 + 150 : 0}ms`,
                    }}
                    /* Row padding scales with screen height so all rows always fit */
                    className={`group relative flex items-center justify-between gap-4 border-b border-border/60 py-[clamp(0.5rem,2vh,1.5rem)] transition-all duration-500 outline-none motion-reduce:transition-none ${
                      open
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    }`}
                  >
                    {/* Line that draws across the row on hover, focus and active */}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-px left-0 h-px w-full origin-left bg-primary transition-transform duration-500 ease-out motion-reduce:transition-none ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                      }`}
                    />

                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span
                        className={`font-mono text-sm transition-colors duration-300 ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary group-focus-visible:text-primary"
                        }`}
                      >
                        0{index + 1}
                      </span>
                      {/* Font size follows the smaller of screen width and height */}
                      <span
                        className={`text-[clamp(1.75rem,min(11vw,8vh),4.5rem)] leading-none tracking-tight transition-all duration-300 ${
                          isActive
                            ? "translate-x-2 font-semibold text-primary"
                            : "font-light text-foreground group-hover:translate-x-3 group-hover:text-primary group-focus-visible:translate-x-3 group-focus-visible:text-primary"
                        }`}
                      >
                        {label}
                      </span>
                    </div>

                    <div className="flex items-center gap-5">
                      <span
                        className={`hidden font-mono text-xs tracking-widest uppercase transition-colors duration-300 sm:block ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {hint}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className={`h-7 w-7 shrink-0 transition-all duration-300 sm:h-8 sm:w-8 ${
                          isActive
                            ? "translate-x-0 text-primary opacity-100"
                            : "-translate-x-3 text-muted-foreground opacity-0 group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:text-primary group-focus-visible:opacity-100"
                        }`}
                      />
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Side panel (large screens, only when profile data is passed) */}
          {showAside && profile && (
            <aside
              {...reveal(450)}
              className={`hidden flex-col gap-6 border-l border-border/60 pl-10 lg:flex ${reveal(450).className}`}
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Currently
              </p>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {profile.fullName}
                </p>
                {profile.title && (
                  <p className="mt-1 text-muted-foreground">{profile.title}</p>
                )}
              </div>

              {profile.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>{profile.location}</span>
                </div>
              )}

              {socials.length > 0 && (
                <div className="flex items-center gap-3">
                  {socials.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="flex h-10 w-10 items-center justify-center border border-border bg-card text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              )}
            </aside>
          )}
        </div>

        {/* Footer: shrink-0 keeps it pinned at the bottom, links can never sit on top of it */}
        <div
          {...reveal(500)}
          className={`mx-auto mt-6 flex w-full max-w-6xl shrink-0 items-center justify-between gap-4 border-t border-border/60 pt-5 ${reveal(500).className}`}
        >
          {openToWork ? (
            <div className="flex items-center gap-2.5 font-mono text-[10px] tracking-wider text-muted-foreground sm:text-xs">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AVAILABLE FOR WORK
            </div>
          ) : (
            <span />
          )}

          {/* Theme switch */}
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Dark mode"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="group flex shrink-0 items-center gap-3 focus-visible:outline-none"
          >
            <span className="hidden font-mono text-xs tracking-wider text-muted-foreground uppercase transition-colors group-hover:text-foreground sm:block">
              {isDark ? "Dark" : "Light"}
            </span>
            <span className="relative flex h-9 w-[4.25rem] items-center border border-border bg-card transition-colors group-hover:border-primary group-focus-visible:ring-2 group-focus-visible:ring-ring">
              <Sun
                aria-hidden="true"
                className="absolute left-2.5 h-4 w-4 text-muted-foreground"
              />
              <Moon
                aria-hidden="true"
                className="absolute right-2.5 h-4 w-4 text-muted-foreground"
              />
              <span
                className={`absolute top-1 left-1 flex h-6 w-8 items-center justify-center bg-primary text-primary-foreground transition-transform duration-300 motion-reduce:transition-none ${
                  isDark ? "translate-x-[1.875rem]" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <Moon className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Sun className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default MainNav
