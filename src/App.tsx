import { Routes, Route } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin"
import NotFound from "./pages/NotFound"
import AdminLayout from "./pages/Admin/layout/AdminLayout"
import ProtectAdmin from "./pages/Admin/layout/ProtectAdmin"
import AdminHome from "./pages/Admin/AdminHome"
import AdminProfile from "./pages/Admin/AdminProfile"
import AdminProject from "./pages/Admin/AdminProject"
import AdminProjectCreate from "./pages/Admin/AdminProjectCreate"
import ProjectView from "./pages/Portfolio/ProjectView"
import AdminProjectEdit from "./pages/Admin/AdminProjectEdit"
import AdminExperience from "./pages/Admin/AdminExperience"
import AdminCertification from "./pages/Admin/AdminCertification"
import AdminEducation from "./pages/Admin/AdminEducation"
import AdminSkills from "./pages/Admin/AdminSkills"
import AdminTechnology from "./pages/Admin/AdminTechnology"
import AdminMessages from "./pages/Admin/AdminMessages"
import MainPage from "./pages/Portfolio/MainPage"
import MainLayout from "./pages/Portfolio/layout/MainLayout"

export function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:slug" element={<ProjectView />} />
      </Route>
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
          <Route path="/007/admin/experiences" element={<AdminExperience />} />
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
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
