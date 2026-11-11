
import { Menu, Search, Bell, ChevronDown } from 'lucide-react'

function Header({ onMenuClick, pageTitle }) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">

      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {pageTitle}
          </h2>
          <p className="hidden text-xs text-slate-500 sm:block">
            Manage your pharmacy inventory
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">

        <div className="hidden items-center rounded-xl border border-slate-200 px-3 py-2 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search medicines..."
            className="w-40 bg-transparent pl-2 text-sm outline-none lg:w-56"
          />
        </div>

        <button className="relative rounded-full p-2 text-slate-600 hover:bg-slate-100">
          <Bell size={21} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>
            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown size={16} className="hidden text-slate-400 sm:block" />
        </div>

      </div>
    </header>
  )
}

export default Header
