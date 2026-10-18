// Friendly "nothing here yet" panel that tells the user what to do next.

export default function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="flex flex-col items-center text-center rounded-2xl border border-dashed border-taupe bg-cream px-6 py-14">
      {Icon && (
        <div className="grid h-14 w-14 place-items-center rounded-full bg-blush/60 text-rose">
          <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
        </div>
      )}
      <h2 className="mt-5 text-2xl">{title}</h2>
      {children && <div className="mt-2 max-w-md text-muted">{children}</div>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}