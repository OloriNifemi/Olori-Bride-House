import {
  LayoutDashboard,
  Users,
  CalendarHeart,
  ListChecks,
  SquareCheckBig,
  Store,
  Lightbulb,
  Gem,
  Wallet,
  ChartColumn,
  Settings,
} from 'lucide-react'

// Every section of the app, grouped as they appear in the sidebar.
// `phase` = the build phase in which the section becomes fully working.
export const NAV_SECTIONS = [
  {
    label: 'Overview',
    items: [
      {
        path: '/',
        label: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Your business at a glance: leads, weddings, tasks and money.',
        phase: 8,
      },
    ],
  },
  {
    label: 'Brides & Weddings',
    items: [
      {
        path: '/clients',
        label: 'Clients & Leads',
        icon: Users,
        description: 'Every bride, enquiry and conversation in one place.',
        phase: 2,
      },
      {
        path: '/bookings',
        label: 'Bookings & Weddings',
        icon: CalendarHeart,
        description: 'Confirmed weddings, dates, venues, schedules and payments.',
        phase: 5,
      },
      {
        path: '/checklists',
        label: 'Bridal Checklists',
        icon: ListChecks,
        description: 'Package-based operations checklists for each booking.',
        phase: 6,
      },
    ],
  },
  {
    label: 'Daily Work',
    items: [
      {
        path: '/tasks',
        label: 'Tasks & Follow-ups',
        icon: SquareCheckBig,
        description: 'What needs doing today, what is coming up and what is overdue.',
        phase: 3,
      },
      {
        path: '/vendors',
        label: 'Vendors & Referrals',
        icon: Store,
        description: 'Wedding planners and service providers in your referral network.',
        phase: 3,
      },
      {
        path: '/ideas',
        label: 'Ideas Bank',
        icon: Lightbulb,
        description: 'Capture and develop ideas for growing Olóri Bride House.',
        phase: 9,
      },
    ],
  },
  {
    label: 'Business',
    items: [
      {
        path: '/packages',
        label: 'Packages & Pricing',
        icon: Gem,
        description: 'Your packages, inclusions, add-ons and pricing calculator.',
        phase: 4,
      },
      {
        path: '/finances',
        label: 'Finances',
        icon: Wallet,
        description: 'Payments received, outstanding balances and expenses.',
        phase: 7,
      },
      {
        path: '/reports',
        label: 'Reports',
        icon: ChartColumn,
        description: 'Simple reports built from your real records.',
        phase: 8,
      },
    ],
  },
]

// Settings sits at the bottom of the sidebar, separate from the groups above.
export const SETTINGS_ITEM = {
  path: '/settings',
  label: 'Settings',
  icon: Settings,
  description: 'Business profile, packages, templates and data backup.',
  phase: 9,
}

// A flat list of every page — used to build the routes.
export const NAV_ITEMS = [...NAV_SECTIONS.flatMap((s) => s.items), SETTINGS_ITEM]

// Find the nav item for the current URL (e.g. "/clients/123" → Clients & Leads).
export function findNavItem(pathname) {
  if (pathname === '/') return NAV_ITEMS.find((item) => item.path === '/')
  return NAV_ITEMS.find(
    (item) =>
      item.path !== '/' &&
      (pathname === item.path || pathname.startsWith(item.path + '/'))
  )
}