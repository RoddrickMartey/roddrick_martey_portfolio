import {
  usePublicHome,
  publicQueryOptions,
  PUBLIC_ABOUT_QUERY_KEY,
  PUBLIC_CONTACT_QUERY_KEY,
  PUBLIC_PROJECTS_QUERY_KEY,
} from "@/hooks/usePublic"
import { publicApi } from "@/api/publicApi"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import HeroSection from "./section/HeroSection"
import ProjectsPublicSection from "./section/ProjectsPublicSection"
import SkillsPublicSection from "./section/SkillsPublicSection"
import { optimizeImage } from "@/lib/optimizeImage"

function MainPage() {
  const { data, isLoading, error, refetch } = usePublicHome()
  const queryClient = useQueryClient()
  const isInitialLoading = isLoading && !data
  const profileName = data?.profile.fullName ?? "Roddrick Martey Anum"
  const description =
    data?.profile.summary ??
    "Roddrick Martey Anum's portfolio of thoughtful digital products and technical work."
  const socialImage = optimizeImage(
    data?.profile.avatarUrl ??
      "https://res.cloudinary.com/dtehqyxpu/image/upload/v1788820639/f3b9f0e2cb898a1d69d54494f42137cd_h2iec4.png",
    { width: 1200 }
  )

  useEffect(() => {
    if (!data) {
      return
    }

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }

    const prefetch = () => {
      void Promise.all([
        queryClient.prefetchQuery({
          ...publicQueryOptions,
          queryKey: PUBLIC_ABOUT_QUERY_KEY,
          queryFn: publicApi.getAbout,
        }),
        queryClient.prefetchQuery({
          ...publicQueryOptions,
          queryKey: PUBLIC_PROJECTS_QUERY_KEY,
          queryFn: publicApi.getProjects,
        }),
        queryClient.prefetchQuery({
          ...publicQueryOptions,
          queryKey: PUBLIC_CONTACT_QUERY_KEY,
          queryFn: publicApi.getContact,
        }),
      ])
    }

    const requestIdleCallback = idleWindow.requestIdleCallback
    const usedIdleCallback = Boolean(requestIdleCallback)
    const idleId = requestIdleCallback
      ? requestIdleCallback(prefetch)
      : window.setTimeout(prefetch, 0)

    return () => {
      if (idleWindow.cancelIdleCallback && usedIdleCallback) {
        idleWindow.cancelIdleCallback(idleId)
      } else {
        window.clearTimeout(idleId)
      }
    }
  }, [data, queryClient])

  return (
    <main className="min-h-screen w-full items-center">
      <title>{profileName} | Portfolio</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${profileName} | Portfolio`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <HeroSection
        data={data?.profile || null}
        isLoading={isInitialLoading}
        error={error}
        refetch={refetch}
      />
      <ProjectsPublicSection
        projects={data?.projects || []}
        isLoading={isInitialLoading}
        error={error}
        refetch={refetch}
      />
      <SkillsPublicSection
        skillCategories={data?.skills || []}
        isLoading={isInitialLoading}
        error={error}
        refetch={refetch}
      />
    </main>
  )
}

export default MainPage
