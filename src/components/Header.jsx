import { Link } from 'react-router'

// Brand name on the left; an optional action (e.g. a back button) on the right.
export default function Header({ action }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <Link to="/" className="text-[19px] font-bold tracking-[-0.01em] text-plum no-underline">
        Olóri Bride House
      </Link>
      {action}
    </header>
  )
}