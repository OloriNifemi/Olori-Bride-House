import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { startOfToday, toISO } from '../../utils/dates'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Calendar({ value, onChange, monthsAhead, closedWeekdays, labelledBy }) {
  const [offset, setOffset] = useState(0) // 0 = this month, 1 = next month…

  const today = startOfToday()
  const first = new Date(today.getFullYear(), today.getMonth() + offset, 1)
  const year = first.getFullYear()
  const month = first.getMonth()

  // Empty cells before day 1 so the grid starts on Monday
  const leadingBlanks = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const monthLabel = first.toLocaleDateString('en-NG', { month: 'long', year: 'numeric' })

  const canGoBack = offset > 0
  const canGoForward = offset < monthsAhead

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1)
    const iso = toISO(date)
    const closed = date <= today || closedWeekdays.includes(date.getDay())
    const label = date.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' })
    return {
      day: i + 1,
      iso,
      closed,
      selected: value === iso,
      label: closed ? `${label}, unavailable` : label,
    }
  })

  const navButton = (enabled) =>
    `grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-white transition-colors ${
      enabled ? 'cursor-pointer text-wine hover:bg-blush-100' : 'cursor-not-allowed text-[#C9B3BA]'
    }`

  return (
    <div className="max-w-[460px]">
      {/* Month navigation */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setOffset((o) => o - 1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className={navButton(canGoBack)}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <p aria-live="polite" className="text-base font-semibold">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setOffset((o) => o + 1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className={navButton(canGoForward)}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Weekday labels (screen readers get the full date on each button instead) */}
      <div aria-hidden="true" className="mb-1.5 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-plum-soft">
        {WEEKDAYS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Days */}
      <div role="group" aria-labelledby={labelledBy} className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: leadingBlanks }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {days.map((d) => (
          <button
            key={d.iso}
            type="button"
            disabled={d.closed}
            aria-pressed={d.selected}
            aria-label={d.label}
            onClick={() => onChange(d.iso)}
            className={`min-h-11 w-full rounded-xl border text-sm font-medium transition-colors ${
              d.selected
                ? 'cursor-pointer border-wine bg-wine text-white'
                : d.closed
                  ? 'cursor-not-allowed border-transparent text-[#B9A3AA] line-through'
                  : 'cursor-pointer border-line-strong bg-blush-50 text-plum hover:border-wine'
            }`}
          >
            {d.day}
          </button>
        ))}
      </div>
    </div>
  )
}