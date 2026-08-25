import { useRef, useState } from "react"
import { useUpdateProfileResume } from "@/hooks/useProfile"
import type { Profile } from "@/types/profile"
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
import { FieldError } from "@/components/ui/field"
import { FileText, Upload, Loader2, ExternalLink } from "lucide-react"
import { profileApi } from "@/api/profileApi"

function AdminProfileResumeForm({
  resumeUrl,
}: {
  resumeUrl: Profile["resumeUrl"]
}) {
  const { mutate: updateProfileResume, isPending } = useUpdateProfileResume()
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file, {
      maxSizeMB: 5,
      allowedTypes: ["application/pdf"],
    })

    if (validationError) {
      setError(validationError)
      e.target.value = "" // reset input so the same invalid file can be reselected
      return
    }

    setError(null)
    setFileName(file.name)

    try {
      const resumeBase64 = await fileToBase64(file)
      updateProfileResume(
        { resumeBase64 },
        {
          onError: () => {
            setError("Upload failed. Please try again.")
            setFileName(null)
          },
        }
      )
    } catch {
      setError("Could not read the file. Please try again.")
      setFileName(null)
    } finally {
      e.target.value = "" // allow re-selecting the same file later
    }
  }

  const handleDownloadResume = async () => {
    try {
      const resumeBlob = await profileApi.downloadResume()
      const url = window.URL.createObjectURL(resumeBlob)

      const link = document.createElement("a")
      link.href = url
      link.download = "Roddrick-Martey-Anum-Resume.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      window.URL.revokeObjectURL(url) // free memory
    } catch (error) {
      console.error("Error downloading resume:", error)
      setError("Could not download resume. Please try again.")
    }
  }

  return (
    <section className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg">Resume</CardTitle>
          <CardDescription>
            Upload a PDF version of your resume for visitors to download
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current resume status */}
          <div className="flex items-center justify-between rounded-md border border-border p-3">
            <div className="flex items-center gap-2 text-sm">
              <FileText
                className="h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              {resumeUrl ? (
                <Button
                  type="button"
                  variant="link"
                  onClick={handleDownloadResume}
                  className="flex items-center gap-1 underline underline-offset-2"
                >
                  Download resume
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </Button>
              ) : (
                <span className="text-muted-foreground">
                  No resume uploaded yet
                </span>
              )}
            </div>
          </div>

          {/* Upload control */}
          <div className="space-y-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              className="w-full sm:w-auto"
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
                  {resumeUrl ? "Replace resume" : "Upload resume"}
                </>
              )}
            </Button>
            <input
              ref={fileInputRef}
              id="resume-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              disabled={isPending}
              className="sr-only"
            />

            {fileName && !error && (
              <p className="text-xs text-muted-foreground">
                Selected: {fileName}
              </p>
            )}

            {error && <FieldError role="alert">{error}</FieldError>}

            <p className="text-xs text-muted-foreground">PDF only, up to 5MB</p>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default AdminProfileResumeForm
