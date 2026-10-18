import PhotoPlaceholder from './ui/PhotoPlaceholder'
import { btnPrimary, btnOutline } from './ui/buttonStyles'

export default function Hero({ onViewPricing }) {
  return (
    <section className="flex flex-wrap items-center gap-12 pb-20 pt-14">
      <div className="min-w-0 flex-[1_1_420px]">
        <p className="mb-3.5 text-sm font-medium uppercase tracking-[0.08em] text-rose">
          Luxury bridal concierge · Lagos
        </p>
        <h1 className="text-[38px] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[50px]">
          Every bride deserves to feel{' '}
          <span className="font-normal italic text-rose">taken care of.</span>
        </h1>
        <p className="mb-8 mt-[22px] max-w-[460px] text-base text-plum-soft">
          Dedicated, personal support before and during your wedding, so you can simply be
          present and enjoy every moment.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#contact" className={btnPrimary}>
            Book a free consultation
          </a>
          <a href="#services-pricing" onClick={onViewPricing} className={btnOutline}>
            View pricing
          </a>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_380px] gap-4">
        <PhotoPlaceholder
          label="Bride portrait"
          className="h-[480px] flex-[3_1_0] rounded-b-3xl rounded-t-[200px] bg-blush-200"
        />
        <div className="flex flex-[2_1_0] flex-col gap-4 pt-14">
          <PhotoPlaceholder label="Bridal details" centered className="h-[200px] rounded-3xl bg-blush-100" />
          <PhotoPlaceholder label="Getting ready" centered className="h-[200px] rounded-3xl bg-blush-300" />
        </div>
      </div>
    </section>
  )
}