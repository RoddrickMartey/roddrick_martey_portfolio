import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT"

interface Skill {
  name: string
  level: SkillLevel
}

const levelStyles: Record<SkillLevel, { color: string; label: string }> = {
  EXPERT: {
    color: "bg-emerald-500 shadow-emerald-500/50",
    label: "Expert",
  },
  ADVANCED: {
    color: "bg-sky-500 shadow-sky-500/50",
    label: "Advanced",
  },
  INTERMEDIATE: {
    color: "bg-amber-500 shadow-amber-500/50",
    label: "Intermediate",
  },
  BEGINNER: {
    color: "bg-slate-400 dark:bg-slate-500",
    label: "Beginner",
  },
}

export function SkillBadges({ skill }: { skill: Skill }) {
  const style = levelStyles[skill.level]

  return (
    <Badge
      key={skill.name}
      variant="secondary"
      className="group flex items-center gap-2 border border-border/60 bg-secondary/40 px-3 py-1 font-normal transition-all hover:border-border hover:bg-secondary/80"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full transition-transform group-hover:scale-125",
          style.color
        )}
      />
      <span className="font-medium text-foreground">{skill.name}</span>
      <span className="text-[11px] text-muted-foreground/80">
        {style.label}
      </span>
    </Badge>
  )
}
