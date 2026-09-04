import { useState } from "react"
import { format } from "date-fns"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { useRequestLogs } from "@/hooks/useRequestLogs"

const PAGE_SIZE_OPTIONS = [10, 20, 50]

function AdminLogs() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)
  const {
    data: response,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useRequestLogs(page, limit)

  if (isLoading) {
    return <ResourceLoader message="Fetching request logs" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load request logs"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading request logs."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  const logs = response?.data ?? []
  const pagination = response?.pagination
  const totalPages = pagination?.totalPages ?? 0

  const handleLimitChange = (value: string) => {
    setLimit(Number(value))
    setPage(1)
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3 md:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-semibold">Request logs</h1>
          <p className="text-sm text-muted-foreground">
            Successful HTTP requests recorded by the backend
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="overflow-hidden border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>IP address</TableHead>
              <TableHead>User agent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No request logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    {format(new Date(log.createdAt), "MMM d, yyyy, h:mm a")}
                  </TableCell>
                  <TableCell className="font-medium">{log.method}</TableCell>
                  <TableCell className="max-w-[20rem]">
                    <HoverCard>
                      <HoverCardTrigger className="block max-w-[20rem] cursor-help truncate text-left">
                        {log.fullUrl}
                      </HoverCardTrigger>
                      <HoverCardContent className="w-lg max-w-[calc(100vw-2rem)] break-all">
                        {log.fullUrl}
                      </HoverCardContent>
                    </HoverCard>
                  </TableCell>
                  <TableCell>{log.statusCode}</TableCell>
                  <TableCell>{log.responseTime.toFixed(2)} ms</TableCell>
                  <TableCell>{log.remoteAddress || "-"}</TableCell>
                  <TableCell className="max-w-[18rem]">
                    {log.userAgent ? (
                      <HoverCard>
                        <HoverCardTrigger className="block max-w-[18rem] cursor-help truncate text-left">
                          {log.userAgent}
                        </HoverCardTrigger>
                        <HoverCardContent className="w-lg max-w-[calc(100vw-2rem)] wrap-break-word">
                          {log.userAgent}
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col justify-between gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <span>
          {pagination?.total ?? 0} total request
          {pagination?.total === 1 ? "" : "s"}
        </span>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2" htmlFor="log-page-size">
            Per page
            <select
              id="log-page-size"
              value={limit}
              onChange={(event) => handleLimitChange(event.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2 text-foreground"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <span>
            Page {pagination?.page ?? page} of {Math.max(totalPages, 1)}
          </span>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous page"
            onClick={() => setPage((current) => current - 1)}
            disabled={page <= 1 || isRefetching}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next page"
            onClick={() => setPage((current) => current + 1)}
            disabled={page >= totalPages || isRefetching || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default AdminLogs
