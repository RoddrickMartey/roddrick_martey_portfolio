import { type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { FolderPlus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

interface EmptyResourceProps {
  title?: string
  description?: string
  actionLabel?: string
  actionLink?: string
  icon?: ReactNode
  onAction?: () => void
}

export function EmptyResource({
  title = "No Projects Yet",
  description = "You haven't created any projects yet. Get started by creating your first project.",
  actionLabel = "Create Project",
  actionLink,
  icon,
  onAction,
}: EmptyResourceProps) {
  const navigate = useNavigate()

  const handleAction = () => {
    if (onAction) {
      onAction()
    } else if (actionLink) {
      navigate(actionLink)
    }
  }

  return (
    <Empty className="">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="rounded-full bg-primary/10 p-3 text-primary"
        >
          {icon ?? <FolderPlus className="h-6 w-6" />}
        </EmptyMedia>
        <EmptyTitle className="text-lg font-semibold tracking-tight">
          {title}
        </EmptyTitle>
        <EmptyDescription className="max-w-sm text-sm text-muted-foreground">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {(actionLink || onAction) && (
        <EmptyContent className="flex justify-center pt-2">
          <Button onClick={handleAction} size="sm" className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            {actionLabel}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  )
}
