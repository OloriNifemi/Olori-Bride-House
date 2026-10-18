// Grid of time buttons; the chosen one is highlighted.
export default function TimeSlots({ slots, value, onChange, labelledBy }) {
  return (
    <div
      role="group"
      aria-labelledby={labelledBy}
      className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-2"
    >
      {slots.map((t) => {
        const selected = value === t
        return (
          <button
            key={t}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(t)}
            className={`min-h-11 cursor-pointer rounded-[14px] border px-2.5 text-sm font-medium transition-colors ${
              selected
                ? 'border-wine bg-wine text-white'
                : 'border-line-strong bg-blush-50 text-plum hover:border-wine'
            }`}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}