import { Link } from 'react-router'
import { btnPrimary } from '../components/ui/buttonStyles'

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1120px] px-6 pb-24 pt-10">
      <div className="mx-auto max-w-[560px] text-center">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em]">Page not found</h1>
        <p className="mt-2 text-plum-soft">That page doesn’t exist.</p>
        <Link to="/" className={`${btnPrimary} mt-6`}>Back to home</Link>
      </div>
    </div>
  )
}