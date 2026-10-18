import { Link } from 'react-router'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { btnPrimary } from '../components/ui/buttonStyles'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-[1120px] flex-1 px-6 pt-7">
        <Header />
        <div className="mx-auto mt-16 max-w-[560px] text-center">
          <h1 className="text-[32px] font-semibold tracking-[-0.02em]">Page not found</h1>
          <p className="mt-2 text-plum-soft">That page doesn’t exist.</p>
          <Link to="/" className={`${btnPrimary} mt-6`}>Back to home</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}