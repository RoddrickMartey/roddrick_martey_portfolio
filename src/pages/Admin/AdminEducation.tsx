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
  const { mutate: updateEducation } = useUpdateEducation()
  const { mutate: deleteEducation, isPending: isDeleting } =
    useDeleteEducation()

  const form = useForm<EducationFormValues>({
    resolver: zodResolver(createEducationSchema),
    defaultValues: emptyValues,
  })

  const onCreate = (values: EducationFormValues) => {
    createEducation({
      ...values,
      location: values.location ?? undefined,
      endDate: values.endDate ?? undefined,
      description: values.description ?? undefined,
    })
    form.reset(emptyValues)
  }

  const onEdit = (item: Education) => {
    const payload: EducationFormValues = {
      degree: item.degree,
      institution: item.institution,
      location: item.location ?? undefined,
      startDate: item.startDate,
      endDate: item.endDate ?? undefined,
      description: item.description ?? undefined,
      order: item.order,
    }

    updateEducation({ id: item.id, input: payload })
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
                <div
                  key={item.id}
                  className="rounded-lg border border-border p-3"
                >
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
                        Update
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
                    {item.startDate} - {item.endDate ?? "Present"}
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
    </section>
  )
}

export default AdminEducation
