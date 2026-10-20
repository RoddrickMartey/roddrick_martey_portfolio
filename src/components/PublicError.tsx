import type { HTMLAttributes } from "react"
import { RotateCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export interface PublicErrorProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onRetry?: () => void
  isRetrying?: boolean
  fullScreen?: boolean
}

function ErrorIllustration() {
  return (
    <div className="relative flex size-36 items-center justify-center">
      {/* Background Soft Red/Primary Glow */}
      <div className="absolute inset-0 rounded-full bg-destructive/10 blur-xl motion-safe:animate-pulse motion-reduce:animate-none" />

      {/* Custom Error Connections SVG */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative size-full text-destructive"
      >
        {/* Signal Rings */}
        <circle
          cx="80"
          cy="80"
          r="60"
          className="stroke-destructive/10"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <circle
          cx="80"
          cy="80"
          r="45"
          className="stroke-destructive/20"
          strokeWidth="1.5"
        />

        {/* Broken Connection Nodes */}
        <g className="text-primary">
          {/* Central Shield or Server Node */}
          <rect
            x="58"
            y="58"
            width="44"
            height="44"
            rx="12"
            className="fill-card stroke-destructive/40 shadow-lg"
            strokeWidth="2"
          />
          {/* Disconnected Plug / Lightning Bolt Icon */}
          <path
            d="M83 68 L73 82 H82 L77 94"
            className="stroke-destructive"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Connection Cables Disconnected */}
          <path
            d="M32 80 H48"
            className="stroke-destructive/40 motion-safe:animate-pulse"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 4"
          />
          <path
            d="M112 80 H128"
            className="stroke-destructive/40 motion-safe:animate-pulse"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="2 4"
          />

          {/* Warning Sparks */}
          <circle
            cx="44"
            cy="74"
            r="2"
            className="fill-destructive motion-safe:animate-ping"
          />
          <circle
            cx="116"
            cy="86"
            r="2"
            className="fill-destructive [animation-delay:300ms] motion-safe:animate-ping"
          />
        </g>
      </svg>
    </div>
  )
}

export function PublicError({
  title = "A small hiccup",
  description = "This part of the portfolio did not come through. Please give it another try.",
  onRetry,
  isRetrying = false,
  fullScreen = true,
  className,
  ...props
}: PublicErrorProps) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "grid w-full place-items-center px-5 py-12 sm:px-8",
        fullScreen ? "min-h-screen" : "min-h-64",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-lg border-destructive/20 bg-card text-center shadow-sm duration-500 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-reduce:animate-none">
        <CardHeader className="items-center gap-4 px-6 pt-8 sm:px-8 sm:pt-10">
          <ErrorIllustration />
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold sm:text-2xl">
              {title}
            </CardTitle>
            <CardDescription className="mx-auto max-w-sm text-sm leading-6 sm:text-base">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        {onRetry && (
          <CardContent className="flex justify-center px-6 pb-8 sm:px-8 sm:pb-10">
            <Button
              type="button"
              variant="outline"
              onClick={onRetry}
              disabled={isRetrying}
              aria-busy={isRetrying}
              className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <RotateCw
                aria-hidden="true"
                className={cn(
                  "size-4 motion-reduce:animate-none",
                  isRetrying && "motion-safe:animate-spin"
                )}
              />
              {isRetrying ? "Trying again..." : "Try again"}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
