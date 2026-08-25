import React from "react"
import { AlertTriangle, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ResourceErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  onRetry?: () => void
  isRetrying?: boolean
}

export function ResourceError({
  title = "Failed to load resource",
  description = "An unexpected error occurred while fetching data. Please try again.",
  onRetry,
  isRetrying = false,
  className,
  ...props
}: ResourceErrorProps) {
  return (
    <div
      className={cn(
        "flex min-h-75 w-full items-center justify-center p-4",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-md border-destructive/20 bg-destructive/5 text-center shadow-sm">
        <CardHeader className="pb-2">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        {onRetry && (
          <CardFooter className="justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              disabled={isRetrying}
              className="gap-2 border-destructive/30 hover:bg-destructive/10"
            >
              <RotateCcw
                className={cn("h-4 w-4", isRetrying && "animate-spin")}
              />
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
