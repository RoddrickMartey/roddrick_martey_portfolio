import { useQuery } from "@tanstack/react-query"
import { technologyApi } from "@/api/technologyApi"

export function useTechnologies() {
  return useQuery({
    queryKey: ["technologies"],
    queryFn: technologyApi.getAll,
  })
}
