import { Link } from 'react-router'
import PageHeader from '../components/ui/PageHeader'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

// Temporary page for sections that haven't been built yet.
// It says so honestly — nothing on this page saves data.
export default function ComingSoon({ item }) {
  const isDashboard = item.path === '/'

  return (
    <>
      <PageHeader title={item.label} description={item.description} />
      <EmptyState
        icon={item.icon}
        title={isDashboard ? 'Welcome to your Business HQ' : 'This section is on the build list'}
        action={
          isDashboard ? (
            <Button as={Link} to="/clients">Go to Clients &amp; Leads</Button>
          ) : (
            <Button as={Link} to="/" variant="secondary">Back to Dashboard</Button>
          )
        }
      >
        {isDashboard ? (
          <p>
            Your dashboard will show real figures once you can record clients, bookings and
            payments. Clients &amp; Leads is built first, in phase 2.
          </p>
        ) : (
          <p>
            Planned for build phase {item.phase}. Nothing on this page saves data yet.
          </p>
        )}
      </EmptyState>
    </>
  )
}