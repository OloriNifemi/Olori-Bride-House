// Shared date helpers. Dates are stored as "YYYY-MM-DD" strings in local time.

export function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

// Date object → "YYYY-MM-DD"
export function toISO(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayISO() {
  return toISO(new Date())
}

// "YYYY-MM-DD" → Date (midnight local time, avoiding timezone shifts)
export function fromISO(iso) {
  return new Date(iso + 'T00:00')
}

// "Tue, 21 Oct 2026"
export function formatShortDate(iso) {
  return fromISO(iso).toLocaleDateString('en-NG', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// "Tuesday, 21 October 2026"
export function formatLongDate(iso) {
  return fromISO(iso).toLocaleDateString('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}