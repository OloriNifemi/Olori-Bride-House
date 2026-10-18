import { Routes, Route } from 'react-router'
import AppShell from './components/layout/AppShell'
import ComingSoon from './pages/ComingSoon'
import NotFound from './pages/NotFound'
import { NAV_ITEMS } from './config/navigation'

// All the pages of the app. Every page sits inside AppShell (sidebar + top bar).
// As we build each module, its <ComingSoon> is replaced with the real page.
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        {NAV_ITEMS.map((item) =>
          item.path === '/' ? (
            <Route key={item.path} index element={<ComingSoon item={item} />} />
          ) : (
            <Route key={item.path} path={item.path.slice(1)} element={<ComingSoon item={item} />} />
          )
        )}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}