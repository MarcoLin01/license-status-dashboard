import Header from '@/components/Header.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="layout mt-5 w-full p-5">
      <Header />
        {children}
      <Outlet />
    </div>
  )
}
