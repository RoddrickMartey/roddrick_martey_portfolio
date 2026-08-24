import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { adminLoginSchema, type AdminLoginInput } from "@/schema/adminSchema"
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
import { Key, LogIn, Loader2, Eye, EyeClosed } from "lucide-react"
import authApi from "@/api/authApi"
import { isAxiosError } from "axios"
import { useState } from "react"
import { useAdminStore } from "@/store/adminStore"
import { useNavigate } from "react-router-dom"

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const { setAdmin } = useAdminStore()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    mode: "onChange", // Validates on change to dynamically control the submit button
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = async (data: AdminLoginInput) => {
    // Log the form values
    console.log("Form Submitted:", data)
    try {
      const res = await authApi.login(data.email, data.password)
      console.log("Login successful:", res)
      setAdmin(res)
      navigate("/007/admin/dashboard") // Redirect to the admin home page after successful login
    } catch (error) {
      if (isAxiosError(error)) {
        console.error("Login failed:", error.response?.data)
      }
      console.error("Login failed:", error)
    }
  }

  return (
    <main
      className="flex min-h-screen w-full items-center justify-center p-4"
      id="admin-login"
    >
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Login to your account</CardTitle>
          <CardDescription>
            Enter your email and password below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                <InputGroupAddon aria-hidden="true">
                  <LogIn className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.email?.message && (
                <FieldError id="email-error" role="alert">
                  {errors.email.message}
                </FieldError>
              )}
            </Field>

            {/* Password Field */}
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register("password")}
                  aria-invalid={!!errors.password}
                  aria-describedby={
                    errors.password ? "password-error" : undefined
                  }
                />
                <InputGroupAddon aria-hidden="true">
                  <Key className="h-4 w-4" />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    title={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosed className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                </InputGroupAddon>
              </InputGroup>
              {errors.password?.message && (
                <FieldError id="password-error" role="alert">
                  {errors.password.message}
                </FieldError>
              )}
            </Field>

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                  <span>Logging in...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

export default AdminLogin
