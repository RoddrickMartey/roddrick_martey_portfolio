import type { PublicSkill } from "@/api/publicApi"
import { Code2, Sparkles } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"

type SkillsPublicSectionProps = {
  skillCategories: PublicSkill[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

function SkillsPublicSection({
  skillCategories,
  isLoading,
  error,
  refetch,
}: SkillsPublicSectionProps) {
  if (error) {
    return (
      <section className="w-full border-t border-border px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <ResourceError
            title="Failed to load skills"
            description="Could not retrieve the skill highlights right now."
            onRetry={refetch}
          />
        </div>
      </section>
    )
  }

  return (
    <section className="w-full border-t border-border px-6 py-24 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
          <p className="mb-2 text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Toolkit
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Tools for thoughtful digital work
          </h2>
        </div>

        {isLoading ? (
          <div className="grid animate-in gap-px overflow-hidden border border-border bg-border delay-150 duration-700 fade-in slide-in-from-bottom-6 motion-reduce:animate-none sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="space-y-3 bg-card p-5">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
        ) : skillCategories.length === 0 ? (
          <EmptyResource
            title="No skill highlights yet"
            description="A concise selection of skills will appear here."
            icon={<Sparkles className="h-6 w-6" />}
          />
        ) : (
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((skill) => (
              <div
                key={skill.name}
                className="flex items-center gap-4 bg-card p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary/10 text-primary">
                  <Code2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{skill.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground capitalize">
                    {skill.level.toLowerCase()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default SkillsPublicSection
