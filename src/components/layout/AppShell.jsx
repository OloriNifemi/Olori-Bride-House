import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

const COLLAPSE_KEY = 'olori.sidebarCollapsed'

// The frame around every page: sidebar + top bar + the current page (<Outlet />).
export default function AppShell() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Remember whether the sidebar was collapsed, even after a refresh.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(COLLAPSE_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(COLLAPSE_KEY, String(collapsed))
    } catch {
      /* storage unavailable — the preference just won't persist */
    }
  }, [collapsed])

  // Close the mobile menu with the Escape key.
  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return (
    <div className="min-h-screen lg:flex">
      {/* Keyboard users can jump straight to the page content */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-cocoa focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      {/* Dimmed backdrop behind the mobile menu */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 animate-fade-in bg-cocoa/30 backdrop-blur-[2px] lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onOpenMenu={() => setMobileOpen(true)} />
        <main id="main" className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          {/* key = re-runs the fade-in each time the page changes */}
          <div key={location.pathname} className="mx-auto max-w-6xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}