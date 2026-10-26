import { Link } from '@tanstack/react-router'

const linkBase = 'rounded-lg px-3 py-1.5 text-sm transition-colors'
const linkInactive = 'text-slate-400 hover:bg-slate-900 hover:text-slate-100'
const linkActive = 'bg-slate-900 text-slate-400'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-100 sm:text-base"
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
          Nexus Stream Engine
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className={linkBase}
            activeProps={{ className: linkActive }}
            inactiveProps={{ className: linkInactive }}
          >
            Dashboard
          </Link>
          <Link
            to="/analytics/$streamId"
            params={{ streamId: 'stream-01' }}
            className={linkBase}
            activeProps={{ className: linkActive }}
            inactiveProps={{ className: linkInactive }}
          >
            Analytics
          </Link>
        </div>
      </nav>
    </header>
  )
}
