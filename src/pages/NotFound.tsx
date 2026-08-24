import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

function NotFound() {
  const navigate = useNavigate()
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background p-4 text-center">
      {/* Background Subtle Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-87.5 w-87.5 -translate-x-1/2 -translate-y-1/2 animate-in rounded-full bg-primary/10 blur-[100px] duration-1000 fade-in"
      />

      {/* Decorative floating dots */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 animate-in duration-1000 fade-in"
      >
        <span className="absolute top-[20%] left-[15%] h-2 w-2 rounded-full bg-primary/30" />
        <span className="absolute top-[30%] right-[18%] h-1.5 w-1.5 rounded-full bg-primary/20" />
        <span className="absolute bottom-[25%] left-[20%] h-1 w-1 rounded-full bg-primary/25" />
        <span className="absolute right-[15%] bottom-[35%] h-2 w-2 rounded-full bg-primary/20" />
      </div>

      {/* Main SVG Illustration */}
      <div className="mb-6 animate-in duration-500 zoom-in-50 fade-in">
        <svg
          width="180"
          height="140"
          viewBox="0 0 180 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Lost signpost illustration"
        >
          {/* Ground shadow */}
          <ellipse
            cx="90"
            cy="128"
            rx="55"
            ry="6"
            className="fill-foreground/5"
          />

          {/* Signpost pole */}
          <rect
            x="86"
            y="40"
            width="8"
            height="88"
            rx="4"
            className="fill-muted-foreground/30"
          />

          {/* Sign 1 - tilted left */}
          <g transform="rotate(-8 60 55)">
            <rect
              x="20"
              y="45"
              width="80"
              height="22"
              rx="4"
              className="fill-card stroke-border"
              strokeWidth="1.5"
            />
            <text
              x="60"
              y="60"
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] font-medium"
            >
              HOME
            </text>
          </g>

          {/* Sign 2 - tilted right */}
          <g transform="rotate(6 120 78)">
            <rect
              x="80"
              y="68"
              width="80"
              height="22"
              rx="4"
              className="fill-card stroke-border"
              strokeWidth="1.5"
            />
            <text
              x="120"
              y="83"
              textAnchor="middle"
              className="fill-muted-foreground text-[10px] font-medium"
            >
              ???
            </text>
          </g>

          {/* Question mark bubble */}
          <circle
            cx="90"
            cy="22"
            r="16"
            className="fill-primary/10 stroke-primary/40"
            strokeWidth="1.5"
          />
          <text
            x="90"
            y="28"
            textAnchor="middle"
            className="fill-primary text-lg font-bold"
          >
            ?
          </text>
        </svg>
      </div>

      {/* Error Code Hero Display */}
      <h1 className="animate-in text-7xl font-extrabold tracking-tight text-foreground/90 duration-500 fade-in slide-in-from-bottom-4 sm:text-9xl">
        404
      </h1>

      {/* Primary Message */}
      <h2 className="mt-4 animate-in text-2xl font-bold tracking-tight text-foreground delay-150 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 sm:text-3xl">
        Page not found
      </h2>

      {/* Subtext Context */}
      <p className="mt-2 max-w-md animate-in text-sm text-muted-foreground delay-300 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 sm:text-base">
        Sorry, the page you are looking for doesn't exist, has been removed, or
        was moved to a new address.
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex animate-in flex-col items-center gap-3 delay-450 duration-500 fill-mode-both fade-in slide-in-from-bottom-4 sm:flex-row">
        <Button size="lg" className="gap-2" onClick={() => navigate("/")}>
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Go Back
        </Button>
      </div>
    </main>
  )
}

export default NotFound
