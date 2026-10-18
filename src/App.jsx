import { Routes, Route } from 'react-router'
import LandingPage from './pages/LandingPage'
import ReservePage from './pages/ReservePage'
import NotFound from './pages/NotFound'

// The pages of the website.
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reserve/:packageId" element={<ReservePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}