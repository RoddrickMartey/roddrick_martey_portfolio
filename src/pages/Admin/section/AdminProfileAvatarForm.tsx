import { useRef, useState } from "react"
import { useUpdateProfileAvatar } from "@/hooks/useProfile"
import type { Profile } from "@/types/profile"
import { validateFile } from "@/lib/validateFile"
import AvatarCropDialog from "../components/AvatarCropDialog"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Upload, Loader2 } from "lucide-react"
import { useAdminStore } from "@/store/adminStore"

function AdminProfileAvatarForm({
  avatarUrl,
  fullName,
}: {
  avatarUrl: Profile["avatarUrl"]
  fullName: Profile["fullName"]
}) {
  const { mutate: updateProfileAvatar, isPending } = useUpdateProfileAvatar()
  const [error, setError] = useState<string | null>(null)
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateAdmin } = useAdminStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file, {
      maxSizeMB: 5,
      allowedTypes: ["image/png", "image/jpeg", "image/webp"],
    })

    if (validationError) {
      setError(validationError)
      e.target.value = ""
      return
    }

    setError(null)
    const objectUrl = URL.createObjectURL(file)
    setRawImageSrc(objectUrl)
    e.target.value = ""
  }

  const handleCropComplete = (croppedBase64: string) => {
    updateProfileAvatar(
      { avatarBase64: croppedBase64 },
      {
        onSuccess: (updatedProfile) => {
          setRawImageSrc(null)
          updateAdmin({ avatar: updatedProfile.avatarUrl })
        },
        onError: () => {
          setError("Upload failed. Please try again.")
        },
      }
    )
  }

  const handleCloseDialog = () => {
    if (rawImageSrc) URL.revokeObjectURL(rawImageSrc)
    setRawImageSrc(null)
  }

  return (
    <section className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Profile photo</CardTitle>
          <CardDescription>
            Shown in the site header and your public profile
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarUrl ?? undefined} alt={fullName} />
            <AvatarFallback className="text-lg">
              {fullName?.charAt(0) ?? "A"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => fileInputRef.current?.click()}
            >
              {isPending ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" aria-hidden="true" />
                  {avatarUrl ? "Change photo" : "Upload photo"}
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="sr-only"
            />
            <p className="text-xs text-muted-foreground">
              PNG, JPEG, or WebP — up to 5MB
            </p>
            {error && <FieldError role="alert">{error}</FieldError>}
          </div>
        </CardContent>
      </Card>

      {rawImageSrc && (
        <AvatarCropDialog
          open={!!rawImageSrc}
          imageSrc={rawImageSrc}
          onClose={handleCloseDialog}
          onCropComplete={handleCropComplete}
          isSaving={isPending}
        />
      )}
    </section>
  )
}

export default AdminProfileAvatarForm
