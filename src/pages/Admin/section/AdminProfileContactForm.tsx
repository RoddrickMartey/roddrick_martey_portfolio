import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUpdateProfileContact } from "@/hooks/useProfile"
import type { Profile, UpdateProfileContactInput } from "@/types/profile"
import { updateProfileContactSchema } from "@/schema/profileSchema"
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
} from "@/components/ui/input-group"
import { Mail, Phone, Globe, Loader2 } from "lucide-react"
import { LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react"
import { useAdminStore } from "@/store/adminStore"

function AdminProfileContactForm({
  email,
  phone,
  linkedinUrl,
  githubUrl,
  websiteUrl,
}: {
  email: Profile["email"]
  phone: Profile["phone"]
  linkedinUrl: Profile["linkedinUrl"]
  githubUrl: Profile["githubUrl"]
  websiteUrl: Profile["websiteUrl"]
}) {
  const { mutate: updateProfileContact, isPending } = useUpdateProfileContact()
  const { updateAdmin } = useAdminStore()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileContactInput>({
    resolver: zodResolver(updateProfileContactSchema),
    defaultValues: {
      email,
      phone,
      linkedinUrl,
      githubUrl,
      websiteUrl,
    },
  })

  useEffect(() => {
    reset({ email, phone, linkedinUrl, githubUrl, websiteUrl })
  }, [email, phone, linkedinUrl, githubUrl, websiteUrl, reset])

  const onSubmit = (input: UpdateProfileContactInput) => {
    updateProfileContact(input, {
      onSuccess: (res) => {
        reset(input)
        updateAdmin({ email: res.email })
      },
    })
  }

  return (
    <section className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Contact & links</CardTitle>
          <CardDescription>
            How people can reach you and find your work
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <InputGroupAddon aria-hidden="true">
                  <Mail className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.email?.message && (
                <FieldError id="email-error" role="alert">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            {/* Phone */}
            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="phone"
                  type="tel"
                  placeholder="+233-592769435"
                  autoComplete="tel"
                  {...register("phone")}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                <InputGroupAddon aria-hidden="true">
                  <Phone className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.phone?.message && (
                <FieldError id="phone-error" role="alert">
                  {errors.phone.message}
                </FieldError>
              )}
            </Field>

            {/* LinkedIn */}
            <Field>
              <FieldLabel htmlFor="linkedinUrl">LinkedIn</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="linkedinUrl"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  {...register("linkedinUrl")}
                  aria-invalid={!!errors.linkedinUrl}
                  aria-describedby={
                    errors.linkedinUrl ? "linkedinUrl-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <LinkedinLogoIcon size={16} />
                </InputGroupAddon>
              </InputGroup>
              {errors.linkedinUrl?.message && (
                <FieldError id="linkedinUrl-error" role="alert">
                  {errors.linkedinUrl.message}
                </FieldError>
              )}
            </Field>

            {/* GitHub */}
            <Field>
              <FieldLabel htmlFor="githubUrl">GitHub</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="githubUrl"
                  type="url"
                  placeholder="https://github.com/username"
                  {...register("githubUrl")}
                  aria-invalid={!!errors.githubUrl}
                  aria-describedby={
                    errors.githubUrl ? "githubUrl-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <GithubLogoIcon size={16} />
                </InputGroupAddon>
              </InputGroup>
              {errors.githubUrl?.message && (
                <FieldError id="githubUrl-error" role="alert">
                  {errors.githubUrl.message}
                </FieldError>
              )}
            </Field>

            {/* Website */}
            <Field>
              <FieldLabel htmlFor="websiteUrl">Website</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="websiteUrl"
                  type="url"
                  placeholder="https://yourdomain.com"
                  {...register("websiteUrl")}
                  aria-invalid={!!errors.websiteUrl}
                  aria-describedby={
                    errors.websiteUrl ? "websiteUrl-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <Globe className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.websiteUrl?.message && (
                <FieldError id="websiteUrl-error" role="alert">
                  {errors.websiteUrl.message}
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

export default AdminProfileContactForm
