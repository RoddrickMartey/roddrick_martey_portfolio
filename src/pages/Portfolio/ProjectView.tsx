import { useParams, useNavigate } from "react-router-dom"
import { useProject } from "@/hooks/useProjects"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { EmptyResource } from "@/components/empty-component"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Calendar,
  Layers,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Pencil,
} from "lucide-react"
import { useAdminStore } from "@/store/adminStore"

function ProjectView() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { isLoggedIn } = useAdminStore()

  // Always call hooks unconditionally at the top level
  const {
    data: project,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useProject(slug ?? "")

  // 1. Guard against missing URL param
  if (!slug) {
    return (
      <ResourceError
        title="Invalid Route"
        description="No project identifier was provided in the URL."
      />
    )
  }

  // 2. Initial Loading State
  if (isLoading && !project) {
    return <ResourceLoader message="Fetching project details..." fullScreen />
  }

  // 3. Fetch Error State
  if (isError && !project) {
    console.error("Error fetching project:", error)
    return (
      <ResourceError
        title="Failed to load project"
        description="An unexpected error occurred while fetching the project details. Please try again."
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  // 4. Missing Project State
  if (!project) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
        <EmptyResource
          title="Project Not Found"
          description="The requested project could not be found or has been removed."
          actionLabel="Back to Projects"
          actionLink="/projects"
        />
      </section>
    )
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      year: "numeric",
    }
  )

  return (
    <section className="min-h-screen w-full">
      <article className="mx-auto min-h-screen w-full max-w-5xl space-y-8 p-4 sm:p-6">
        {/* Navigation & Action Bar */}
        <div className="flex animate-in flex-wrap items-center justify-between gap-4 duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="flex w-full flex-wrap justify-end gap-2 sm:w-auto">
            {project.liveUrl && (
              <Button
                size="sm"
                variant="default"
                onClick={() =>
                  window.open(project.liveUrl!, "_blank", "noopener,noreferrer")
                }
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}

            {project.githubUrl && (
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  window.open(
                    project.githubUrl!,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="flex items-center gap-2"
              >
                <Code2 className="h-4 w-4" />
                Repository
              </Button>
            )}
            {isLoggedIn && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  navigate(`/007/admin/projects/edit/${project.slug}`)
                }
                className="flex items-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            )}
          </div>
        </div>

        {/* Header Info */}
        <div className="animate-in space-y-4 delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none">
          <div className="flex flex-wrap items-center gap-2">
            {project.featured && <Badge variant="default">Featured</Badge>}
            <Badge variant={project.published ? "secondary" : "destructive"}>
              {project.published ? "Published" : "Draft"}
            </Badge>
            <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>

        {/* Cover Image */}
        {project.imageUrl && (
          <div className="animate-in overflow-hidden border bg-muted delay-150 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none">
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="max-h-120 w-full object-cover"
            />
          </div>
        )}

        {/* Tech Stack List */}
        {project.techStack.length > 0 && (
          <Card className="animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Layers className="h-5 w-5 text-primary" />
                Technologies Used
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {project.techStack.map(({ techId, tech, description }) => (
                  <div key={techId} className="space-y-1 border bg-card/50 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{tech.name}</span>
                    </div>
                    {(description || tech.description) && (
                      <p className="text-xs text-muted-foreground">
                        {description || tech.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Case Study Narrative Sections */}
        {(project.problem ||
          project.approach ||
          project.challenge ||
          project.outcome) && (
          <div className="animate-in space-y-6 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none">
            <Separator />
            <h2 className="text-2xl font-semibold tracking-tight">
              Case Study Breakdown
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {project.problem && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-destructive">
                      <HelpCircle className="h-4 w-4" />
                      The Problem
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {project.problem}
                    </p>
                  </CardContent>
                </Card>
              )}

              {project.approach && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-blue-500">
                      <Lightbulb className="h-4 w-4" />
                      The Approach
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {project.approach}
                    </p>
                  </CardContent>
                </Card>
              )}

              {project.challenge && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-amber-500">
                      <AlertTriangle className="h-4 w-4" />
                      Key Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {project.challenge}
                    </p>
                  </CardContent>
                </Card>
              )}

              {project.outcome && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" />
                      The Outcome
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                      {project.outcome}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </article>
    </section>
  )
}

export default ProjectView
