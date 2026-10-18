import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { ChevronLeft, CircleCheck, MessageCircle } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Field from '../components/ui/Field'
import CheckIcon from '../components/ui/CheckIcon'
import { btnPrimary, btnOutline, btnOutlineSmall } from '../components/ui/buttonStyles'
import { PACKAGES, SITE, formatNaira } from '../config/site'
import { whatsappLink } from '../utils/whatsapp'

const EMPTY = { name: '', phone: '', email: '', weddingDate: '', location: '', notes: '' }

// Today's date as YYYY-MM-DD in local time
function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function prettyDate(iso) {
  return new Date(iso + 'T00:00').toLocaleDateString('en-NG', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Please enter your full name.'
  if (v.phone.replace(/\D/g, '').length < 10) errors.phone = 'Please enter a phone number we can reach you on.'
  if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) errors.email = "That email address doesn't look right."
  if (!v.weddingDate) errors.weddingDate = 'Please choose your wedding date.'
  else if (v.weddingDate <= todayISO()) errors.weddingDate = 'Your wedding date should be in the future.'
  if (!v.location.trim()) errors.location = 'Please tell us the venue or area.'
  return errors
}

const backLink = (
  <Link
    to="/"
    state={{ tab: 'pricing', scrollTo: 'services-pricing' }}
    className={btnOutlineSmall}
  >
    <ChevronLeft size={16} aria-hidden="true" />
    Back to packages
  </Link>
)

export default function ReservePage() {
  const { packageId } = useParams()
  const pkg = PACKAGES.find((p) => p.id === packageId && p.price)

  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('editing') // 'editing' | 'sent' | 'no-contact'
  const [sentLink, setSentLink] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!pkg) {
    return (
      <PageFrame>
        <div className="mx-auto mt-10 max-w-[620px] rounded-3xl border border-line bg-white p-10 text-center">
          <h1 className="text-[28px] font-semibold tracking-[-0.02em]">Package not found</h1>
          <p className="mt-2 text-plum-soft">That package doesn’t exist. Please choose one from our pricing.</p>
          <div className="mt-6">{backLink}</div>
        </div>
      </PageFrame>
    )
  }

  // Update one field, and clear its error as soon as the user edits it.
  const update = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)

    const firstError = Object.keys(found)[0]
    if (firstError) {
      document.getElementById(`r-${firstError}`)?.focus()
      return
    }

    const lines = [
      `Hello ${SITE.name}, I'd like to reserve the ${pkg.name} (${formatNaira(pkg.price)}).`,
      '',
      `Name: ${values.name.trim()}`,
      `Phone: ${values.phone.trim()}`,
      values.email && `Email: ${values.email.trim()}`,
      `Wedding date: ${prettyDate(values.weddingDate)}`,
      `Location: ${values.location.trim()}`,
      values.notes.trim() && `Notes: ${values.notes.trim()}`,
    ].filter((line) => line !== false && line !== undefined && line !== '' || line === '')

    const link = whatsappLink(lines.join('\n'))
    if (!link) {
      setStatus('no-contact')
      return
    }
    window.open(link, '_blank', 'noopener,noreferrer')
    setSentLink(link)
    setStatus('sent')
  }

  if (status === 'sent') {
    return (
      <PageFrame>
        <div
          role="status"
          className="mx-auto mt-10 flex max-w-[620px] animate-fade-in flex-col items-center gap-2.5 rounded-3xl border border-line bg-white p-10 text-center"
        >
          <CircleCheck size={44} strokeWidth={1.6} className="text-wine" aria-hidden="true" />
          <h1 className="text-[30px] font-semibold tracking-[-0.02em]">Almost done</h1>
          <p className="text-plum-soft">
            Your reservation request for the <strong className="text-plum">{pkg.name}</strong> is
            written out in WhatsApp. <strong className="text-plum">Press send in WhatsApp</strong> to
            complete it. We’ll reply to confirm availability and payment details.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <a href={sentLink} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <MessageCircle size={18} aria-hidden="true" />
              Open WhatsApp again
            </a>
            <Link to="/" className={btnOutline}>Back to home</Link>
          </div>
        </div>
      </PageFrame>
    )
  }

  return (
    <PageFrame>
      <p className="mb-2.5 text-[15px] font-medium text-rose">Reserve</p>
      <h1 className="mb-9 text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[40px]">
        Secure your bridal concierge.
      </h1>

      <div className="flex flex-wrap items-start gap-6">
        {/* Details form */}
        <form
          id="reserve-form"
          noValidate
          onSubmit={handleSubmit}
          className="flex min-w-0 flex-[999_1_460px] flex-col gap-4 rounded-3xl border border-line bg-white p-6 sm:p-8"
        >
          <h2 className="text-xl font-semibold">Your details</h2>
          <Field id="r-name" label="Full name" required autoComplete="name" placeholder="Your name"
            value={values.name} onChange={update('name')} error={errors.name} />
          <Field id="r-phone" label="Phone / WhatsApp" required type="tel" autoComplete="tel" placeholder="+234"
            value={values.phone} onChange={update('phone')} error={errors.phone} />
          <Field id="r-email" label="Email" type="email" autoComplete="email" placeholder="you@example.com"
            value={values.email} onChange={update('email')} error={errors.email} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            <Field id="r-weddingDate" label="Wedding date" required type="date" min={todayISO()}
              value={values.weddingDate} onChange={update('weddingDate')} error={errors.weddingDate} />
            <Field id="r-location" label="Wedding location" required placeholder="Venue or area, e.g. Lekki"
              value={values.location} onChange={update('location')} error={errors.location} />
          </div>
          <Field id="r-notes" label="Anything we should know?" as="textarea" rows={3}
            placeholder="Add-ons you’d like, special requests…"
            value={values.notes} onChange={update('notes')} />
        </form>

        {/* Summary */}
        <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5 rounded-3xl border border-[#EBCFCF] bg-blush-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Reservation summary</h2>
          <div className="flex items-baseline justify-between gap-3">
            <div>
              <p className="font-semibold">{pkg.name}</p>
              <p className="text-sm text-plum-soft">{pkg.duration}</p>
            </div>
            <p className="whitespace-nowrap font-semibold">{formatNaira(pkg.price)}</p>
          </div>
          <ul className="flex flex-col gap-2 text-sm text-plum-soft">
            {pkg.summary.map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <CheckIcon />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="my-1 border-t border-dotted border-[#D9AEB6]" />
          <div className="flex items-baseline justify-between text-lg font-semibold">
            <span>Package price</span>
            <span>{formatNaira(pkg.price)}</span>
          </div>
          <p className="text-[13px] text-plum-soft">
            Add-ons are confirmed and invoiced separately. No payment is taken on this website. We’ll
            confirm availability and send payment details on WhatsApp.
          </p>

          {status === 'no-contact' && (
            <p role="alert" className="rounded-xl bg-white p-3 text-[13px] font-medium text-wine">
              Reservations aren’t connected yet: add your WhatsApp number in
              <code className="mx-1">src/config/site.js</code>.
            </p>
          )}

          <button type="submit" form="reserve-form" className={`${btnPrimary} mt-1.5 min-h-[52px] text-[15px]`}>
            <MessageCircle size={18} aria-hidden="true" />
            Reserve on WhatsApp
          </button>
        </aside>
      </div>
    </PageFrame>
  )
}

// Shared page frame: header with back link, content, footer.
function PageFrame({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-[1040px] flex-1 px-6 pb-24 pt-7">
        <div className="mb-10">
          <Header action={backLink} />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  )
}