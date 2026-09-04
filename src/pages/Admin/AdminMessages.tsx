import { useState } from "react"
import { format } from "date-fns"
import { MailOpen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import {
  useContactMessages,
  useDeleteContactMessage,
  useUpdateContactMessage,
} from "@/hooks/useContactMessages"

function AdminMessages() {
  const {
    data: messages,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useContactMessages()
  const { mutate: updateMessage, isPending: isUpdating } =
    useUpdateContactMessage()
  const { mutate: deleteMessage, isPending: isDeleting } =
    useDeleteContactMessage()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  if (isLoading) {
    return <ResourceLoader message="Fetching messages" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load messages"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading contact messages."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Messages</h1>
        <p className="text-sm text-muted-foreground">
          Review incoming portfolio inquiries and replies
        </p>
      </div>

      {!messages || messages.length === 0 ? (
        <EmptyResource
          title="No messages yet"
          description="When someone reaches out through your portfolio contact form, they will appear here."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Inbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {messages.map((message) => (
                <button
                  key={message.id}
                  type="button"
                  onClick={() => setSelectedId(message.id)}
                  className={`w-full rounded-md border p-3 text-left ${
                    selectedId === message.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-background"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{message.name}</span>
                    {!message.read && (
                      <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] text-primary uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {message.subject || "No subject"}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {format(new Date(message.createdAt), "MMM d, yyyy")}
                  </p>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedId ? (
                (() => {
                  const message = messages.find(
                    (item) => item.id === selectedId
                  )
                  if (!message) return null

                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold">
                            {message.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {message.email}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            disabled={isUpdating}
                            onClick={() =>
                              updateMessage({
                                id: message.id,
                                input: { read: !message.read },
                              })
                            }
                          >
                            <MailOpen className="mr-1 h-4 w-4" />
                            {message.read ? "Mark unread" : "Mark read"}
                          </Button>
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            disabled={isDeleting}
                            onClick={() => deleteMessage(message.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </div>

                      {message.subject && (
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">
                            Subject
                          </p>
                          <p className="text-sm font-medium">
                            {message.subject}
                          </p>
                        </div>
                      )}

                      <div>
                        <p className="text-xs text-muted-foreground uppercase">
                          Message
                        </p>
                        <p className="text-sm leading-6 whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  )
                })()
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select a message from the inbox to preview it.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  )
}

export default AdminMessages
