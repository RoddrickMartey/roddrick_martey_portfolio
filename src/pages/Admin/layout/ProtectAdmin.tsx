import { Outlet } from "react-router-dom"
import { useAdminStore } from "@/store/adminStore"
import NotFound from "@/pages/NotFound"

function ProtectAdmin() {
  const { isLoggedIn } = useAdminStore()

  if (!isLoggedIn) {
    return <NotFound />
  }

  return <Outlet />
}

export default ProtectAdmin
