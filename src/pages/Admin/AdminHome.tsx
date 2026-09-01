import { useDashboard } from "@/hooks/useDashboard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  ArrowRight,
  Sparkles,
  CircleAlert,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

function AdminHome() {
  const { data, isLoading, isError, error } = useDashboard()
  const navigate = useNavigate()

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

  const metricCards = [
    {
      label: "Projects",
      value: counts.projects,
      sublabel: `${counts.publishedProjects} published`,
      icon: <FolderGit2 className="h-4 w-4 text-sky-500" />,
      accent: "from-sky-500/10 via-sky-500/5 to-transparent",
    },
    {
      label: "Featured",
      value: counts.featuredProjects,
      icon: <Star className="h-4 w-4 text-orange-500" />,
      accent: "from-orange-500/10 via-orange-500/5 to-transparent",
    },
    {
      label: "Skills",
      value: counts.skills,
      sublabel: `${counts.skillCategories} categories`,
      icon: <Wrench className="h-4 w-4 text-violet-500" />,
      accent: "from-violet-500/10 via-violet-500/5 to-transparent",
    },
    {
      label: "Tech",
      value: counts.tech,
      icon: <Cpu className="h-4 w-4 text-cyan-500" />,
      accent: "from-cyan-500/10 via-cyan-500/5 to-transparent",
    },
    {
      label: "Experience",
      value: counts.experiences,
      icon: <Briefcase className="h-4 w-4 text-emerald-500" />,
      accent: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    },
    {
      label: "Certifications",
      value: counts.certifications,
      icon: <Award className="h-4 w-4 text-yellow-500" />,
      accent: "from-yellow-500/10 via-yellow-500/5 to-transparent",
    },
    {
      label: "Education",
      value: counts.education,
      icon: <GraduationCap className="h-4 w-4 text-pink-500" />,
      accent: "from-pink-500/10 via-pink-500/5 to-transparent",
    },
    {
      label: "Messages",
      value: counts.totalMessages,
      sublabel:
        counts.unreadMessages > 0
          ? `${counts.unreadMessages} unread`
          : "All read",
      icon: <Mail className="h-4 w-4 text-rose-500" />,
      accent: "from-rose-500/10 via-rose-500/5 to-transparent",
      highlight: counts.unreadMessages > 0,
    },
  ]

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-linear-to-br from-primary/10 via-background to-background shadow-sm">
        <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Portfolio overview
            </div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep your portfolio fresh, visible, and conversion-ready.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/007/admin/profile")}
            >
              Edit profile
            </Button>
            <Button onClick={() => navigate("/007/admin/projects/create")}>
              New project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {profileStatus.exists && !profileStatus.isComplete && (
        <Alert className="w-full border-amber-500/30 bg-amber-500/5">
          <CircleAlert className="h-4 w-4 text-amber-600" />
          <AlertTitle>Your profile is incomplete</AlertTitle>
          <AlertDescription>
            Missing: {profileStatus.missingFields.join(", ")}.{" "}
            <Link
              to="/007/admin/profile"
              className="font-medium underline underline-offset-2"
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
              className="font-medium underline underline-offset-2"
            >
              Set it up
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {metricCards.map((card) => (
          <MetricCard
            key={card.label}
            icon={card.icon}
            label={card.label}
            value={card.value}
            sublabel={card.sublabel}
            highlight={card.highlight}
            accent={card.accent}
          />
        ))}
      </div>

      <div className="grid w-full gap-4 md:grid-cols-2">
        <Card className="w-full border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">
                Recently updated projects
              </CardTitle>
              <Badge
                variant="secondary"
                className="rounded-full px-2 py-0.5 text-[10px] tracking-wide uppercase"
              >
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="w-full space-y-3">
            {recentProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet.</p>
            ) : (
              recentProjects.map((project, i) => (
                <div key={project.id} className="w-full">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{project.title}</p>
                      <p className="text-[11px] text-muted-foreground">
                        {project.published ? "Published" : "Draft"}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {!project.published && (
                        <Badge variant="secondary" className="text-[10px]">
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

        <Card className="w-full border-border/80 bg-card/80 shadow-sm backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-3">
              <CardTitle className="text-base">Recent messages</CardTitle>
              {counts.unreadMessages > 0 && (
                <Badge className="rounded-full bg-rose-500/10 text-rose-600 hover:bg-rose-500/15">
                  {counts.unreadMessages} unread
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="w-full space-y-3">
            {recentMessages.length === 0 ? (
              <p className="text-sm text-muted-foreground">No messages yet.</p>
            ) : (
              recentMessages.map((msg, i) => (
                <div key={msg.id} className="w-full">
                  <Link
                    to="/007/admin/messages"
                    className="block w-full rounded-md px-2 py-2 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate font-medium">{msg.name}</span>
                      <div className="flex shrink-0 items-center gap-2">
                        {!msg.read && (
                          <Badge className="text-[10px]">New</Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(msg.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
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
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: number
  sublabel?: string
  highlight?: boolean
  accent?: string
}) {
  return (
    <Card
      className={[
        "group relative overflow-hidden border-border/80 bg-card/90 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
        highlight ? "border-primary/40" : "",
      ].join(" ")}
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${accent ?? "from-primary/5 via-transparent to-transparent"}`}
      />
      <CardContent className="relative p-4">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-xs font-medium tracking-wide uppercase">
            {label}
          </span>
          <div className="rounded-md bg-background/80 p-2 shadow-sm">
            {icon}
          </div>
        </div>
        <p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p>
        {sublabel && (
          <p className="mt-1 text-xs text-muted-foreground">{sublabel}</p>
        )}
      </CardContent>
    </Card>
  )
}

function DashboardSkeleton() {
  return (
    <section className="space-y-6 p-3">
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
