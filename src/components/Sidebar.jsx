
import {
  LayoutDashboard,
  Pill,
  Package,
  CalendarClock,
  AlertTriangle,
  History,
  FileBarChart,
  Settings,
  X
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Medicine Management', path: '/medicines', icon: Pill },
  { name: 'Stock & Batches', path: '/stock', icon: Package },
  { name: 'Expiry Management', path: '/expiry', icon: CalendarClock },
  { name: 'Low Stock Alerts', path: '/low-stock', icon: AlertTriangle },
  { name: 'Stock Transactions', path: '/transactions', icon: History },
  { name: 'Reports & Analytics', path: '/reports', icon: FileBarChart },
  { name: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
  className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-transform duration-300 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-transform duration-300 hover:scale-105">
  <Pill size={24} strokeWidth={2.2} />
</div>

            <div>
              <h1 className="text-xl font-bold text-slate-800">
                MediStock
              </h1>
              <p className="text-xs text-slate-500">
                Inventory Management
              </p>
            </div>
          </div>

          <button
  onClick={onClose}
  aria-label="Close sidebar"
  className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-800 lg:hidden"
>
  <X size={22} />
</button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <div className="mb-5 flex items-center justify-between px-3">
  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
    Main Menu
  </p>
  <span className="h-px flex-1 ml-3 bg-slate-100" />
</div>

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={onClose}
                className={({ isActive }) =>
  `relative group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
    isActive
      ? 'bg-emerald-50 text-emerald-700 shadow-sm before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-r-full before:bg-emerald-600'
      : 'text-slate-600 hover:translate-x-1 hover:bg-emerald-50/60 hover:text-emerald-700'
  }`
}
              >
                <Icon
  size={19}
  strokeWidth={2}
  className="shrink-0 transition-transform duration-300 group-hover:scale-110"
/>
                {item.name}
              </NavLink>
            )
          })}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
  <div className="flex items-center justify-between">
    <p className="text-sm font-bold text-emerald-900">
      MediStock Workspace
    </p>

    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
    </span>
  </div>

  <p className="mt-2 text-xs leading-relaxed text-slate-500">
    Smart medicine inventory management
  </p>

  <div className="mt-3 border-t border-emerald-100 pt-2">
    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
      Workspace Active
    </p>
  </div>
</div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
