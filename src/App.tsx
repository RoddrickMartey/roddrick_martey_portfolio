import { Routes, Route } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin"
import NotFound from "./pages/NotFound"
import AdminLayout from "./pages/Admin/layout/AdminLayout"
import ProtectAdmin from "./pages/Admin/layout/ProtectAdmin"
import AdminHome from "./pages/Admin/AdminHome"
import AdminProfile from "./pages/Admin/AdminProfile"
export function App() {
  return (
    <Routes>
      <Route element={<ProtectAdmin />}>
        <Route element={<AdminLayout />}>
          <Route path="/007/admin/profile" element={<AdminProfile />} />
          <Route path="/007/admin/dashboard" element={<AdminHome />} />
        </Route>
      </Route>
      <Route path="/007/admin/login" element={<AdminLogin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
