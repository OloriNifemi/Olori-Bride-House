import PhotoPlaceholder from './ui/PhotoPlaceholder'
import PackageCard from './PackageCard'
import { SERVICES, PACKAGES } from '../config/site'

const TABS = [
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
]

const HEADINGS = {
  services: {
    eyebrow: 'Services',
    lines: ['Gentle, dedicated care.', 'From the first fitting to the last dance.'],
  },
  pricing: {
    eyebrow: 'Pricing',
    lines: ['Simple pricing, tailored to you.', 'Find a package for your big day.'],
  },
}

export default function ServicesPricing({ tab, onTabChange }) {
  const heading = HEADINGS[tab]

  // Left/Right arrow keys move between tabs (standard tab behaviour).
  function handleKeyDown(e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = tab === 'services' ? 'pricing' : 'services'
    onTabChange(next)
    document.getElementById(`tab-${next}`)?.focus()
  }

  return (
    <section id="services-pricing" className="scroll-mt-4 border-t border-line bg-white">
      <div className="mx-auto max-w-[1120px] px-6 pb-24 pt-[72px]">
        <p className="mb-3 text-[15px] font-medium text-rose">{heading.eyebrow}</p>
        <h2 className="max-w-[760px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[40px]">
          {heading.lines[0]}
          <br />
          {heading.lines[1]}
        </h2>

        <div role="tablist" aria-label="Services and pricing" className="mt-14 flex gap-2 border-b border-[#EAD6D6]">
          {TABS.map((t) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${t.id}`}
                tabIndex={active ? 0 : -1}
                onClick={() => onTabChange(t.id)}
                onKeyDown={handleKeyDown}
                className={`-mb-px min-h-11 cursor-pointer border-b-2 px-4 py-2.5 text-[15px] transition-colors ${
                  active
                    ? 'border-wine font-semibold text-wine'
                    : 'border-transparent text-[#7A6068] hover:text-plum'
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'services' && (
          <div
            role="tabpanel"
            id="panel-services"
            aria-labelledby="tab-services"
            className="grid animate-fade-in grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7 pt-12"
          >
            {SERVICES.map((s, i) => (
              <div key={s.title} className="flex flex-col gap-3.5">
                <PhotoPlaceholder
                  label={s.photo}
                  className={`h-[300px] rounded-b-[20px] rounded-t-[140px] ${
                    ['bg-blush-100', 'bg-blush-200', 'bg-blush-300'][i % 3]
                  }`}
                />
                <h3 className="mt-1.5 text-[21px] font-semibold tracking-[-0.01em]">{s.title}</h3>
                <p className="text-plum-soft">{s.text}</p>
              </div>
            ))}
          </div>
        )}

        {tab === 'pricing' && (
          <div
            role="tabpanel"
            id="panel-pricing"
            aria-labelledby="tab-pricing"
            className="grid animate-fade-in grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 pt-12"
          >
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}