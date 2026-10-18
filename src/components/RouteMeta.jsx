import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { PACKAGES, SITE } from '../config/site'

// Sets the browser tab title per page, and hides non-landing pages from search engines.
// The home page uses the title and tags already in index.html.
export default function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === '/') return

    const match = pathname.match(/^\/reserve\/([^/]+)$/)
    const pkg = match && PACKAGES.find((p) => p.id === match[1])
    const title = pkg ? `Reserve ${pkg.name} | ${SITE.name}` : `Page not found | ${SITE.name}`

    const previousTitle = document.title
    document.title = title

    const robots = document.querySelector('meta[name="robots"]')
    const previousRobots = robots?.getAttribute('content')
    robots?.setAttribute('content', 'noindex, follow')

    // Restore the home page values when leaving this page
    return () => {
      document.title = previousTitle
      if (robots && previousRobots) robots.setAttribute('content', previousRobots)
    }
  }, [pathname])

  return null
}