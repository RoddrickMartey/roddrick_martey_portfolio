import { lazy, Suspense, useEffect } from "react"
import { Outlet, Routes, Route } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { clearAdminSession } from "./lib/clearAdminSession"
import { ResourceLoader } from "./components/resource-loader"
import NotFound from "./pages/NotFound"
import ProjectView from "./pages/Portfolio/ProjectView"
import MainPage from "./pages/Portfolio/MainPage"
import Projects from "./pages/Portfolio/Projects"
import About from "./pages/Portfolio/About"
import Contact from "./pages/Portfolio/Contact"
import MainLayout from "./pages/Portfolio/layout/MainLayout"

const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"))
const AdminLayout = lazy(() => import("./pages/Admin/layout/AdminLayout"))
const ProtectAdmin = lazy(() => import("./pages/Admin/layout/ProtectAdmin"))
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"))
const AdminProfile = lazy(() => import("./pages/Admin/AdminProfile"))
const AdminProject = lazy(() => import("./pages/Admin/AdminProject"))
const AdminProjectCreate = lazy(
  () => import("./pages/Admin/AdminProjectCreate")
)
const AdminProjectEdit = lazy(() => import("./pages/Admin/AdminProjectEdit"))
const AdminExperience = lazy(() => import("./pages/Admin/AdminExperience"))
const AdminCertification = lazy(
  () => import("./pages/Admin/AdminCertification")
)
const AdminEducation = lazy(() => import("./pages/Admin/AdminEducation"))
const AdminSkills = lazy(() => import("./pages/Admin/AdminSkills"))
const AdminTechnology = lazy(() => import("./pages/Admin/AdminTechnology"))
const AdminMessages = lazy(() => import("./pages/Admin/AdminMessages"))
const AdminLogs = lazy(() => import("./pages/Admin/AdminLogs"))

function AdminSuspenseBoundary() {
  return (
    <Suspense fallback={<ResourceLoader message="Loading admin" />}>
      <Outlet />
    </Suspense>
  )
}

export function App() {
  const navigate = useNavigate()
  useEffect(() => {
    const handleSessionExpired = () => {
      clearAdminSession()
      if (window.location.pathname.startsWith("/007/admin")) {
        navigate("/007/admin/login", { replace: true })
      }
    }

    window.addEventListener("admin:session-expired", handleSessionExpired)
    return () =>
      window.removeEventListener("admin:session-expired", handleSessionExpired)
  }, [navigate])

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectView />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route element={<AdminSuspenseBoundary />}>
        <Route path="/007/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectAdmin />}>
          <Route element={<AdminLayout />}>
            <Route path="/007/admin/profile" element={<AdminProfile />} />
            <Route path="/007/admin/dashboard" element={<AdminHome />} />
            <Route path="/007/admin/projects" element={<AdminProject />} />
            <Route
              path="/007/admin/projects/create"
              element={<AdminProjectCreate />}
            />
            <Route
              path="/007/admin/projects/edit/:slug"
              element={<AdminProjectEdit />}
            />
            <Route
              path="/007/admin/experiences"
              element={<AdminExperience />}
            />
            <Route
              path="/007/admin/certifications"
              element={<AdminCertification />}
            />
            <Route path="/007/admin/education" element={<AdminEducation />} />
            <Route path="/007/admin/skills" element={<AdminSkills />} />
            <Route
              path="/007/admin/skills/categories"
              element={<AdminSkills />}
            />
            <Route path="/007/admin/tech" element={<AdminTechnology />} />
            <Route path="/007/admin/messages" element={<AdminMessages />} />
            <Route path="/007/admin/logs" element={<AdminLogs />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
