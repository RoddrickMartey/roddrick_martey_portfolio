import { useEffect, useState } from "react"
import { useForm, Controller, useWatch, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
import {
  updateProjectSchema,
  type UpdateProjectInput,
} from "@/schema/projectSchema"
import { useProject, useUpdateProject } from "@/hooks/useProjects"
import { useTechnologies } from "@/hooks/useTechnologies"
import { fileToBase64 } from "@/lib/fileToBase64"
import { validateFile } from "@/lib/validateFile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FolderGit2,
  Link as LinkIcon,
  Loader2,
  Upload,
  Image as ImageIcon,
} from "lucide-react"
import { GithubLogoIcon } from "@phosphor-icons/react"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"

function AdminProjectEdit() {
  const navigate = useNavigate()
  const { slug } = useParams<{ slug: string }>()

  const { data: project, isLoading: isLoadingProject } = useProject(slug ?? "")
  const { data: technologies } = useTechnologies()
  const { mutate: updateProject, isPending } = useUpdateProject()

  const [uploadedImagePreview, setUploadedImagePreview] = useState<
    string | null
  >(null)
  const [imageError, setImageError] = useState<string | null>(null)

  const imagePreview = uploadedImagePreview ?? project?.imageUrl ?? null

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UpdateProjectInput>({
    resolver: zodResolver(updateProjectSchema) as Resolver<UpdateProjectInput>,
    defaultValues: {
      title: "",
      summary: "",
      problem: "",
      approach: "",
      challenge: "",
      outcome: "",
      liveUrl: "",
      githubUrl: "",
      featured: false,
      published: true,
      order: 0,
      techIds: [],
    },
  })

  // Fixed React Hook Form / React Compiler warning by using useWatch
  const techIds = useWatch({ control, name: "techIds" }) ?? []

  // Populate the form once the project has loaded
  useEffect(() => {
    if (!project) return

    reset({
      title: project.title,
      summary: project.summary,
      problem: project.problem ?? "",
      approach: project.approach ?? "",
      challenge: project.challenge ?? "",
      outcome: project.outcome ?? "",
      liveUrl: project.liveUrl ?? "",
      githubUrl: project.githubUrl ?? "",
      featured: project.featured,
      published: project.published,
      order: project.order,
      techIds: project.techStack.map((entry) => entry.techId),
    })
  }, [project, reset])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file, {
      maxSizeMB: 5,
      allowedTypes: ["image/png", "image/jpeg", "image/webp"],
    })

    if (validationError) {
      setImageError(validationError)
      e.target.value = ""
      return
    }

    setImageError(null)
    const base64 = await fileToBase64(file)
    setValue("imageBase64", base64)
    setUploadedImagePreview(base64)
  }

  const toggleTech = (techId: string, checked: boolean) => {
    const current = techIds
    setValue(
      "techIds",
      checked ? [...current, techId] : current.filter((id) => id !== techId)
    )
  }

  if (isLoadingProject) {
    return (
      <section className="flex min-h-screen w-full items-center justify-center p-3">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </section>
    )
  }

  if (!project) {
    return (
      <section className="min-h-screen w-full space-y-2 p-3">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <p className="text-sm text-muted-foreground">
          This project may have been deleted or the link is incorrect.
        </p>
      </section>
    )
  }
  const formatedUpdateDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  const onSubmit = (input: UpdateProjectInput) => {
    updateProject(
      { id: project.id, input },
      {
        onSuccess: (update) => {
          toast.add({
            type: "info",
            title: `${update.title}`,
            description: `Updated on ${formatedUpdateDate(update.updatedAt)}`,
          })
          navigate(`/007/admin/projects`)
        },
      }
    )
  }
  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Edit project</h1>
        <p className="text-sm text-muted-foreground">Update {project.title}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Basics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basics</CardTitle>
            <CardDescription>
              Title and short summary shown on the project card
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="title"
                  placeholder="e.g. Martey Electronics Inventory System"
                  {...register("title")}
                  aria-invalid={!!errors.title}
                />
                <InputGroupAddon aria-hidden="true">
                  <FolderGit2 className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.title?.message && (
                <FieldError role="alert">{errors.title.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="summary">Summary</FieldLabel>
              <InputGroup>
                <Textarea
                  id="summary"
                  rows={2}
                  placeholder="One or two lines for the project card"
                  {...register("summary")}
                  aria-invalid={!!errors.summary}
                />
              </InputGroup>
              {errors.summary?.message && (
                <FieldError role="alert">{errors.summary.message}</FieldError>
              )}
            </Field>
          </CardContent>
        </Card>

        {/* Case study narrative */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Case study</CardTitle>
            <CardDescription>
              Optional — deeper narrative for featured projects
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="problem">Problem</FieldLabel>
              <Textarea
                className="border-dotted"
                id="problem"
                rows={3}
                {...register("problem")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="approach">Approach</FieldLabel>
              <Textarea id="approach" rows={3} {...register("approach")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="challenge">Challenge</FieldLabel>
              <Textarea id="challenge" rows={3} {...register("challenge")} />
            </Field>
            <Field>
              <FieldLabel htmlFor="outcome">Outcome</FieldLabel>
              <Textarea id="outcome" rows={3} {...register("outcome")} />
            </Field>
          </CardContent>
        </Card>

        {/* Links */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="liveUrl">Live URL</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="liveUrl"
                  placeholder="https://your-project.vercel.app"
                  {...register("liveUrl")}
                  aria-invalid={!!errors.liveUrl}
                />
                <InputGroupAddon aria-hidden="true">
                  <LinkIcon className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.liveUrl?.message && (
                <FieldError role="alert">{errors.liveUrl.message}</FieldError>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="githubUrl">GitHub URL</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="githubUrl"
                  placeholder="https://github.com/username/repo"
                  {...register("githubUrl")}
                  aria-invalid={!!errors.githubUrl}
                />
                <InputGroupAddon aria-hidden="true">
                  <GithubLogoIcon className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.githubUrl?.message && (
                <FieldError role="alert">{errors.githubUrl.message}</FieldError>
              )}
            </Field>
          </CardContent>
        </Card>

        {/* Tech stack */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tech stack</CardTitle>
            <CardDescription>Select the technologies used</CardDescription>
          </CardHeader>
          <CardContent>
            {technologies && technologies.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {technologies.map((tech) => (
                  <label
                    key={tech.id}
                    className="flex cursor-pointer items-center gap-2 bg-accent px-0.5 py-1.5 text-sm"
                  >
                    <Checkbox
                      checked={techIds.includes(tech.id)}
                      onCheckedChange={(checked) =>
                        toggleTech(tech.id, !!checked)
                      }
                    />
                    {tech.name}
                  </label>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No technologies yet — add some in the Tech Stack section first.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Image */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cover image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Project cover preview"
                className="h-40 w-full rounded-md object-cover"
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
                <ImageIcon className="h-8 w-8" aria-hidden="true" />
              </div>
            )}
            <div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                {imagePreview ? "Change image" : "Upload image"}
              </Button>
            </div>
            <input
              id="image-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="sr-only"
            />
            {imageError && <FieldError role="alert">{imageError}</FieldError>}
          </CardContent>
        </Card>

        {/* Visibility */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Visibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field
              orientation="horizontal"
              className="flex items-center justify-between"
            >
              <div>
                <FieldLabel htmlFor="published">Published</FieldLabel>
                <FieldDescription>
                  Visible on your public portfolio
                </FieldDescription>
              </div>
              <Controller
                name="published"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="published"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>

            <Field
              orientation="horizontal"
              className="flex items-center justify-between"
            >
              <div>
                <FieldLabel htmlFor="featured">Featured</FieldLabel>
                <FieldDescription>
                  Shown in the featured section
                </FieldDescription>
              </div>
              <Controller
                name="featured"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="featured"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </Field>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
          {isPending ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </section>
  )
}

export default AdminProjectEdit
