import { StrictMode } from "react"
import { lazy, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "@/components/ui/toast"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { TooltipProvider } from "@/components/ui/tooltip"
import { persistPublicQueryCache } from "@/lib/queryPersistence"

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then(
        ({ ReactQueryDevtools }) => ({
          default: ReactQueryDevtools,
        })
      )
    )
  : null

const queryClient = new QueryClient()

if (typeof window !== "undefined") {
  persistPublicQueryCache(queryClient)
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <App />
            <Toaster />
            {ReactQueryDevtools && (
              <Suspense fallback={null}>
                <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
            )}
          </TooltipProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
