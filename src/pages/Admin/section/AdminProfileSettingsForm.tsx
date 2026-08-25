import { useUpdateProfileSettings } from "@/hooks/useProfile"
import type { Profile } from "@/types/profile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Loader2 } from "lucide-react"

function AdminProfileSettingsForm({
  openToWork,
}: {
  openToWork: Profile["openToWork"]
}) {
  const { mutate: updateProfileSettings, isPending } =
    useUpdateProfileSettings()
  const [optimisticChecked, setOptimisticChecked] = useState<boolean>()
  const checked = optimisticChecked ?? openToWork

  const handleToggle = (value: boolean) => {
    setOptimisticChecked(value)
    updateProfileSettings(
      { openToWork: value },
      {
        onSuccess: () => {
          setOptimisticChecked(undefined)
        },
        onError: () => {
          setOptimisticChecked(undefined)
        },
      }
    )
  }

  return (
    <section className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Settings</CardTitle>
          <CardDescription>
            Control visibility and availability on your portfolio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field
            orientation="horizontal"
            className="flex items-center justify-between"
          >
            <div>
              <FieldLabel htmlFor="openToWork">Open to work</FieldLabel>
              <FieldDescription>
                Shows an "open to work" badge on your public portfolio
              </FieldDescription>
            </div>
            <div className="flex items-center gap-2">
              {isPending && (
                <Loader2
                  className="h-4 w-4 animate-spin text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              <Switch
                id="openToWork"
                checked={checked}
                onCheckedChange={handleToggle}
                disabled={isPending}
              />
            </div>
          </Field>
        </CardContent>
      </Card>
    </section>
  )
}

export default AdminProfileSettingsForm
