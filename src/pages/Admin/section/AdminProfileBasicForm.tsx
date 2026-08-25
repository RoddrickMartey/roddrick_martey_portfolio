import { useUpdateProfileBasic } from "@/hooks/useProfile"
import type { Profile, UpdateProfileBasicInput } from "@/types/profile"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateProfileBasicSchema } from "@/schema/profileSchema"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { User, Briefcase, FileText, MapPin, Flag, Loader2 } from "lucide-react"
import { useAdminStore } from "@/store/adminStore"

function AdminProfileBasicForm({
  fullName,
  title,
  summary,
  location,
  nationality,
}: {
  fullName: Profile["fullName"]
  title: Profile["title"]
  summary: Profile["summary"]
  location: Profile["location"]
  nationality: Profile["nationality"]
}) {
  const { mutate: updateProfileBasic, isPending } = useUpdateProfileBasic()
  const { updateAdmin } = useAdminStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileBasicInput>({
    resolver: zodResolver(updateProfileBasicSchema),
    defaultValues: {
      fullName,
      title,
      summary,
      location,
      nationality,
    },
  })

  const onSubmit = (input: UpdateProfileBasicInput) => {
    updateProfileBasic(input, {
      onSuccess: (res) => {
        reset(input) // marks the form as clean with the values just saved
        updateAdmin({ fullName: res.fullName })
      },
    })
  }

  return (
    <section className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Basic information</CardTitle>
          <CardDescription>
            Your name, title, and professional summary
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Full Name */}
            <Field>
              <FieldLabel htmlFor="fullName">Full name</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="fullName"
                  placeholder="Enter your full name"
                  {...register("fullName")}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <User className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.fullName?.message && (
                <FieldError id="fullName-error" role="alert">
                  {errors.fullName.message}
                </FieldError>
              )}
            </Field>

            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="title"
                  placeholder="e.g. IT Professional & Web Developer"
                  {...register("title")}
                  aria-invalid={!!errors.title}
                  aria-describedby={errors.title ? "title-error" : undefined}
                />
                <InputGroupAddon aria-hidden="true">
                  <Briefcase className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.title?.message && (
                <FieldError id="title-error" role="alert">
                  {errors.title.message}
                </FieldError>
              )}
            </Field>

            {/* Summary */}
            <Field>
              <FieldLabel htmlFor="summary">Summary</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="summary"
                  placeholder="A short professional summary"
                  rows={4}
                  {...register("summary")}
                  aria-invalid={!!errors.summary}
                  aria-describedby={
                    errors.summary ? "summary-error" : undefined
                  }
                />
                <InputGroupAddon align="block-start" aria-hidden="true">
                  <FileText className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.summary?.message && (
                <FieldError id="summary-error" role="alert">
                  {errors.summary.message}
                </FieldError>
              )}
            </Field>

            {/* Location */}
            <Field>
              <FieldLabel htmlFor="location">Location</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="location"
                  placeholder="e.g. Accra, Ghana"
                  {...register("location")}
                  aria-invalid={!!errors.location}
                  aria-describedby={
                    errors.location ? "location-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <MapPin className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.location?.message && (
                <FieldError id="location-error" role="alert">
                  {errors.location.message}
                </FieldError>
              )}
            </Field>

            {/* Nationality */}
            <Field>
              <FieldLabel htmlFor="nationality">Nationality</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="nationality"
                  placeholder="e.g. Ghanaian"
                  {...register("nationality")}
                  aria-invalid={!!errors.nationality}
                  aria-describedby={
                    errors.nationality ? "nationality-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <Flag className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.nationality?.message && (
                <FieldError id="nationality-error" role="alert">
                  {errors.nationality.message}
                </FieldError>
              )}
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-2 w-full sm:w-auto sm:self-end"
              disabled={!isDirty || isPending}
            >
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Saving...</span>
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}

export default AdminProfileBasicForm
