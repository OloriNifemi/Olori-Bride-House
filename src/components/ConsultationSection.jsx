import { useState } from 'react'
import { CircleCheck, MessageCircle } from 'lucide-react'
import Calendar from './consultation/Calendar'
import TimeSlots from './consultation/TimeSlots'
import Field from './ui/Field'
import { btnPrimary, btnOutline } from './ui/buttonStyles'
import { CONSULTATION } from '../config/consultation'
import { PACKAGES, SITE } from '../config/site'
import { formatLongDate, formatShortDate, todayISO } from '../utils/dates'
import { whatsappLink } from '../utils/whatsapp'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  weddingDate: '',
  packageName: 'Not sure yet',
  message: '',
}

// Checked in this order, so the first problem gets focus.
function validate(day, time, v) {
  const errors = {}
  if (!day) errors.day = 'Please pick a day for your consultation.'
  if (!time) errors.time = 'Please pick a time.'
  if (!v.name.trim()) errors.name = 'Please enter your full name.'
  if (v.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a phone number we can reach you on.'
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "That email address doesn't look right."
  if (v.weddingDate && v.weddingDate <= todayISO()) errors.weddingDate = 'Your wedding date should be in the future.'
  return errors
}

// Where to move keyboard focus for each kind of error
const FOCUS_TARGET = {
  day: 'c-step-day',
  time: 'c-step-time',
  name: 'c-name',
  phone: 'c-phone',
  email: 'c-email',
  weddingDate: 'c-weddingDate',
}

function StepHeading({ number, id, children }) {
  return (
    <div className="mb-3.5 flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="grid h-[26px] w-[26px] flex-none place-items-center rounded-full bg-wine text-[13px] font-semibold text-white"
      >
        {number}
      </span>
      <h3 id={id} tabIndex={-1} className="text-lg font-semibold">
        {children}
      </h3>
    </div>
  )
}

function ErrorText({ children }) {
  if (!children) return null
  return <p className="mt-2 text-[13px] font-medium text-wine">{children}</p>
}

export default function ConsultationSection() {
  const [day, setDay] = useState(null)
  const [time, setTime] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('editing') // 'editing' | 'sent' | 'no-contact'
  const [sentLink, setSentLink] = useState(null)

  const clearError = (key) =>
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er))

  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    clearError(field)
  }

  const pickDay = (iso) => {
    setDay(iso)
    clearError('day')
  }

  const pickTime = (t) => {
    setTime(t)
    clearError('time')
  }

  const summary =
    day && time
      ? `${formatShortDate(day)} at ${time} (WAT)`
      : day
        ? `${formatShortDate(day)}, pick a time`
        : time
          ? `${time}, pick a day`
          : 'pick a day and time'

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(day, time, values)
    setErrors(found)

    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(FOCUS_TARGET[firstError])?.focus()
      return
    }

    const lines = [
      `Hello ${SITE.name}, I'd like to book a free consultation.`,
      '',
      `Preferred time: ${formatLongDate(day)} at ${time} (West Africa Time)`,
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
    ]
    if (values.email.trim()) lines.push(`Email: ${values.email.trim()}`)
    if (values.weddingDate) lines.push(`Wedding date: ${formatLongDate(values.weddingDate)}`)
    lines.push(`Package of interest: ${values.packageName}`)
    if (values.message.trim()) lines.push(`Message: ${values.message.trim()}`)

    const link = whatsappLink(lines.join('\n'))
    if (!link) {
      setStatus('no-contact')
      return
    }
    window.open(link, '_blank', 'noopener,noreferrer')
    setSentLink(link)
    setStatus('sent')
  }

  return (
    <section id="contact" className="scroll-mt-4 border-t border-line bg-blush-50">
      <div className="mx-auto max-w-[1120px] px-6 pb-24 pt-20">
        <p className="mb-3 text-[15px] font-medium text-rose">Free consultation</p>
        <h2 className="max-w-[760px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[40px]">
          Let’s talk about your day.
        </h2>
        <p className="mt-4 max-w-[560px] text-plum-soft">
          Choose a day and time that suits you. We’ll confirm your consultation with you on
          WhatsApp. Each call is {CONSULTATION.callLength}.
        </p>

        <div className="mt-12 rounded-3xl border border-line bg-white p-6 sm:p-8">
          {status === 'sent' ? (
            /* ===== After handing off to WhatsApp ===== */
            <div role="status" className="flex animate-fade-in flex-col gap-2 rounded-[18px] bg-blush-100 p-8">
              <CircleCheck size={32} strokeWidth={1.8} className="text-wine" aria-hidden="true" />
              <p className="text-xl font-semibold">Almost done</p>
              <p className="text-plum-soft">
                Your request for <strong className="text-plum">{summary}</strong> is written out in
                WhatsApp. <strong className="text-plum">Press send in WhatsApp</strong> and we’ll
                confirm your consultation.
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                <a href={sentLink} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                  <MessageCircle size={18} aria-hidden="true" />
                  Open WhatsApp again
                </a>
                <button type="button" onClick={() => setStatus('editing')} className={btnOutline}>
                  Change details
                </button>
              </div>
            </div>
          ) : (
            /* ===== Booking form ===== */
            <form noValidate onSubmit={handleSubmit} className="flex flex-wrap gap-10">
              {/* Left column: day + time */}
              <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
                <div>
                  <StepHeading number={1} id="c-step-day">Pick a day</StepHeading>
                  <Calendar
                    value={day}
                    onChange={pickDay}
                    monthsAhead={CONSULTATION.monthsAhead}
                    closedWeekdays={CONSULTATION.closedWeekdays}
                    labelledBy="c-step-day"
                  />
                  <ErrorText>{errors.day}</ErrorText>
                </div>

                <div>
                  <StepHeading number={2} id="c-step-time">Pick a time</StepHeading>
                  <TimeSlots
                    slots={CONSULTATION.slots}
                    value={time}
                    onChange={pickTime}
                    labelledBy="c-step-time"
                  />
                  <ErrorText>{errors.time}</ErrorText>
                  <p className="mt-2.5 text-[13px] text-plum-soft">
                    Times are in West Africa Time (Lagos). Each call is {CONSULTATION.callLength}.
                  </p>
                </div>
              </div>

              {/* Right column: details */}
              <div className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
                <StepHeading number={3} id="c-step-details">Your details</StepHeading>

                <Field id="c-name" label="Full name" required autoComplete="name" placeholder="Your name"
                  value={values.name} onChange={update('name')} error={errors.name} />
                <Field id="c-phone" label="Phone / WhatsApp" required type="tel" autoComplete="tel" placeholder="+234"
                  value={values.phone} onChange={update('phone')} error={errors.phone} />
                <Field id="c-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com"
                  value={values.email} onChange={update('email')} error={errors.email} />

                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4">
                  <Field id="c-weddingDate" label="Wedding date" type="date" min={todayISO()}
                    value={values.weddingDate} onChange={update('weddingDate')} error={errors.weddingDate} />
                  <Field id="c-package" label="Package" as="select"
                    value={values.packageName} onChange={update('packageName')}>
                    <option>Not sure yet</option>
                    {PACKAGES.map((p) => (
                      <option key={p.id}>{p.name}</option>
                    ))}
                  </Field>
                </div>

                <Field id="c-message" label="Anything we should know?" as="textarea" rows={3}
                  placeholder="Tell us a little about your wedding"
                  value={values.message} onChange={update('message')} />

                <div aria-live="polite" className="rounded-[14px] bg-blush-100 px-4 py-3.5 text-sm">
                  <span className="font-semibold">Your consultation:</span> {summary}
                </div>

                {status === 'no-contact' && (
                  <p role="alert" className="rounded-xl bg-blush-100 p-3 text-[13px] font-medium text-wine">
                    Bookings aren’t connected yet: add your WhatsApp number in
                    <code className="mx-1">src/config/site.js</code>.
                  </p>
                )}

                <button type="submit" className={`${btnPrimary} self-start`}>
                  <MessageCircle size={18} aria-hidden="true" />
                  Book consultation
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}