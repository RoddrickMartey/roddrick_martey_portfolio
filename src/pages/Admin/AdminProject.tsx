import { useNavigate } from "react-router-dom"
import { useProjects } from "@/hooks/useProjects"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { EmptyResource } from "@/components/empty-component"
import ProjectItem from "@/components/project-item"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

function AdminProject() {
  const navigate = useNavigate()

  const {
    data: projects,
    isFetched,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useProjects()

  // 1. Loading State
  if (isLoading && !isFetched) {
    return <ResourceLoader message="Fetching projects..." fullScreen />
  }

  // 2. Error State
  if (isError) {
    console.error("Error fetching projects:", error)
    return (
      <ResourceError
        title="Failed to load projects"
        description="An unexpected error occurred while fetching your projects. Please try again."
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  // 3. Empty State (No projects returned or empty array)
  if (!projects || projects.length === 0) {
    return (
      <section className="flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
        <EmptyResource
          title="No Projects Found"
          description="You haven't created any projects yet. Get started by adding your first project."
          actionLabel="Create Project"
          actionLink="/007/admin/projects/create"
        />
      </section>
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="text-sm text-muted-foreground">
            {projects.length} {projects.length === 1 ? "project" : "projects"}{" "}
            in your portfolio
          </p>
        </div>
        <Button onClick={() => navigate("/007/admin/projects/create")}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          New project
        </Button>
      </div>

      <section
        id="admin-project-list"
        className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectItem project={project} key={project.id} />
        ))}
      </section>
    </section>
  )
}

export default AdminProject
