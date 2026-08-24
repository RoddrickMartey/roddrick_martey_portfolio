import { useDashboard } from "@/hooks/useDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { formatDistanceToNow } from "date-fns"
import {
  FolderGit2,
  Star,
  Wrench,
  Briefcase,
  Award,
  GraduationCap,
  Cpu,
  Mail,
  AlertTriangle,
} from "lucide-react"
import { Link } from "react-router-dom"

function AdminHome() {
  const { data, isLoading, isError, error } = useDashboard()

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Failed to load dashboard</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    )
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
        <AlertTriangle className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">No dashboard data available</p>
        <p className="text-sm text-muted-foreground">
          Try refreshing the page, or check your connection.
        </p>
      </div>
    )
  }

  const { counts, recentMessages, recentProjects, profileStatus } = data
  console.log(data)

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your portfolio content
        </p>
      </div>

      {/* Profile completeness alert */}
      {profileStatus.exists && !profileStatus.isComplete && (
        <Alert className="w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Your profile is incomplete</AlertTitle>
          <AlertDescription>
            Missing: {profileStatus.missingFields.join(", ")}.{" "}
            <Link
              to="/007/admin/profile"
              className="underline underline-offset-2"
            >
              Complete it now
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {!profileStatus.exists && (
        <Alert variant="destructive" className="w-full">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>No profile found</AlertTitle>
          <AlertDescription>
            Your profile hasn't been set up yet.{" "}
            <Link
              to="/007/admin/profile"
              className="underline underline-offset-2"
            >
              Set it up
            </Link>
          </AlertDescription>
        </Alert>
      )}

      {/* Metric cards */}
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <MetricCard
          icon={<FolderGit2 className="h-4 w-4" />}
          label="Projects"
          value={counts.projects}
          sublabel={`${counts.publishedProjects} published`}
        />
        <MetricCard
          icon={<Star className="h-4 w-4" />}
          label="Featured"
          value={counts.featuredProjects}
        />
        <MetricCard
          icon={<Wrench className="h-4 w-4" />}
          label="Skills"
          value={counts.skills}
          sublabel={`${counts.skillCategories} categories`}
        />
        <MetricCard
          icon={<Cpu className="h-4 w-4" />}
          label="Tech"
          value={counts.tech}
        />
        <MetricCard
          icon={<Briefcase className="h-4 w-4" />}
          label="Experience"
          value={counts.experiences}
        />
        <MetricCard
          icon={<Award className="h-4 w-4" />}
          label="Certifications"
          value={counts.certifications}
        />
        <MetricCard
          icon={<GraduationCap className="h-4 w-4" />}
          label="Education"
          value={counts.education}
        />
        <MetricCard
          icon={<Mail className="h-4 w-4" />}
          label="Messages"
          value={counts.totalMessages}
          sublabel={
            counts.unreadMessages > 0
              ? `${counts.unreadMessages} unread`
              : "All read"
          }
          highlight={counts.unreadMessages > 0}
        />
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        {/* Recent projects */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">
              Recently updated projects
            </CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-3">
            {recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet.</p>
            ) : (
              recentProjects.map((project, i) => (
                <div key={project.id} className="w-full">
                  <Link
                    to={`/007/projects/${project.id}`}
                    className="flex w-full items-center justify-between text-sm hover:underline"
                  >
                    <span className="truncate">{project.title}</span>
                    <div className="flex shrink-0 items-center gap-2">
                      {!project.published && (
                        <Badge variant="secondary" className="text-xs">
                          Draft
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(project.updatedAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </Link>
                  {i < recentProjects.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Recent messages */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">Recent messages</CardTitle>
          </CardHeader>
          <CardContent className="w-full space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              recentMessages.map((msg, i) => (
                <div key={msg.id} className="w-full">
                  <Link
                    to="/007/messages"
                    className="block w-full text-sm hover:underline"
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate font-medium">{msg.name}</span>
                      <div className="flex shrink-0 items-center gap-2">
                        {!msg.read && <Badge className="text-xs">New</Badge>}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(msg.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {msg.subject || msg.message}
                    </p>
                  </Link>
                  {i < recentMessages.length - 1 && (
                    <Separator className="mt-3" />
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

function MetricCard({
  icon,
  label,
  value,
  sublabel,
  highlight,
}: {
  icon: React.ReactNode
  label: string
  value: number
  sublabel?: string
  highlight?: boolean
}) {
  return (
    <Card className={highlight ? "border-primary/50" : undefined}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-medium">{label}</span>
          {icon}
        </div>
        <p className="mt-2 text-2xl font-semibold">{value}</p>
        {sublabel && (
          <p className="text-xs text-muted-foreground">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <section className="space-y-6">
      <Skeleton className="h-8 w-40" />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    </section>
  )
}

export default AdminHome
