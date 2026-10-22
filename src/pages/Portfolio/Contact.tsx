import { zodResolver } from "@hookform/resolvers/zod"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { useState, type BaseSyntheticEvent } from "react"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { getApiErrorMessage } from "@/lib/apiError"
import {
  publicContactSchema,
  type PublicContactFormValues,
} from "@/schema/publicContactSchema"
import { usePublicContact, useSubmitPublicContact } from "@/hooks/usePublic"
import { ArrowUpRight } from "lucide-react"
import { optimizeImage } from "@/lib/optimizeImage"
import { safeHttpUrl } from "@/lib/safeHttpUrl"
import { PublicEmpty } from "@/components/PublicEmpty"
import { PublicError } from "@/components/PublicError"
import { PublicLoader } from "@/components/PublicLoader"

const emptyValues: PublicContactFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
}

function Contact() {
  const {
    data: contact,
    isLoading,
    isError,
    refetch,
    isRefetching,
  } = usePublicContact()
  const { mutate: submitContact, isPending } = useSubmitPublicContact()
  const [isSubmitLocked, setIsSubmitLocked] = useState(false)
  const form = useForm<PublicContactFormValues>({
    resolver: zodResolver(publicContactSchema),
    defaultValues: emptyValues,
  })

  const onSubmit = (
    values: PublicContactFormValues,
    event?: BaseSyntheticEvent
  ) => {
    const formElement = event?.currentTarget as HTMLFormElement | undefined
    const honeypot = formElement?.elements.namedItem(
      "website"
    ) as HTMLInputElement | null

    if (isSubmitLocked || honeypot?.value || isPending) {
      if (honeypot?.value) {
        form.reset(emptyValues)
      }
      return
    }

    setIsSubmitLocked(true)
    submitContact(values, {
      onSuccess: () => {
        setIsSubmitLocked(false)
        form.reset(emptyValues)
        toast.add({
          type: "success",
          title: "Message sent",
          description: "Thanks for reaching out. I will get back to you soon.",
        })
      },
      onError: (submitError) => {
        setIsSubmitLocked(false)
        toast.add({
          type: "error",
          title: "Could not send message",
          description: getApiErrorMessage(
            submitError,
            "Please try again in a moment."
          ),
        })
      },
    })
  }

  const contactItems = [
    {
      label: "Email",
      value: contact?.email,
      icon: Mail,
      href: contact?.email ? `mailto:${contact.email}` : undefined,
    },
    {
      label: "Location",
      value: contact?.location,
      icon: MapPin,
      href: undefined,
    },
    {
      label: "Phone",
      value: contact?.phone,
      icon: Phone,
      href: contact?.phone ? `tel:${contact.phone}` : undefined,
    },
  ].filter((item): item is typeof item & { value: string } =>
    Boolean(item.value)
  )

  const socialItems = [
    { label: "LinkedIn", href: safeHttpUrl(contact?.linkedinUrl) },
    { label: "GitHub", href: safeHttpUrl(contact?.githubUrl) },
  ].filter((item): item is { label: string; href: string } =>
    Boolean(item.href)
  )

  return (
    <main className="relative min-h-screen w-full overflow-hidden px-6 py-28 sm:px-8 lg:px-12">
      <title>Contact | Roddrick Martey Anum</title>
      <meta
        name="description"
        content="Get in touch with Roddrick Martey Anum about a project, opportunity, or question."
      />
      {/* Background Layer: Top section header overlay with light blur and gradient fade */}
      <div
        aria-hidden="true"
        className="mask-image-[linear-gradient(to_bottom,black_60%,transparent_100%)] pointer-events-none absolute inset-x-0 -top-5 -left-10 -z-10 h-full bg-cover bg-top bg-no-repeat opacity-40"
        style={{
          backgroundImage: `url('${optimizeImage("https://res.cloudinary.com/dtehqyxpu/image/upload/v1788824576/45045ecdd11da3a63c601c120a738a25_zm0yp6.png", { width: 1920 })}')`,
        }}
      />

      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl animate-in duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
          <p className="mb-3 text-sm font-medium tracking-[0.18em] text-primary uppercase">
            Contact
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Let&apos;s make something useful.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Have a project, an opportunity, or a thoughtful question? Send a
            message and I&apos;ll be in touch.
          </p>
        </header>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <aside className="animate-in space-y-8 duration-700 fade-in slide-in-from-left-8 motion-reduce:animate-none">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Reach me
              </p>
              <div className="mt-5 space-y-5">
                {isLoading && !contact ? (
                  <PublicLoader
                    message="Loading contact details..."
                    fullScreen={false}
                    className="min-h-0 px-0 py-0"
                  />
                ) : isError && !contact ? (
                  <PublicError
                    title="Contact details are taking a moment"
                    description="Contact details could not be loaded just now. Please try again."
                    onRetry={() => void refetch()}
                    isRetrying={isRefetching}
                    fullScreen={false}
                    className="min-h-0 px-0 py-0"
                  />
                ) : contactItems.length > 0 ? (
                  contactItems.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-secondary text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground motion-reduce:transition-none">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-xs text-muted-foreground">
                            {item.label}
                          </p>
                          <p className="mt-0.5 text-sm font-medium wrap-break-word">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group block rounded-md hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label}>{content}</div>
                    )
                  })
                ) : (
                  <PublicEmpty
                    title="No contact details listed"
                    description="Contact information is not available here yet."
                    fullScreen={false}
                    className="min-h-0 px-0 py-0"
                  />
                )}
              </div>
            </div>

            {socialItems.length > 0 && (
              <div className="border-t border-border pt-6">
                <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  {socialItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-medium text-secondary-foreground hover:text-primary hover:underline"
                    >
                      {item.label} <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </aside>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="animate-in space-y-6 border border-border bg-card/90 p-6 backdrop-blur-xs delay-150 duration-700 fade-in slide-in-from-right-8 motion-reduce:animate-none sm:p-8"
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              className="absolute -left-[9999px] h-px w-px overflow-hidden"
            />
            <div className="grid gap-6 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="contact-name">Name</FieldLabel>
                <Input
                  id="contact-name"
                  placeholder="Your name"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <FieldError>{form.formState.errors.name.message}</FieldError>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="contact-email">Email</FieldLabel>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="you@example.com"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <FieldError>{form.formState.errors.email.message}</FieldError>
                )}
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor="contact-subject">Subject</FieldLabel>
              <Input
                id="contact-subject"
                placeholder="What would you like to talk about?"
                {...form.register("subject")}
              />
              {form.formState.errors.subject && (
                <FieldError>{form.formState.errors.subject.message}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="contact-message">Message</FieldLabel>
              <Textarea
                id="contact-message"
                rows={7}
                placeholder="Tell me a little about it..."
                {...form.register("message")}
              />
              {form.formState.errors.message && (
                <FieldError>{form.formState.errors.message.message}</FieldError>
              )}
            </Field>
            <Button type="submit" size="lg" disabled={isPending}>
              <Send className="mr-2 h-4 w-4" />
              {isPending ? "Sending..." : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default Contact
