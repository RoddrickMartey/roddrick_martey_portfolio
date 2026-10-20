import { useNavigate } from "react-router-dom"
import { MapPin, User } from "lucide-react"
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react"
import { PublicEmpty } from "@/components/PublicEmpty"
import { PublicError } from "@/components/PublicError"
import { PublicLoader } from "@/components/PublicLoader"
import type { PublicHomeProfile } from "@/api/publicApi"
import { optimizeImage } from "@/lib/optimizeImage"

type HeroSectionProps = {
  data: PublicHomeProfile | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

/* Bigger portrait again, text sizes elsewhere unchanged */
const PORTRAIT_WIDTH = "w-64 sm:w-72 lg:w-full lg:max-w-80 xl:max-w-96"

const socialButtonClasses =
  "inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-background/80 text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:bg-foreground hover:text-background hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-0 motion-reduce:transition-none sm:h-11 sm:w-11"

const socialPillClasses =
  "inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border/80 bg-background/80 px-4 text-sm font-medium text-foreground shadow-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-foreground/20 hover:bg-foreground hover:text-background hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:translate-y-0 motion-reduce:transition-none sm:h-11 sm:px-5"

function HeroSection({ data, isLoading, error, refetch }: HeroSectionProps) {
  const navigate = useNavigate()
  const shouldShowSkeleton = isLoading && !data

  if (error && !data) {
    return (
      <section className="flex min-h-svh w-full items-center justify-center px-6">
        <PublicError
          title="The profile is taking a moment"
          description="The introduction could not be loaded just now. Please try again."
          onRetry={refetch}
          fullScreen={false}
        />
      </section>
    )
  }

  if (!isLoading && !data) {
    return (
      <section className="flex min-h-svh w-full items-center justify-center px-6">
        <PublicEmpty
          title="Profile coming soon"
          description="The portfolio introduction is being prepared."
          icon={<User className="h-6 w-6" />}
          fullScreen={false}
        />
      </section>
    )
  }

  // External profile links only. The "Website" / "About" action is handled
  // separately below since it navigates within this app, not to an outside URL.
  const externalSocialLinks = [
    { href: data?.githubUrl, label: "GitHub", Icon: GithubLogoIcon },
    { href: data?.linkedinUrl, label: "LinkedIn", Icon: LinkedinLogoIcon },
  ].filter((s) => Boolean(s.href))

  return (
    <section
      className="relative min-h-svh w-full overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('${optimizeImage(
          "https://res.cloudinary.com/dtehqyxpu/image/upload/v1788810007/bg_qypdbs.png",
          { width: 1920 }
        )}')`,
      }}
    >
      {/* Overlay to keep foreground content legible over the wallpaper */}
      <div className="absolute inset-0 bg-background/50 dark:bg-background/85" />

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl items-center px-6 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-10 xl:px-16">
        {shouldShowSkeleton ? (
          <PublicLoader
            message="Bringing the portfolio together..."
            fullScreen={false}
            className="min-h-svh"
          />
        ) : (
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
            {/* Content */}
            <div className="order-2 flex w-full max-w-2xl min-w-0 animate-in flex-col items-center text-center duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none max-lg:mx-auto lg:order-1 lg:items-start lg:text-left lg:slide-in-from-left-8">
              {data?.openToWork && (
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3.5 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-md sm:mb-5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foreground/50 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-foreground" />
                  </span>
                  <span>Open to new opportunities</span>
                </div>
              )}

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground min-[400px]:text-4xl sm:text-5xl xl:text-6xl">
                  {data?.fullName}
                </h1>

                <p className="text-lg font-medium text-balance text-muted-foreground sm:text-xl xl:text-2xl">
                  {data?.title}
                </p>
              </div>

              {data?.summary && (
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground sm:mt-5 sm:text-base xl:text-lg xl:leading-8">
                  {data.summary}
                </p>
              )}

              {data?.location && (
                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-muted-foreground sm:mt-5">
                  <MapPin className="h-4 w-4 shrink-0 text-foreground/80" />
                  <span>{data.location}</span>
                </div>
              )}

              {(externalSocialLinks.length > 0 || data?.websiteUrl) && (
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:mt-6 lg:justify-start">
                  {externalSocialLinks.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      title={label}
                      className={socialButtonClasses}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  ))}

                  {data?.websiteUrl && (
                    <button
                      type="button"
                      onClick={() => navigate("/about")}
                      aria-label="Who's Rod"
                      title="Who's Rod"
                      className={socialPillClasses}
                    >
                      <span>Who&apos;s Rod</span>
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Profile image */}
            <div className="order-1 flex animate-in justify-center delay-150 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none lg:order-2 lg:justify-end lg:slide-in-from-right-8">
              <div className={`relative ${PORTRAIT_WIDTH}`}>
                {/* Offset outline, sitting behind the photo like a picture-frame mat */}
                <div
                  aria-hidden="true"
                  className="absolute -top-4 -right-4 h-full w-full rounded-lg border-2 border-primary/40 sm:-top-5 sm:-right-5"
                />

                {/* Photo */}
                <div className="relative rounded-lg bg-muted shadow-xl">
                  {data?.avatarUrl ? (
                    <img
                      src={optimizeImage(data.avatarUrl, { width: 768 })}
                      alt={data.fullName || "Profile photo"}
                      width={768}
                      height={960}
                      fetchPriority="high"
                      decoding="async"
                      className="aspect-4/5 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex aspect-4/5 w-full items-center justify-center rounded-lg shadow-inner">
                      <User className="h-14 w-14 text-muted-foreground/40 sm:h-16 sm:w-16" />
                    </div>
                  )}
                </div>

                {/* Corner brackets, drawn over the photo's corners */}
                {[
                  "-top-3 -left-3 border-t-4 border-l-4 rounded-tl-lg",
                  "-top-3 -right-3 border-t-4 border-r-4 rounded-tr-lg",
                  "-bottom-3 -left-3 border-b-4 border-l-4 rounded-bl-lg",
                  "-bottom-3 -right-3 border-b-4 border-r-4 rounded-br-lg",
                ].map((position) => (
                  <span
                    key={position}
                    aria-hidden="true"
                    className={`absolute h-8 w-8 border-primary sm:h-9 sm:w-9 ${position}`}
                  />
                ))}

                {/* Floating label tag */}
                {data?.title && (
                  <div className="absolute -bottom-3 left-4 flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 shadow-md sm:left-5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span className="text-xs font-medium whitespace-nowrap text-foreground">
                      {data.title}
                    </span>
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

export default HeroSection
