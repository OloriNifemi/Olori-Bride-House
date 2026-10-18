import { NavLink } from 'react-router'
import { Crown, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'
import { NAV_SECTIONS, SETTINGS_ITEM } from '../../config/navigation'

// The left-hand navigation.
// Desktop: always visible; can be collapsed to icons only.
// Mobile/tablet: slides in as a drawer when the menu button is pressed.
export default function Sidebar({ collapsed, onToggleCollapse, mobileOpen, onCloseMobile }) {
  // On desktop, collapsed mode hides labels visually but keeps them for screen readers.
  const labelClass = collapsed ? 'lg:sr-only' : ''

  function NavItem({ item }) {
    const Icon = item.icon
    return (
      <NavLink
        to={item.path}
        end={item.path === '/'}
        onClick={onCloseMobile}
        title={collapsed ? item.label : undefined}
        className={({ isActive }) =>
          `flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] transition-colors duration-200 ${
            isActive
              ? 'bg-cream font-medium text-rose shadow-soft'
              : 'text-muted hover:bg-cream/70 hover:text-cocoa'
          } ${collapsed ? 'lg:justify-center lg:px-0' : ''}`
        }
      >
        <Icon size={20} strokeWidth={1.6} className="shrink-0" aria-hidden="true" />
        <span className={labelClass}>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-champagne
        transition-[transform,width] duration-300 ease-out
        lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:visible
        ${collapsed ? 'lg:w-20' : 'lg:w-64'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full invisible'}`}
    >
      {/* Brand */}
      <div className={`flex h-16 items-center gap-3 border-b border-line px-5 ${collapsed ? 'lg:justify-center lg:px-0' : ''}`}>
        <Crown size={24} strokeWidth={1.5} className="shrink-0 text-gold" aria-hidden="true" />
        <div className={`min-w-0 flex-1 ${labelClass}`}>
          <p className="font-serif text-xl font-semibold leading-none">Olóri</p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">Bride House HQ</p>
        </div>
        <button
          type="button"
          onClick={onCloseMobile}
          className="grid h-11 w-11 place-items-center rounded-lg text-muted hover:bg-cream lg:hidden"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Sections */}
      <nav aria-label="Main navigation" className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <p className={`mb-2 px-3 text-xs uppercase tracking-[0.16em] text-muted ${collapsed ? 'lg:hidden' : ''}`}>
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavItem key={item.path} item={item} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom: settings + collapse toggle */}
      <div className="space-y-1 border-t border-line px-3 py-3">
        <NavItem item={SETTINGS_ITEM} />
        <button
          type="button"
          onClick={onToggleCollapse}
          className={`hidden min-h-11 w-full items-center gap-3 rounded-lg px-3 text-[15px] text-muted transition-colors hover:bg-cream/70 hover:text-cocoa lg:flex ${
            collapsed ? 'lg:justify-center lg:px-0' : ''
          }`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={20} strokeWidth={1.6} /> : <PanelLeftClose size={20} strokeWidth={1.6} />}
          <span className={labelClass}>Collapse</span>
        </button>
      </div>
    </aside>
  )
}