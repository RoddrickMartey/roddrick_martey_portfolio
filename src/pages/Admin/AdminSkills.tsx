import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  useCreateSkill,
  useCreateSkillCategory,
  useDeleteSkill,
  useDeleteSkillCategory,
  useSkillCategories,
  useSkills,
  useUpdateSkill,
  useUpdateSkillCategory,
} from "@/hooks/useSkills"
import {
  createSkillCategorySchema,
  createSkillSchema,
  type SkillCategoryFormValues,
  type SkillFormValues,
} from "@/schema/skillSchema"

const categoryDefaults: SkillCategoryFormValues = {
  name: "",
  order: 0,
}

const skillDefaults: SkillFormValues = {
  name: "",
  categoryId: null,
  level: "BEGINNER",
  order: 0,
}

function AdminSkills() {
  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
    error: categoriesRequestError,
    refetch: refetchCategories,
    isRefetching: categoriesRefetching,
  } = useSkillCategories()

  const {
    data: skills,
    isLoading: skillsLoading,
    isError: skillsError,
    error: skillsRequestError,
    refetch: refetchSkills,
    isRefetching: skillsRefetching,
  } = useSkills()

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateSkillCategory()
  const { mutate: updateCategory } = useUpdateSkillCategory()
  const { mutate: deleteCategory, isPending: isDeletingCategory } =
    useDeleteSkillCategory()
  const { mutate: createSkill, isPending: isCreatingSkill } = useCreateSkill()
  const { mutate: updateSkill } = useUpdateSkill()
  const { mutate: deleteSkill, isPending: isDeletingSkill } = useDeleteSkill()

  const categoryForm = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(createSkillCategorySchema),
    defaultValues: categoryDefaults,
  })

  const skillForm = useForm<SkillFormValues>({
    resolver: zodResolver(createSkillSchema),
    defaultValues: skillDefaults,
  })
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingSkill, setEditingSkill] = useState<string | null>(null)
  const categoryEditForm = useForm<SkillCategoryFormValues>({
    resolver: zodResolver(createSkillCategorySchema),
    defaultValues: categoryDefaults,
  })
  const skillEditForm = useForm<SkillFormValues>({
    resolver: zodResolver(createSkillSchema),
    defaultValues: skillDefaults,
  })

  const isLoading = categoriesLoading || skillsLoading
  const isError = categoriesError || skillsError
  const error = categoriesRequestError || skillsRequestError

  const onCreateCategory = (values: SkillCategoryFormValues) => {
    createCategory(values, {
      onSuccess: () => {
        categoryForm.reset(categoryDefaults)
        toast.add({
          title: "Skill category created",
          description: "The skill category was added successfully.",
          type: "success",
        })
      },
      onError: (error) => {
        toast.add({
          title: "Could not create skill category",
          description: getApiErrorMessage(
            error,
            "The skill category could not be created. Please try again."
          ),
          type: "error",
        })
      },
    })
  }

  const onCreateSkill = (values: SkillFormValues) => {
    createSkill(
      {
        ...values,
        categoryId: values.categoryId ?? null,
      },
      {
        onSuccess: () => {
          skillForm.reset(skillDefaults)
          toast.add({
            title: "Skill created",
            description: "The skill was added successfully.",
            type: "success",
          })
        },
        onError: (error) => {
          toast.add({
            title: "Could not create skill",
            description: getApiErrorMessage(
              error,
              "The skill could not be created. Please try again."
            ),
            type: "error",
          })
        },
      }
    )
  }

  const onEditCategory = (id: string, name: string) => {
    categoryEditForm.reset({
      name,
      order: categories?.find((item) => item.id === id)?.order ?? 0,
    })
    setEditingCategory(id)
  }

  const onEditSkill = (id: string, values: SkillFormValues) => {
    skillEditForm.reset(values)
    setEditingSkill(id)
  }

  const onUpdateCategory = (values: SkillCategoryFormValues) => {
    if (!editingCategory) return
    updateCategory(
      { id: editingCategory, input: values },
      {
        onSuccess: () => {
          setEditingCategory(null)
          toast.add({
            title: "Skill category updated",
            description: "The skill category was updated successfully.",
            type: "success",
          })
        },
        onError: (error) =>
          toast.add({
            title: "Could not update skill category",
            description: getApiErrorMessage(
              error,
              "The skill category could not be updated."
            ),
            type: "error",
          }),
      }
    )
  }

  const onUpdateSkill = (values: SkillFormValues) => {
    if (!editingSkill) return
    updateSkill(
      { id: editingSkill, input: values },
      {
        onSuccess: () => {
          setEditingSkill(null)
          toast.add({
            title: "Skill updated",
            description: "The skill was updated successfully.",
            type: "success",
          })
        },
        onError: (error) =>
          toast.add({
            title: "Could not update skill",
            description: getApiErrorMessage(
              error,
              "The skill could not be updated."
            ),
            type: "error",
          }),
      }
    )
  }

  if (isLoading) {
    return <ResourceLoader message="Fetching skills" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load skills"
        description={
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while loading skills data."
        }
        onRetry={() => {
          refetchCategories()
          refetchSkills()
        }}
        isRetrying={categoriesRefetching || skillsRefetching}
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Skills</h1>
        <p className="text-sm text-muted-foreground">
          Manage categories and proficiency levels
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(!categories || categories.length === 0) && (
              <EmptyResource
                title="No skill categories"
                description="Create your first category to group your skill set."
                actionLabel="Add category"
                onAction={() => undefined}
              />
            )}

            {categories?.map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between gap-2 rounded-md border border-border p-2"
              >
                <span className="text-sm font-medium">{category.name}</span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEditCategory(category.id, category.name)}
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={isDeletingCategory}
                    onClick={() => deleteCategory(category.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New category</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={categoryForm.handleSubmit(onCreateCategory)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="category-name">Name</FieldLabel>
                <Input id="category-name" {...categoryForm.register("name")} />
                {categoryForm.formState.errors.name && (
                  <FieldError>
                    {categoryForm.formState.errors.name.message}
                  </FieldError>
                )}
              </Field>

              <Button
                type="submit"
                disabled={isCreatingCategory}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {isCreatingCategory ? "Saving..." : "Create category"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New skill</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={skillForm.handleSubmit(onCreateSkill)}
              className="space-y-4"
              noValidate
            >
              <Field>
                <FieldLabel htmlFor="skill-name">Skill</FieldLabel>
                <Input id="skill-name" {...skillForm.register("name")} />
                {skillForm.formState.errors.name && (
                  <FieldError>
                    {skillForm.formState.errors.name.message}
                  </FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="categoryId">Category</FieldLabel>
                <Select
                  value={skillForm.watch("categoryId") ?? ""}
                  onValueChange={(value) =>
                    skillForm.setValue("categoryId", value || null)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Uncategorized" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Uncategorized</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel htmlFor="level">Level</FieldLabel>
                <Select
                  value={skillForm.watch("level")}
                  onValueChange={(value) =>
                    skillForm.setValue(
                      "level",
                      value as SkillFormValues["level"]
                    )
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].map(
                      (level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </Field>

              <Button
                type="submit"
                disabled={isCreatingSkill}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {isCreatingSkill ? "Saving..." : "Create skill"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Skill inventory</CardTitle>
        </CardHeader>
        <CardContent>
          {!skills || skills.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No skills recorded yet.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <div
                  key={skill.id}
                  className="flex items-center gap-2 rounded-md border border-border px-3 py-2"
                >
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {skill.level}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      onEditSkill(skill.id, {
                        ...skill,
                        categoryId: skill.categoryId ?? null,
                        level: skill.level,
                        order: skill.order,
                      })
                    }
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    disabled={isDeletingSkill}
                    onClick={() => deleteSkill(skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit skill category</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={categoryEditForm.handleSubmit(onUpdateCategory)}
            className="space-y-4"
          >
            <Input
              {...categoryEditForm.register("name")}
              placeholder="Category name"
            />
            <Input
              type="number"
              {...categoryEditForm.register("order", { valueAsNumber: true })}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!editingSkill}
        onOpenChange={(open) => !open && setEditingSkill(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit skill</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={skillEditForm.handleSubmit(onUpdateSkill)}
            className="space-y-4"
          >
            <Input
              {...skillEditForm.register("name")}
              placeholder="Skill name"
            />
            <Select
              value={skillEditForm.watch("categoryId") ?? ""}
              onValueChange={(value) =>
                skillEditForm.setValue("categoryId", value || null)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Uncategorized" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Uncategorized</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={skillEditForm.watch("level")}
              onValueChange={(value) =>
                skillEditForm.setValue(
                  "level",
                  value as SkillFormValues["level"]
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"].map(
                  (level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingSkill(null)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default AdminSkills
