import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { EmptyResource } from "@/components/empty-component"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import { toDateInputValue, toIsoDateTime } from "@/lib/date"
import { getApiErrorMessage } from "@/lib/apiError"
import { toast } from "@/components/ui/toast"
import {
  useCertifications,
  useCreateCertification,
  useDeleteCertification,
  useUpdateCertification,
} from "@/hooks/useCertifications"
import {
  createCertificationSchema,
  type CertificationFormValues,
} from "@/schema/certificationSchema"
import type { Certification } from "@/types/certification"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const emptyValues: CertificationFormValues = {
  name: "",
  issuer: "",
  platform: undefined,
  dateEarned: undefined,
  verifyUrl: undefined,
  honours: false,
  featured: false,
  order: 0,
}

function AdminCertification() {
  const {
    data: certifications,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useCertifications()
  const { mutate: createCertification, isPending: isCreating } =
    useCreateCertification()
  const { mutate: updateCertification, isPending: isUpdating } =
    useUpdateCertification()
  const { mutate: deleteCertification, isPending: isDeleting } =
    useDeleteCertification()

  const form = useForm<CertificationFormValues>({
    resolver: zodResolver(createCertificationSchema),
    defaultValues: emptyValues,
  })
  const [editing, setEditing] = useState<Certification | null>(null)
  const editForm = useForm<CertificationFormValues>({
    resolver: zodResolver(createCertificationSchema),
    defaultValues: emptyValues,
  })

  const onCreate = (values: CertificationFormValues) => {
    createCertification(
      {
        ...values,
        platform: values.platform ?? undefined,
        dateEarned: toIsoDateTime(values.dateEarned),
        verifyUrl: values.verifyUrl ?? undefined,
      },
      {
        onSuccess: () => {
          form.reset(emptyValues)
          toast.add({
            title: "Certification created",
            description: "The certification was added successfully.",
            type: "success",
          })
        },
        onError: (error) => {
          toast.add({
            title: "Could not create certification",
            description: getApiErrorMessage(
              error,
              "The certification could not be created. Please try again."
            ),
            type: "error",
          })
        },
      }
    )
  }

  const onEdit = (item: Certification) => {
    editForm.reset({
      name: item.name,
      issuer: item.issuer,
      platform: item.platform ?? undefined,
      dateEarned: toDateInputValue(item.dateEarned),
      verifyUrl: item.verifyUrl ?? undefined,
      honours: item.honours,
      featured: item.featured,
      order: item.order,
    })
    setEditing(item)
  }

  const onUpdate = (values: CertificationFormValues) => {
    if (!editing) return
    updateCertification(
      {
        id: editing.id,
        input: {
          ...values,
          dateEarned: toIsoDateTime(values.dateEarned),
          verifyUrl: values.verifyUrl || null,
        },
      },
      {
        onSuccess: () => {
          setEditing(null)
          toast.add({
            title: "Certification updated",
            description: "The certification was updated successfully.",
            type: "success",
          })
        },
        onError: (error) =>
          toast.add({
            title: "Could not update certification",
            description: getApiErrorMessage(
              error,
              "The certification could not be updated."
            ),
            type: "error",
          }),
      }
    )
  }

  if (isLoading) {
    return <ResourceLoader message="Fetching certifications" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load certifications"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while fetching certifications."
        }
        onRetry={refetch}
        isRetrying={isRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Certifications</h1>
        <p className="text-sm text-muted-foreground">
          Track your achievements, credentials, and recognitions
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Credential list</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!certifications || certifications.length === 0 ? (
              <EmptyResource
                title="No certifications yet"
                description="Add your latest credentials and learning milestones."
                actionLabel="Add credential"
                onAction={() => undefined}
              />
            ) : (
              certifications.map((item) => (
                <div key={item.id} className="border border-border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.issuer}
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
                        onClick={() => deleteCertification(item.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-muted-foreground">
                    {item.platform ?? "Platform not specified"}
                    {item.dateEarned
                      ? ` • ${format(new Date(item.dateEarned), "MMM d, yyyy")}`
                      : ""}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add certification</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onCreate)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="name">Certification</FieldLabel>
                <Input id="name" {...form.register("name")} />
                {form.formState.errors.name && (
                  <FieldError>{form.formState.errors.name.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="issuer">Issuer</FieldLabel>
                <Input id="issuer" {...form.register("issuer")} />
                {form.formState.errors.issuer && (
                  <FieldError>
                    {form.formState.errors.issuer.message}
                  </FieldError>
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="platform">Platform</FieldLabel>
                  <Input id="platform" {...form.register("platform")} />
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
                  <FieldLabel htmlFor="dateEarned">Date earned</FieldLabel>
                  <Input
                    id="dateEarned"
                    type="date"
                    {...form.register("dateEarned")}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="verifyUrl">Verification link</FieldLabel>
                  <Input id="verifyUrl" {...form.register("verifyUrl")} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...form.register("honours")} />
                  Honors / award
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...form.register("featured")} />
                  Featured
                </label>
              </div>

              <Button type="submit" disabled={isCreating} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isCreating ? "Saving..." : "Create certification"}
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
            <DialogTitle>Edit certification</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={editForm.handleSubmit(onUpdate)}
            className="space-y-4"
          >
            <Input placeholder="Certification" {...editForm.register("name")} />
            <Input placeholder="Issuer" {...editForm.register("issuer")} />
            <Input placeholder="Platform" {...editForm.register("platform")} />
            <Input type="date" {...editForm.register("dateEarned")} />
            <Input
              placeholder="Verification URL"
              {...editForm.register("verifyUrl")}
            />
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

export default AdminCertification
