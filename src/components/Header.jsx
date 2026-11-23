import { useEffect, useState } from 'react'
import { Link } from 'react-router'

// These point at sections on the home page.
const NAV = [
  { to: '/', label: 'Home' },
  { to: '/#services-pricing', label: 'Services' },
  { to: '/#contact', label: 'Contact' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose'

const desktopLink =
  'relative rounded text-[14px] font-medium tracking-wide text-plum-soft no-underline transition-colors hover:text-plum ' +
  'after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 ' +
  'after:bg-rose after:transition-transform after:duration-300 hover:after:scale-x-100 motion-reduce:after:transition-none'

// Full-width bar, rendered once in the layout (App.jsx) so it looks and
// behaves the same on every page.
// Logo on the far left; nav links and the optional action on the far right.
export default function Header({ action }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // While the menu is open: lock scroll, close on Escape,
  // and close if the screen grows to desktop size.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'

    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)

    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  const solid = scrolled || open

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-300',
          solid
            ? 'bg-blush-50/75 shadow-[0_1px_0_rgba(74,34,48,0.08)] backdrop-blur-xl'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex h-[68px] max-w-[1120px] items-center justify-between gap-6 px-6">
          {/* Wordmark: the O is solid while scrolled, transparent at the top */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2.5 rounded-full no-underline ${focusRing}`}
            aria-label="Olóri Bride House – home"
          >
            <span
              aria-hidden="true"
              className={[
                'grid h-9 w-9 place-items-center rounded-full border border-rose font-serif text-[16px] italic transition-colors duration-300',
                solid ? 'bg-rose text-white' : 'bg-transparent text-rose',
              ].join(' ')}
            >
              O
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[18px] font-bold tracking-[-0.01em] text-plum">
                Olóri
              </span>
              <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.28em] text-plum-soft">
                Bride House
              </span>
            </span>
          </Link>

          {/* Far right: nav links, then the action, then the menu button */}
          <div className="flex items-center gap-8">
            <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
              {NAV.map(({ to, label }) => (
                <Link key={to} to={to} className={`${desktopLink} ${focusRing}`}>
                  {label}
                </Link>
              ))}
            </nav>

            {action && <div className="hidden sm:block">{action}</div>}

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={`relative grid h-10 w-10 place-items-center rounded-full lg:hidden ${focusRing}`}
            >
              <span
                className={`absolute h-px w-5 bg-plum transition-transform duration-300 motion-reduce:transition-none ${
                  open ? 'rotate-45' : '-translate-y-1.5'
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-plum transition-opacity duration-200 motion-reduce:transition-none ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-plum transition-transform duration-300 motion-reduce:transition-none ${
                  open ? '-rotate-45' : 'translate-y-1.5'
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen menu for mobile and tablet. Kept outside <header> so the
          bar's backdrop-blur doesn't change what "fixed" is relative to. */}
      <div
        id="mobile-menu"
        className={[
          'fixed inset-0 z-40 bg-blush-100 transition-opacity duration-300 motion-reduce:transition-none lg:hidden',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        ].join(' ')}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-full max-w-[1120px] flex-col gap-1 overflow-y-auto px-6 pb-10 pt-28"
        >
          {NAV.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={`border-b border-plum/10 py-4 font-serif text-2xl text-plum no-underline ${focusRing}`}
            >
              {label}
            </Link>
          ))}
          {action && <div className="pt-6 sm:hidden">{action}</div>}
        </nav>
      </div>
    </>
  )
}