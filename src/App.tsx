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
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
