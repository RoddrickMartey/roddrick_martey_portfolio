import { FolderOpen } from "lucide-react"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import ProjectItem from "@/components/project-item"
import { usePublicProjects } from "@/hooks/usePublic"

function Projects() {
  const {
    data: projects,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = usePublicProjects()

  if (isLoading) {
    return <ResourceLoader message="Fetching projects" fullScreen />
  }

  if (isError) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center p-6">
        <ResourceError
          title="Failed to load projects"
          description={
            error instanceof Error
              ? error.message
              : "Could not retrieve the project collection right now."
          }
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      </section>
    )
  }

  return (
    <section className="min-h-screen w-full px-6 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 max-w-2xl animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Portfolio
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            A selection of work, experiments, and products built with care.
          </p>
        </header>

        {!projects || projects.length === 0 ? (
          <EmptyResource
            title="No projects yet"
            description="Published projects will appear here soon."
            icon={<FolderOpen className="h-6 w-6" />}
          />
        ) : (
          <div className="grid animate-in gap-6 delay-150 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
