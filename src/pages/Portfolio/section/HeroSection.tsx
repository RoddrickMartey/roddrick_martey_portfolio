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

const BLOB_OUTER = "rounded-[22%_78%_23%_77%/_77%_28%_72%_23%]"
const BLOB_INNER = "rounded-[20%_78%_20%_78%/_78%_20%_78%_20%]"

/* One size definition, shared by the portrait, the fallback and the skeleton */
const PORTRAIT_WIDTH =
  "w-56 min-[400px]:w-64 sm:w-80 lg:w-full lg:max-w-104 xl:max-w-120"

function HeroSection({ data, isLoading, error, refetch }: HeroSectionProps) {
  const shouldShowSkeleton = isLoading && !data

  if (error && !data) {
    return (
      <section className="flex min-h-svh w-full items-center justify-center px-6">
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
      <section className="flex min-h-svh w-full items-center justify-center px-6">
        <EmptyResource
          title="No Profile Found"
          description="There is no profile data available to display right now."
          icon={<User className="h-6 w-6" />}
        />
      </section>
    )
  }

  const socialLinks = [
    { href: data?.githubUrl, label: "GitHub", Icon: GithubLogoIcon },
    { href: data?.linkedinUrl, label: "LinkedIn", Icon: LinkedinLogoIcon },
    { href: data?.websiteUrl, label: "Website", Icon: Globe },
  ].filter((s) => Boolean(s.href))

  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dtehqyxpu/image/upload/v1788810007/bg_qypdbs.png')",
      }}
    >
      {/* Overlay to keep foreground content legible over the wallpaper */}
      <div className="absolute inset-0 bg-background/50 dark:bg-background/85" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl items-center px-6 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-10 xl:px-16">
        {shouldShowSkeleton ? (
          <HeroSkeleton />
        ) : (
          <div className="grid w-full grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 xl:gap-24">
            {/* Content */}
            <div className="order-2 flex w-full max-w-2xl min-w-0 animate-in flex-col items-center text-center duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none max-lg:mx-auto lg:order-1 lg:items-start lg:text-left lg:slide-in-from-left-8">
              {data?.openToWork && (
                <div className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-muted/60 px-3.5 py-1.5 text-sm text-foreground">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full bg-foreground/70"
                    style={{ boxShadow: "0 0 0 3px oklch(1 0 0 / 0.5)" }}
                  />
                  <span>Open to new opportunities</span>
                </div>
              )}

              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-6xl">
                  {data?.fullName}
                </h1>

                <p className="text-lg font-medium text-balance text-muted-foreground sm:text-xl xl:text-2xl">
                  {data?.title}
                </p>
              </div>

              {data?.summary && (
                <p className="mt-5 max-w-xl text-sm leading-6 text-pretty text-muted-foreground sm:mt-7 sm:text-base sm:leading-7 xl:text-lg xl:leading-8">
                  {data.summary}
                </p>
              )}

              {data?.location && (
                <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground sm:mt-6">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{data.location}</span>
                </div>
              )}

              {socialLinks.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 lg:justify-start">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/70 text-foreground shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Profile image */}
            <div className="order-1 flex animate-in justify-center delay-150 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none lg:order-2 lg:justify-end lg:slide-in-from-right-8">
              <div className={`relative ${PORTRAIT_WIDTH}`}>
                {data?.avatarUrl ? (
                  <>
                    {/* Slow-rotating accent halo */}
                    <div
                      className="absolute -inset-2 rounded-[26%_74%_27%_73%/_73%_32%_68%_27%] opacity-70 motion-safe:animate-[spin_26s_linear_infinite] motion-reduce:animate-none sm:-inset-3"
                      style={{
                        background:
                          "conic-gradient(from 90deg, transparent 0%, oklch(0.92 0.03 65 / 0.55) 16%, transparent 38%, transparent 62%, oklch(0.3 0.04 50 / 0.5) 84%, transparent 100%)",
                      }}
                    />

                    {/* Portrait */}
                    <div
                      className={`relative overflow-hidden border border-border bg-background p-1.5 shadow-2xl ${BLOB_OUTER}`}
                    >
                      <img
                        src={data.avatarUrl}
                        alt={data.fullName || "Profile photo"}
                        className={`aspect-4/5 w-full object-cover ${BLOB_INNER}`}
                      />
                    </div>
                  </>
                ) : (
                  <div
                    className={`flex aspect-4/5 w-full items-center justify-center border border-border bg-muted shadow-xl ${BLOB_OUTER}`}
                  >
                    <User className="h-16 w-16 text-muted-foreground/40 sm:h-20 sm:w-20" />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function HeroSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-[1fr_0.9fr] lg:gap-16 xl:gap-24">
      {/* Content skeleton */}
      <div className="order-2 flex w-full max-w-2xl flex-col items-center max-lg:mx-auto lg:order-1 lg:items-start">
        <Skeleton className="mb-5 h-8 w-48 rounded-full" />

        <Skeleton className="h-10 w-64 sm:h-12 sm:w-80 xl:h-14 xl:w-96" />

        <Skeleton className="mt-3 h-6 w-48 sm:h-7 sm:w-56" />

        <div className="mt-5 flex w-full max-w-xl flex-col items-center gap-2 sm:mt-7 lg:items-start">
          <Skeleton className="h-4 w-full sm:h-5" />
          <Skeleton className="h-4 w-11/12 sm:h-5" />
          <Skeleton className="h-4 w-4/5 sm:h-5" />
        </div>

        <Skeleton className="mt-5 h-5 w-32 sm:mt-6" />

        <div className="mt-6 flex gap-3 sm:mt-8">
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-11 w-11 rounded-full" />
          <Skeleton className="h-11 w-11 rounded-full" />
        </div>
      </div>

      {/* Image skeleton: same width rules as the real portrait */}
      <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
        <div className={PORTRAIT_WIDTH}>
          <Skeleton className={`aspect-4/5 w-full ${BLOB_OUTER}`} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
