
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

const pageTitles = {
  '/': 'Dashboard',
  '/medicines': 'Medicine Management',
  '/stock': 'Stock Management',
  '/expiry': 'Expiry Management',
  '/low-stock': 'Low Stock Alerts',
  '/transactions': 'Stock Transactions',
  '/reports': 'Inventory Reports',
  '/settings': 'Settings',
}

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const location = useLocation()

  const pageTitle = pageTitles[location.pathname] || 'MediStock'

  return (
    <div className="min-h-screen bg-slate-50">

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-64">

        <Header
          pageTitle={pageTitle}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default MainLayout
