import { Routes, Route, Outlet, useLocation, Link } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import RouteMeta from './components/RouteMeta'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import ReservePage from './pages/ReservePage'
import NotFound from './pages/NotFound'
import { btnOutlineSmall } from './components/ui/buttonStyles'

// One shared layout for every page. The header lives here, outside any page
// container, so it spans the full screen and is identical everywhere.
function Layout() {
  const { pathname } = useLocation()

  // The "Back to packages" button only appears on reservation pages.
  const action = pathname.startsWith('/reserve/') ? (
    <Link
      to="/"
      state={{ tab: 'pricing', scrollTo: 'services-pricing' }}
      className={btnOutlineSmall}
    >
      <ChevronLeft size={16} aria-hidden="true" />
      Back to packages
    </Link>
  ) : null

  return (
    <div className="flex min-h-screen flex-col">
      <Header action={action} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <>
      <RouteMeta />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/reserve/:packageId" element={<ReservePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}