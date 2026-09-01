import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import {
  useCreateExperience,
  useDeleteExperience,
  useExperiences,
  useUpdateExperience,
} from "@/hooks/useExperiences"
import {
  createExperienceSchema,
  updateExperienceSchema,
  type ExperienceFormValues,
  type ExperienceUpdateFormValues,
} from "@/schema/experienceSchema"
import type { Experience } from "@/types/experience"

const emptyValues: ExperienceFormValues = {
  role: "",
  organization: "",
  employmentType: undefined,
  description: undefined,
  location: undefined,
  startDate: "",
  endDate: undefined,
  bullets: [],
  order: 0,
}

function AdminExperience() {
  const {
    data: experiences,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useExperiences()
  const { mutate: createExperience, isPending: isCreating } =
    useCreateExperience()
  const { mutate: updateExperience } = useUpdateExperience()
  const { mutate: deleteExperience, isPending: isDeleting } =
    useDeleteExperience()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExperienceFormValues>({
    resolver: zodResolver(createExperienceSchema),
    defaultValues: emptyValues,
  })

  const editingId = useForm<ExperienceUpdateFormValues>({
    resolver: zodResolver(updateExperienceSchema),
    defaultValues: emptyValues,
  })

  const onCreate = (values: ExperienceFormValues) => {
    const payload = {
      ...values,
      bullets: values.bullets ?? [],
      employmentType: values.employmentType ?? undefined,
      description: values.description ?? undefined,
      location: values.location ?? undefined,
      endDate: values.endDate ?? undefined,
    }

    createExperience(payload)
    reset(emptyValues)
  }

  const onEdit = (experience: Experience) => {
    editingId.reset({
      role: experience.role,
      organization: experience.organization,
      employmentType: experience.employmentType ?? undefined,
      description: experience.description ?? undefined,
      location: experience.location ?? undefined,
      startDate: experience.startDate,
      endDate: experience.endDate ?? undefined,
      bullets: experience.bullets,
      order: experience.order,
    })

    const payload = {
      role: experience.role,
      organization: experience.organization,
      employmentType: experience.employmentType ?? undefined,
      description: experience.description ?? undefined,
      location: experience.location ?? undefined,
      startDate: experience.startDate,
      endDate: experience.endDate ?? undefined,
      bullets: experience.bullets,
      order: experience.order,
    }

    updateExperience({ id: experience.id, input: payload })
  }

  if (isLoading) {
    return <ResourceLoader message="Fetching experience" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load experience"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching experience records."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Experience</h1>
          <p className="text-sm text-muted-foreground">
            Manage your work history and career timeline
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {experiences && experiences.length > 0
                ? "Experience list"
                : "Add experience"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!experiences || experiences.length === 0 ? (
              <EmptyResource
                title="No experience yet"
                description="Add the first role in your professional journey."
                actionLabel="Create experience"
                onAction={() => undefined}
              />
            ) : (
              experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="space-y-3 rounded-lg border border-border p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{experience.role}</p>
                      <p className="text-sm text-muted-foreground">
                        {experience.organization}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(experience)}
                      >
                        <Pencil className="mr-1 h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => deleteExperience(experience.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    {experience.startDate} - {experience.endDate ?? "Present"}
                    {experience.location ? ` • ${experience.location}` : ""}
                  </div>

                  {experience.description && (
                    <p className="text-sm">{experience.description}</p>
                  )}

                  {experience.bullets.length > 0 && (
                    <ul className="ml-5 list-disc space-y-1 text-sm text-muted-foreground">
                      {experience.bullets.map((bullet, index) => (
                        <li key={`${experience.id}-${index}`}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add experience</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleSubmit(onCreate)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="role">Role</FieldLabel>
                <Input id="role" {...register("role")} />
                {errors.role && <FieldError>{errors.role.message}</FieldError>}
              </Field>

              <Field>
                <FieldLabel htmlFor="organization">Organization</FieldLabel>
                <Input id="organization" {...register("organization")} />
                {errors.organization && (
                  <FieldError>{errors.organization.message}</FieldError>
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="employmentType">
                    Employment type
                  </FieldLabel>
                  <Input id="employmentType" {...register("employmentType")} />
                </Field>
                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <Input id="location" {...register("location")} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="startDate">Start date</FieldLabel>
                  <Input
                    id="startDate"
                    type="date"
                    {...register("startDate")}
                  />
                  {errors.startDate && (
                    <FieldError>{errors.startDate.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="endDate">End date</FieldLabel>
                  <Input id="endDate" type="date" {...register("endDate")} />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="bullets">Achievements</FieldLabel>
                <Textarea
                  id="bullets"
                  rows={5}
                  placeholder="One bullet per line"
                  {...register("bullets.0")}
                />
                {errors.bullets && (
                  <FieldError>{errors.bullets.message}</FieldError>
                )}
              </Field>

              <Button type="submit" disabled={isCreating} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Creating..." : "Create experience"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default AdminExperience
