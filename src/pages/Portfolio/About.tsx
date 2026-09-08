import { format } from "date-fns"
import {
  ArrowUpRight,
  Award,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  MapPin,
  Phone,
  UserRound,
} from "lucide-react"
import { Link } from "react-router-dom"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"

import { usePublicAbout } from "@/hooks/usePublic"

import { SkillBadges } from "@/components/SkillBadges"

const formatMonthYear = (date: string) => format(new Date(date), "MMM yyyy")

function About() {
  const { data, isLoading, isError, error, refetch, isRefetching } =
    usePublicAbout()

  if (isLoading) {
    return <ResourceLoader message="Fetching profile" fullScreen />
  }

  if (isError) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center p-6">
        <ResourceError
          title="Failed to load about page"
          description={
            error instanceof Error
              ? error.message
              : "Could not retrieve the professional profile right now."
          }
          onRetry={refetch}
          isRetrying={isRefetching}
        />
      </section>
    )
  }

  if (!data) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center p-6">
        <EmptyResource
          title="Profile unavailable"
          description="The professional profile has not been published yet."
          icon={<UserRound className="h-6 w-6" />}
        />
      </section>
    )
  }

  const timelineItems = [
    ...data.experiences.map((item) => ({
      kind: "Experience",
      icon: BriefcaseBusiness,
      title: item.role,
      organization: item.organization,
      details: [item.employmentType, item.location].filter(Boolean).join(" · "),
      dates: `${formatMonthYear(item.startDate)} - ${item.endDate ? formatMonthYear(item.endDate) : "Present"}`,
      description: item.description,
      bullets: item.bullets,
    })),
    ...data.education.map((item) => ({
      kind: "Education",
      icon: GraduationCap,
      title: item.degree,
      organization: item.institution,
      details: item.location ?? "",
      dates: `${formatMonthYear(item.startDate)} - ${item.endDate ? formatMonthYear(item.endDate) : "Present"}`,
      description: item.description,
      bullets: [],
    })),
  ]

  const socialLinks = [
    { label: "LinkedIn", href: data.profile.linkedinUrl },
    { label: "GitHub", href: data.profile.githubUrl },
    { label: "Website", href: data.profile.websiteUrl },
  ].filter((item): item is { label: string; href: string } =>
    Boolean(item.href)
  )

  const resumeDownloadUrl = `${import.meta.env.VITE_API_BASE_URL}/public/resume/download`

  return (
    <main className="relative min-h-screen w-full overflow-hidden px-6 py-28 sm:px-8 lg:px-12">
      {/* Background Layer: Covers top hero area, blurred, with soft fade out at the bottom */}
      <div
        aria-hidden="true"
        className="mask-image-[linear-gradient(to_bottom,black_60%,transparent_100%)] pointer-events-none absolute inset-x-0 top-0 -z-10 h-full bg-cover bg-top bg-no-repeat opacity-40"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dtehqyxpu/image/upload/v1788823196/ee8fffdb969d0ef7e2cb8770bd174b6d_suyn98.png')",
        }}
      />

      <div className="mx-auto max-w-7xl space-y-24">
        <header className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div className="animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <p className="mb-3 text-sm font-medium tracking-[0.18em] text-primary uppercase">
              About me
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
              The person behind the work.
            </h1>
          </div>
          <div className="max-w-2xl animate-in delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none lg:justify-self-end">
            <p className="text-xl leading-8 text-muted-foreground">
              {data.profile.summary}
            </p>
            {data.profile.location && (
              <p className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {data.profile.location}
                {data.profile.nationality && ` · ${data.profile.nationality}`}
              </p>
            )}
            {data.profile.phone && (
              <a
                href={`tel:${data.profile.phone}`}
                className="mt-3 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                {data.profile.phone}
              </a>
            )}
            {data.profile.resumeUrl && (
              <a
                href={resumeDownloadUrl}
                className="mt-6 inline-flex items-center border border-border bg-secondary px-3 py-2 text-sm font-medium transition-colors hover:border-primary hover:bg-muted"
              >
                <Download className="mr-2 h-4 w-4" />
                Download resume
              </a>
            )}
          </div>
        </header>

        <section className="grid gap-8 border-y border-border py-10 md:grid-cols-3">
          {[
            { label: "Role", value: data.profile.title },
            {
              label: "Location",
              value: data.profile.location ?? "Available remotely",
            },
            {
              label: "Availability",
              value: data.profile.openToWork
                ? "Open to opportunities"
                : "Currently focused",
            },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {item.label}
              </p>
              <p className="mt-2 font-medium">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
              Experience & education
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              A career built through practice.
            </h2>
          </div>
          <div className="animate-in space-y-10 delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none">
            {timelineItems.length === 0 ? (
              <p className="text-muted-foreground">
                No timeline entries published yet.
              </p>
            ) : (
              timelineItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <article
                    key={`${item.kind}-${item.title}-${index}`}
                    className="relative border-l border-border pl-8"
                  >
                    <div className="absolute top-0 -left-4 flex h-8 w-8 items-center justify-center border border-border bg-background text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <p className="text-xs font-medium tracking-[0.14em] text-primary uppercase">
                          {item.kind}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.organization}
                        </p>
                      </div>
                      <time className="text-sm text-muted-foreground">
                        {item.dates}
                      </time>
                    </div>
                    {item.details && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {item.details}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-4 leading-7 text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                    {item.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
                        {item.bullets.map((bullet) => (
                          <li key={bullet}>• {bullet}</li>
                        ))}
                      </ul>
                    )}
                  </article>
                )
              })
            )}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
              Skills
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              What I bring to a team.
            </h2>
          </div>
          <div className="grid animate-in gap-6 delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none sm:grid-cols-2">
            {data.skillCategories.map((category) => (
              <article
                key={category.name}
                className="border border-border bg-background/80 p-5 backdrop-blur-xs"
              >
                <h3 className="font-semibold">{category.name}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    return <SkillBadges key={skill.name} skill={skill} />
                  })}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 border-t border-border pt-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div className="animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <p className="text-sm font-medium tracking-[0.18em] text-primary uppercase">
              Credentials
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Selected certifications.
            </h2>
          </div>
          <div className="grid animate-in gap-4 delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none sm:grid-cols-2">
            {data.certifications.map((item) => (
              <article
                key={`${item.name}-${item.issuer}`}
                className="border border-border bg-background/80 p-5 backdrop-blur-xs"
              >
                <Award className="h-5 w-5 text-primary" />
                <h3 className="mt-4 font-semibold">{item.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.issuer}
                  {item.platform && ` · ${item.platform}`}
                </p>
                {item.dateEarned && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    {format(new Date(item.dateEarned), "MMM d, yyyy")}
                  </p>
                )}
                {item.verifyUrl && (
                  <a
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Verify credential <ArrowUpRight className="ml-1 h-4 w-4" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {socialLinks.length > 0 && (
          <footer className="flex flex-wrap gap-4 border-t border-border pt-8">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {item.label} <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            ))}
            <Link
              to="/contact"
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Start a conversation <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </footer>
        )}
      </div>
    </main>
  )
}

export default About
