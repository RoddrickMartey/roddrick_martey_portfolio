import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { getApiErrorMessage } from "@/lib/apiError"
import { toast } from "@/components/ui/toast"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  useCreateTechnology,
  useDeleteTechnology,
  useTechnologies,
  useUpdateTechnology,
} from "@/hooks/useTechnologies"
import {
  createTechnologySchema,
  type TechnologyFormValues,
} from "@/schema/technologySchema"

const emptyValues: TechnologyFormValues = {
  name: "",
  description: undefined,
}

function AdminTechnology() {
  const {
    data: technologies,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useTechnologies()
  const { mutate: createTechnology, isPending: isCreating } =
    useCreateTechnology()
  const { mutate: updateTechnology } = useUpdateTechnology()
  const { mutate: deleteTechnology, isPending: isDeleting } =
    useDeleteTechnology()

  const form = useForm<TechnologyFormValues>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: emptyValues,
  })
  const [editing, setEditing] = useState<string | null>(null)
  const editForm = useForm<TechnologyFormValues>({
    resolver: zodResolver(createTechnologySchema),
    defaultValues: emptyValues,
  })

  const onCreate = (values: TechnologyFormValues) => {
    createTechnology(
      {
        name: values.name,
        description: values.description ?? undefined,
      },
      {
        onSuccess: () => {
          form.reset(emptyValues)
          toast.add({
            title: "Technology created",
            description: "The technology was added successfully.",
            type: "success",
          })
        },
        onError: (error) => {
          toast.add({
            title: "Could not create technology",
            description: getApiErrorMessage(
              error,
              "The technology could not be created. Please try again."
            ),
            type: "error",
          })
        },
      }
    )
  }

  const onEdit = (id: string, name: string, description: string | null) => {
    editForm.reset({ name, description: description ?? undefined })
    setEditing(id)
  }

  const onUpdate = (values: TechnologyFormValues) => {
    if (!editing) return
    updateTechnology(
      { id: editing, input: values },
      {
        onSuccess: () => {
          setEditing(null)
          toast.add({
            title: "Technology updated",
            description: "The technology was updated successfully.",
            type: "success",
          })
        },
        onError: (error) =>
          toast.add({
            title: "Could not update technology",
            description: getApiErrorMessage(
              error,
              "The technology could not be updated."
            ),
            type: "error",
          }),
      }
    )
  }

  if (isLoading) {
    return <ResourceLoader message="Fetching technologies" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load technologies"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching technologies."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Tech stack</h1>
        <p className="text-sm text-muted-foreground">
          Manage the technologies used across projects
        </p>
      </div>
      <Dialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit technology</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={editForm.handleSubmit(onUpdate)}
            className="space-y-4"
          >
            <Input placeholder="Name" {...editForm.register("name")} />
            <Textarea
              placeholder="Description"
              {...editForm.register("description")}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Technology library</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!technologies || technologies.length === 0 ? (
              <EmptyResource
                title="No technologies yet"
                description="Add a stack item and use it across your portfolio projects."
                actionLabel="Add tech"
                onAction={() => undefined}
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {technologies.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 rounded-md border border-border px-3 py-2"
                  >
                    <span className="text-sm font-medium">{item.name}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        onEdit(item.id, item.name, item.description)
                      }
                    >
                      Update
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      disabled={isDeleting}
                      onClick={() => deleteTechnology(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add technology</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onCreate)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <FieldError>{form.formState.errors.name.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  rows={4}
                  {...form.register("description")}
                />
              </Field>

              <Button type="submit" disabled={isCreating} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Saving..." : "Create technology"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default AdminTechnology
