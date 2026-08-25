import { useProfile } from "@/hooks/useProfile"
import AdminProfileBasicForm from "./section/AdminProfileBasicForm"
import AdminProfileContactForm from "./section/AdminProfileContactForm"
import AdminProfileSettingsForm from "./section/AdminProfileSettingsForm"
import AdminProfileResumeForm from "./section/AdminProfileResumeForm"
import { ResourceError } from "@/components/resource-error"
import { ResourceLoader } from "@/components/resource-loader"
import AdminProfileAvatarForm from "./section/AdminProfileAvatarForm"

function AdminProfile() {
  const { data: profile, isLoading, isError } = useProfile()

  if (isLoading) {
    return <ResourceLoader message="Fetching Profile" fullScreen />
  }

  if (isError) {
    return (
      <ResourceError
        title="Failed to load profile"
        description="An unexpected error occurred while fetching the profile. Please try again."
      />
    )
  }

  if (!profile) {
    return (
      <ResourceError
        title="Profile not found"
        description="The requested profile could not be found."
      />
    )
  }

  return (
    <section className="min-h-screen w-full space-y-6 p-3">
      <div>
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your public profile information
        </p>
      </div>

      <div className="grid w-full gap-4 lg:grid-cols-3">
        <AdminProfileAvatarForm
          avatarUrl={profile.avatarUrl}
          fullName={profile.fullName}
        />
        <AdminProfileResumeForm resumeUrl={profile.resumeUrl} />
        <AdminProfileSettingsForm openToWork={profile.openToWork} />
      </div>

      <AdminProfileBasicForm
        fullName={profile.fullName}
        title={profile.title}
        summary={profile.summary}
        location={profile.location}
        nationality={profile.nationality}
      />

      <AdminProfileContactForm
        email={profile.email}
        phone={profile.phone}
        linkedinUrl={profile.linkedinUrl}
        githubUrl={profile.githubUrl}
        websiteUrl={profile.websiteUrl}
      />
    </section>
  )
}

export default AdminProfile
