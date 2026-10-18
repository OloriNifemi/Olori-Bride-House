// Reusable button with consistent Olóri styling.
// Usage: <Button>Save</Button>
//        <Button variant="secondary">Cancel</Button>
//        <Button as={Link} to="/clients">Go to clients</Button>

const VARIANTS = {
  primary: 'bg-cocoa text-cream hover:bg-rose-deep',
  secondary: 'bg-cream text-cocoa border border-line hover:bg-champagne hover:border-taupe',
  ghost: 'text-muted hover:text-cocoa hover:bg-champagne',
  danger: 'bg-cream text-rose-deep border border-blush hover:bg-blush/40',
}

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-5 text-[15px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className = '',
  children,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium ' +
    'transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none'

  // Plain <button>s default to type="button" so they never submit a form by accident.
  const typeProp = Component === 'button' && !props.type ? { type: 'button' } : {}

  return (
    <Component
      className={`${base} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...typeProp}
      {...props}
    >
      {children}
    </Component>
  )
}