import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Globe, MapPin, User } from "lucide-react"
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import type { PublicHomeProfile } from "@/api/publicApi"

type HeroSectionProps = {
  data: PublicHomeProfile | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

function HeroSection({ data, isLoading, error, refetch }: HeroSectionProps) {
  if (error) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center px-6">
        <ResourceError
          title="Failed to load profile"
          description="Could not retrieve the requested home profile data."
          onRetry={refetch}
        />
      </section>
    )
  }

  if (!isLoading && !data) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center px-6">
        <EmptyResource
          title="No Profile Found"
          description="There is no profile data available to display right now."
          icon={<User className="h-6 w-6" />}
        />
      </section>
    )
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-10 sm:px-8 lg:px-12">
        {isLoading ? (
          <HeroSkeleton />
        ) : (
          <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            {/* Content */}
            <div className="order-2 flex max-w-2xl flex-col items-center text-center lg:order-1 lg:items-start lg:text-left">
              {data?.openToWork && (
                <Badge
                  variant="outline"
                  className="mb-6 gap-1.5 border-emerald-600/30 bg-emerald-600/10 px-3 py-1 text-emerald-700 dark:text-emerald-400"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Open to work
                </Badge>
              )}

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  {data?.fullName}
                </h1>

                <p className="text-xl font-medium text-muted-foreground sm:text-2xl">
                  {data?.title}
                </p>
              </div>

              {data?.summary && (
                <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {data.summary}
                </p>
              )}

              {data?.location && (
                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{data.location}</span>
                </div>
              )}

              <div className="mt-8 flex items-center gap-3">
                {data?.githubUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    <a
                      href={data.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                    >
                      <GithubLogoIcon className="h-5 w-5" />
                    </a>
                  </Button>
                )}

                {data?.linkedinUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    <a
                      href={data.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                    >
                      <LinkedinLogoIcon className="h-5 w-5" />
                    </a>
                  </Button>
                )}

                {data?.websiteUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                  >
                    <a
                      href={data.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Website"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Large Profile Image */}
            <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
              {data?.avatarUrl ? (
                <div className="relative">
                  {/* Background glow / shape */}
                  <div className="[border-radius:22% 78% 23% 77% / 77% 28% 72% 23% ] absolute -inset-6 bg-muted/60 blur-3xl" />

                  {/* Border */}
                  <div className="[border-radius:22% 78% 23% 77% / 77% 28% 72% 23% ] relative overflow-hidden border border-border bg-background p-1 shadow-2xl">
                    <img
                      src={data.avatarUrl}
                      alt={data.fullName || "Profile photo"}
                      className="[border-radius:22% 78% 23% 77% / 77% 28% 72% 23% ] h-[360px] w-[320px] object-cover sm:h-[460px] sm:w-[400px] lg:h-[560px] lg:w-[470px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="[border-radius:22% 78% 23% 77% / 77% 28% 72% 23% ] flex h-[360px] w-[320px] items-center justify-center bg-muted sm:h-[460px] sm:w-[400px] lg:h-[560px] lg:w-[470px]">
                  <User className="h-20 w-20 text-muted-foreground/40" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
      {/* Content skeleton */}
      <div className="order-2 flex flex-col items-center lg:order-1 lg:items-start">
        <Skeleton className="mb-6 h-7 w-32 rounded-full" />

        <Skeleton className="h-14 w-72 sm:w-96" />

        <Skeleton className="mt-3 h-7 w-56" />

        <div className="mt-7 flex w-full max-w-xl flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-11/12" />
          <Skeleton className="h-5 w-4/5" />
        </div>

        <Skeleton className="mt-6 h-5 w-32" />

        <div className="mt-8 flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      {/* Image skeleton */}
      <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
        <Skeleton className="h-[360px] w-[320px] rounded-[2rem] sm:h-[460px] sm:w-[400px] lg:h-[560px] lg:w-[470px]" />
      </div>
    </div>
  )
}

export default HeroSection
