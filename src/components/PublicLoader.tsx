import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

export interface PublicLoaderProps extends HTMLAttributes<HTMLDivElement> {
  message?: string
  fullScreen?: boolean
}

function LoaderIllustration() {
  return (
    <div className="relative flex size-32 items-center justify-center">
      {/* Glow Backing */}
      <div className="absolute inset-2 rounded-full bg-primary/15 blur-lg motion-safe:animate-pulse motion-reduce:animate-none" />

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative size-full text-primary"
      >
        {/* Outer Rotating Dash Ring */}
        <circle
          cx="60"
          cy="60"
          r="52"
          className="stroke-primary/20 motion-safe:animate-[spin_10s_linear_infinite]"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />

        {/* Orbit Path 1 */}
        <ellipse
          cx="60"
          cy="60"
          rx="42"
          ry="16"
          className="stroke-primary/40 motion-safe:animate-[spin_6s_linear_infinite]"
          strokeWidth="1.5"
          transform="rotate(-30 60 60)"
        />

        {/* Orbit Path 2 */}
        <ellipse
          cx="60"
          cy="60"
          rx="42"
          ry="16"
          className="stroke-primary/60 motion-safe:animate-[spin_4s_linear_infinite_reverse]"
          strokeWidth="1.5"
          transform="rotate(30 60 60)"
        />

        {/* Orbiting Satellite Node */}
        <g className="motion-safe:animate-[spin_3s_linear_infinite]">
          <circle cx="60" cy="18" r="4" className="fill-primary shadow-sm" />
          <circle
            cx="60"
            cy="18"
            r="7"
            className="stroke-primary/30"
            strokeWidth="1"
          />
        </g>

        {/* Glowing Center Core */}
        <circle
          cx="60"
          cy="60"
          r="10"
          className="fill-primary/20 stroke-primary"
          strokeWidth="2"
        />
        <circle
          cx="60"
          cy="60"
          r="4"
          className="fill-primary [animation-duration:2s] motion-safe:animate-ping"
        />
      </svg>
    </div>
  )
}

export function PublicLoader({
  message = "Just a moment...",
  fullScreen = true,
  className,
  ...props
}: PublicLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-12 text-center",
        fullScreen ? "min-h-screen" : "min-h-48",
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center gap-6 duration-500 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-reduce:animate-none">
        <LoaderIllustration />

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground sm:text-base">
            {message}
          </p>
          <div
            aria-hidden="true"
            className="mx-auto flex h-1.5 w-24 items-center justify-center gap-1.5 overflow-hidden rounded-full bg-primary/10 p-0.5"
          >
            <span className="h-full w-1/3 rounded-full bg-primary/40 motion-safe:animate-pulse motion-reduce:animate-none" />
            <span className="h-full w-1/3 rounded-full bg-primary/70 [animation-delay:200ms] motion-safe:animate-pulse motion-reduce:animate-none" />
            <span className="h-full w-1/3 rounded-full bg-primary [animation-delay:400ms] motion-safe:animate-pulse motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  )
}
