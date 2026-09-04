import { useNavigate } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardAction,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types/project"
import { useAdminStore } from "@/store/adminStore"
import { ImageOff, ExternalLink, Pencil } from "lucide-react"
import { GithubLogoIcon } from "@phosphor-icons/react"

type Props = {
  project: Partial<Project>
}

function ProjectItem({ project }: Props) {
  const { isLoggedIn } = useAdminStore()
  const navigate = useNavigate()
  return (
    <Card className="mx-auto flex w-full max-w-sm flex-col overflow-hidden pt-0">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff
              className="h-8 w-8 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        )}
        {!project.published && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Draft
          </Badge>
        )}
      </div>

      <CardHeader>
        <CardAction>{project.featured && <Badge>Featured</Badge>}</CardAction>
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {project.summary}
        </CardDescription>
      </CardHeader>
      {project.techStack && project.techStack.length > 0 && (
        <CardContent className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map(({ tech }) => (
            <Badge key={tech.id} variant="outline" className="text-xs">
              {tech.name}
            </Badge>
          ))}
          {project.techStack.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{project.techStack.length - 4}
            </Badge>
          )}
        </CardContent>
      )}

      <CardFooter className="mt-auto flex flex-col gap-2">
        <div className="flex w-full gap-2">
          <Button
            className="flex-1"
            onClick={() => navigate(`/projects/${project.slug}`)}
          >
            View Project
          </Button>
          {project.liveUrl && (
            <Button variant="outline" size="icon">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live site"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" size="icon">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open GitHub repo"
              >
                <GithubLogoIcon className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        {isLoggedIn && (
          <Button
            onClick={() => navigate(`/007/admin/projects/edit/${project.slug}`)}
            variant="secondary"
            className="w-full"
          >
            <Pencil className="mr-2 h-4 w-4" aria-hidden="true" />
            Edit Project
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProjectItem
