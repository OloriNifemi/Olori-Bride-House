import { Link } from 'react-router'
import { Compass } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <EmptyState
      icon={Compass}
      title="Page not found"
      action={<Button as={Link} to="/">Back to Dashboard</Button>}
    >
      <p>That address doesn't match any page in your Business HQ.</p>
    </EmptyState>
  )
}