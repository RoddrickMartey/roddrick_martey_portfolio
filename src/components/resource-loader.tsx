import React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResourceLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string
  fullScreen?: boolean
}

export function ResourceLoader({
  message = "Loading resource...",
  fullScreen = false,
  className,
  ...props
}: ResourceLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-8 text-center text-muted-foreground",
        fullScreen ? "min-h-screen w-full" : "min-h-62.5 w-full",
        className
      )}
      {...props}
    >
      <div className="relative flex h-10 w-10 items-center justify-center">
        {/* Subtle background ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        {/* Active spinner */}
        <Loader2
          className="h-6 w-6 animate-spin text-primary"
          aria-hidden="true"
        />
      </div>
      <p className="animate-pulse text-sm font-medium tracking-wide">
        {message}
      </p>
      <span className="sr-only">{message}</span>
    </div>
  )
}
