import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { toDateInputValue, toIsoDateTime } from "@/lib/date"
import { getApiErrorMessage } from "@/lib/apiError"
import { toast } from "@/components/ui/toast"
import {
  useCreateEducation,
  useDeleteEducation,
  useEducation,
  useUpdateEducation,
} from "@/hooks/useEducation"
import {
  createEducationSchema,
  type EducationFormValues,
} from "@/schema/educationSchema"
import type { Education } from "@/types/education"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const emptyValues: EducationFormValues = {
  degree: "",
  institution: "",
  location: undefined,
  startDate: "",
  endDate: undefined,
  description: undefined,
  order: 0,
}

function AdminEducation() {
  const {
    data: education,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useEducation()
  const { mutate: createEducation, isPending: isCreating } =
    useCreateEducation()
  const { mutate: updateEducation, isPending: isUpdating } =
    useUpdateEducation()
  const { mutate: deleteEducation, isPending: isDeleting } =
    useDeleteEducation()

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(createEducationSchema),
    defaultValues: emptyValues,
  })
  const [editing, setEditing] = useState<Education | null>(null)
  const editForm = useForm<EducationFormValues>({
    resolver: zodResolver(createEducationSchema),
    defaultValues: emptyValues,
  })

  const onCreate = (values: EducationFormValues) => {
    createEducation(
      {
        ...values,
        location: values.location ?? undefined,
        startDate: toIsoDateTime(values.startDate) ?? "",
        endDate: toIsoDateTime(values.endDate),
        description: values.description ?? undefined,
      },
      {
        onSuccess: () => {
          form.reset(emptyValues)
          toast.add({
            title: "Education created",
            description: "The education record was added successfully.",
            type: "success",
          })
        },
        onError: (error) => {
          toast.add({
            title: "Could not create education",
            description: getApiErrorMessage(
              error,
              "The education record could not be created. Please try again."
            ),
            type: "error",
          })
        },
      }
    )
  }

  const onEdit = (item: Education) => {
    editForm.reset({
      degree: item.degree,
      institution: item.institution,
      location: item.location ?? undefined,
      startDate: toDateInputValue(item.startDate) ?? "",
      endDate: toDateInputValue(item.endDate),
      description: item.description ?? undefined,
      order: item.order,
    })
    setEditing(item)
  }

  const onUpdate = (values: EducationFormValues) => {
    if (!editing) return

    updateEducation(
      {
        id: editing.id,
        input: {
          ...values,
          location: values.location ?? undefined,
          description: values.description ?? undefined,
          startDate: toIsoDateTime(values.startDate) ?? "",
          endDate: toIsoDateTime(values.endDate),
        },
      },
      {
        onSuccess: () => {
          setEditing(null)
          toast.add({
            title: "Education updated",
            description: "The education record was updated successfully.",
            type: "success",
          })
        },
        onError: (error) =>
          toast.add({
            title: "Could not update education",
            description: getApiErrorMessage(
              error,
              "The education record could not be updated."
            ),
            type: "error",
          }),
      }
    )
  }

  if (isLoading) {
    return <ResourceLoader message="Fetching education" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load education"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching education records."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Education</h1>
        <p className="text-sm text-muted-foreground">
          Manage academic history and qualifications
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Academic timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!education || education.length === 0 ? (
              <EmptyResource
                title="No education entries"
                description="Add your education history to build your profile."
                actionLabel="Add education"
                onAction={() => undefined}
              />
            ) : (
              education.map((item) => (
                <div key={item.id} className="border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.degree}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.institution}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(item)}
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => deleteEducation(item.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground">
                    {format(new Date(item.startDate), "MMM yyyy")} -{" "}
                    {item.endDate
                      ? format(new Date(item.endDate), "MMM yyyy")
                      : "Present"}
                    {item.location ? ` • ${item.location}` : ""}
                  </div>

                  {item.description && (
                    <p className="mt-2 text-sm">{item.description}</p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add education</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onCreate)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="degree">Degree</FieldLabel>
                <Input id="degree" {...form.register("degree")} />
                {form.formState.errors.degree && (
                  <FieldError>
                    {form.formState.errors.degree.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="institution">Institution</FieldLabel>
                <Input id="institution" {...form.register("institution")} />
                {form.formState.errors.institution && (
                  <FieldError>
                    {form.formState.errors.institution.message}
                  </FieldError>
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input id="location" {...form.register("location")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="order">Order</FieldLabel>
                  <Input
                    id="order"
                    type="number"
                    {...form.register("order", { valueAsNumber: true })}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="startDate">Start date</FieldLabel>
                  <Input
                    id="startDate"
                    type="date"
                    {...form.register("startDate")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="endDate">End date</FieldLabel>
                  <Input
                    id="endDate"
                    type="date"
                    {...form.register("endDate")}
                  />
                </Field>
              </div>

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
                {isCreating ? "Saving..." : "Create education"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!editing}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit education</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={editForm.handleSubmit(onUpdate)}
            className="space-y-4"
            noValidate
          >
            <Field>
              <FieldLabel htmlFor="edit-degree">Degree</FieldLabel>
              <Input id="edit-degree" {...editForm.register("degree")} />
              {editForm.formState.errors.degree && (
                <FieldError>
                  {editForm.formState.errors.degree.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-institution">Institution</FieldLabel>
              <Input
                id="edit-institution"
                {...editForm.register("institution")}
              />
              {editForm.formState.errors.institution && (
                <FieldError>
                  {editForm.formState.errors.institution.message}
                </FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="edit-location">Location</FieldLabel>
              <Input id="edit-location" {...editForm.register("location")} />
              {editForm.formState.errors.location && (
                <FieldError>
                  {editForm.formState.errors.location.message}
                </FieldError>
              )}
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field>
                <FieldLabel htmlFor="edit-startDate">Start date</FieldLabel>
                <Input
                  id="edit-startDate"
                  type="date"
                  {...editForm.register("startDate")}
                />
                {editForm.formState.errors.startDate && (
                  <FieldError>
                    {editForm.formState.errors.startDate.message}
                  </FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="edit-endDate">End date</FieldLabel>
                <Input
                  id="edit-endDate"
                  type="date"
                  {...editForm.register("endDate")}
                />
                {editForm.formState.errors.endDate && (
                  <FieldError>
                    {editForm.formState.errors.endDate.message}
                  </FieldError>
                )}
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="edit-description">Description</FieldLabel>
              <Textarea
                id="edit-description"
                rows={4}
                {...editForm.register("description")}
              />
              {editForm.formState.errors.description && (
                <FieldError>
                  {editForm.formState.errors.description.message}
                </FieldError>
              )}
            </Field>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditing(null)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                {isUpdating ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default AdminEducation
