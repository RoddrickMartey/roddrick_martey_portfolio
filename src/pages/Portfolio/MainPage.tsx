import { usePublicHome } from "@/hooks/usePublic"
import HeroSection from "./section/HeroSection"
import ProjectsPublicSection from "./section/ProjectsPublicSection"
import SkillsPublicSection from "./section/SkillsPublicSection"

function MainPage() {
  const { data, isLoading, error, refetch } = usePublicHome()

  return (
    <main className="min-h-screen w-full items-center">
      <HeroSection
        data={data?.profile || null}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
      <ProjectsPublicSection
        projects={data?.projects || []}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
      <SkillsPublicSection
        skillCategories={data?.skills || []}
        isLoading={isLoading}
        error={error}
        refetch={refetch}
      />
    </main>
  )
}

export default MainPage
