import type { PublicHomeProject } from "@/api/publicApi"
import { Link } from "react-router-dom"
import { ArrowUpRight, FolderOpen } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import ProjectItem from "@/components/project-item"

type ProjectsPublicSectionProps = {
  projects: PublicHomeProject[]

  isLoading: boolean
  error: Error | null
  refetch: () => void
}

function ProjectsPublicSection({
  projects,
  isLoading,
  error,
  refetch,
}: ProjectsPublicSectionProps) {
  if (error) {
    return (
      <section className="w-full border-t border-border px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ResourceError
            title="Failed to load projects"
            description="Could not retrieve featured projects right now."
            onRetry={refetch}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full border-t border-border px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
              Selected work
            </p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Projects I am proud of
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex h-8 items-center justify-center border border-border bg-background px-2.5 text-xs font-medium transition-colors hover:bg-muted"
          >
            View all projects
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="space-y-4 border border-border p-4">
                <Skeleton className="aspect-16/10 w-full" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <EmptyResource
            title="No featured projects yet"
            description="Featured work will appear here as it is published."
            icon={<FolderOpen className="h-6 w-6" />}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ProjectsPublicSection
