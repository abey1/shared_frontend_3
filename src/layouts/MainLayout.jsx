import { Outlet } from 'react-router-dom'

/** Layout shell only; each page supplies Navbar6 / Footer1 (or legacy pages add their own chrome). */
export default function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col">
      <Outlet />
    </div>
  )
}
