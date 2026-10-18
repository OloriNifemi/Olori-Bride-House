import { Link, useLocation } from 'react-router'
import { Menu, Settings } from 'lucide-react'
import { findNavItem } from '../../config/navigation'

// The bar across the top: menu button (mobile), page title, today's date, settings.
export default function Topbar({ onOpenMenu }) {
  const { pathname } = useLocation()
  const current = findNavItem(pathname)

  const today = new Intl.DateTimeFormat('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-ivory/85 px-4 backdrop-blur sm:px-6 lg:px-10">
      <button
        type="button"
        onClick={onOpenMenu}
        className="grid h-11 w-11 place-items-center rounded-lg text-cocoa hover:bg-champagne lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={22} />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate font-serif text-2xl font-semibold leading-tight">
          {current?.label ?? 'Olóri Bride House'}
        </p>
        <p className="hidden text-xs text-muted sm:block">{today}</p>
      </div>

      <Link
        to="/settings"
        className="grid h-11 w-11 place-items-center rounded-lg text-muted transition-colors hover:bg-champagne hover:text-cocoa"
        aria-label="Settings"
      >
        <Settings size={20} strokeWidth={1.6} />
      </Link>
      <div
        className="grid h-10 w-10 place-items-center rounded-full bg-blush font-serif text-lg font-semibold text-rose-deep"
        aria-hidden="true"
      >
        O
      </div>
    </header>
  )
}