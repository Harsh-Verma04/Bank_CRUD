import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 xl:w-72 flex-col gap-4 p-4 glass">
      <div className="text-xl font-semibold tracking-wide text-cyan-300">Banking</div>
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 border ${
              isActive ? 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10' : 'border-transparent text-gray-300 hover:text-white hover:border-white/10'
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            `block rounded-md px-3 py-2 border ${
              isActive ? 'border-cyan-400/40 text-cyan-300 bg-cyan-500/10' : 'border-transparent text-gray-300 hover:text-white hover:border-white/10'
            }`
          }
        >
          Create Account
        </NavLink>
      </nav>
    </aside>
  )
}
