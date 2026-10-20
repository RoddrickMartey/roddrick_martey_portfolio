import type { HTMLAttributes, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

type PublicEmptyAction =
  | { label: string; onClick: () => void; href?: never }
  | { label: string; href: string; onClick?: never }

export interface PublicEmptyProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  icon?: ReactNode
  action?: PublicEmptyAction
  fullScreen?: boolean
}

function EmptyIllustration() {
  return (
    <div className="relative flex size-36 items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl motion-safe:animate-pulse motion-reduce:animate-none" />

      {/* Custom Empty Box SVG */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative size-full text-primary"
      >
        {/* Floating Sparkles / Particles */}
        <circle
          cx="28"
          cy="40"
          r="3"
          fill="currentColor"
          className="opacity-40 [animation-duration:3s] motion-safe:animate-bounce"
        />
        <circle
          cx="132"
          cy="48"
          r="2"
          fill="currentColor"
          className="opacity-60 motion-safe:animate-pulse"
        />
        <circle
          cx="120"
          cy="115"
          r="3.5"
          fill="currentColor"
          className="opacity-30 [animation-duration:2.5s] motion-safe:animate-bounce"
        />

        {/* Ambient Ring */}
        <ellipse
          cx="80"
          cy="125"
          rx="45"
          ry="10"
          className="fill-primary/10 stroke-primary/20"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Empty Box Base */}
        <g className="duration-700 motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in">
          {/* Back Wall */}
          <path
            d="M45 65 L80 48 L115 65 L115 95 L80 112 L45 95 Z"
            className="fill-primary/5 stroke-primary/30"
            strokeWidth="1.5"
          />
          {/* Internal Flaps */}
          <path
            d="M45 65 L80 82 L115 65"
            className="stroke-primary/40"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M80 82 L80 112"
            className="stroke-primary/40"
            strokeWidth="1.5"
          />

          {/* Floating Empty Card Tag inside */}
          <g className="motion-safe:animate-[bounce_4s_ease-in-out_infinite]">
            <rect
              x="62"
              y="38"
              width="36"
              height="24"
              rx="4"
              className="fill-card stroke-primary/60 shadow-md"
              strokeWidth="1.5"
            />
            <line
              x1="70"
              y1="46"
              x2="84"
              y2="46"
              className="stroke-primary/60"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="70"
              y1="52"
              x2="90"
              y2="52"
              className="stroke-primary/30"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

export function PublicEmpty({
  title = "A little space for what is next",
  description = "There is nothing to show here just yet. Check back soon for new work.",
  icon,
  action,
  fullScreen = true,
  className,
  ...props
}: PublicEmptyProps) {
  return (
    <div
      className={cn(
        "grid w-full place-items-center px-5 py-12 sm:px-8",
        fullScreen ? "min-h-screen" : "min-h-64",
        className
      )}
      {...props}
    >
      <Card className="relative w-full max-w-lg overflow-hidden border-border bg-card text-center shadow-sm duration-500 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-reduce:animate-none">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-primary/40"
        />
        <CardHeader className="items-center gap-4 px-6 pt-8 sm:px-8 sm:pt-10">
          <div className="relative flex items-center justify-center">
            {icon ?? <EmptyIllustration />}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl font-semibold sm:text-2xl">
              {title}
            </CardTitle>
            <CardDescription className="mx-auto max-w-sm text-sm leading-6 sm:text-base">
              {description}
            </CardDescription>
          </div>
        </CardHeader>
        {action && (
          <CardContent className="flex justify-center px-6 pb-8 sm:px-8 sm:pb-10">
            {action.href ? (
              <Link
                to={action.href}
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                )}
              >
                {action.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            ) : (
              <Button
                type="button"
                variant="outline"
                onClick={action.onClick}
                className="gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {action.label}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Button>
            )}
          </CardContent>
        )}
      </Card>
    </div>
  )
}
