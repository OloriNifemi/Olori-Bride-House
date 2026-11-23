import { btnPrimary, btnOutline } from './ui/buttonStyles'
import Bridal from '../assets/Bridal.jpg'
import BlockOne from '../assets/BlockOne.jpg'
import BlockTwo from '../assets/BlockTwo.jpg'

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose'

export default function Hero({ onViewPricing }) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grid items-center gap-10 pb-16 pt-8 sm:pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-0 lg:pb-24"
    >
      {/* Text panel */}
      <div className="rounded-r-[4rem] bg-blush-100 px-6 py-12 sm:px-12 sm:py-16 lg:rounded-r-full lg:pb-28 lg:pl-12 lg:pr-28 lg:pt-24 xl:pl-14 xl:pr-36">
        <div className="max-w-[520px]">
          <p className="mb-5 text-[15px] font-medium tracking-wide text-rose">
            Luxury bridal concierge in Lagos
          </p>

          <h1
            id="hero-heading"
            className="text-balance text-[38px] font-semibold leading-[1.1] tracking-[-0.03em] text-plum sm:text-[48px] lg:text-[54px]"
          >
            Every bride deserves to feel{' '}
            <span className="font-normal italic text-rose">taken care of.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-base leading-7 text-plum-soft sm:text-[17px] sm:leading-8">
            Olóri Bride House gives you a dedicated assistant before and
            during your wedding. We manage your schedule, handle last-minute
            requests, help with outfit changes and look after your personal
            essentials, so you can enjoy every moment.
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-fit">
            <a
              href="#contact"
              className={`${btnPrimary} w-full justify-center whitespace-nowrap ${focusRing}`}
            >
              Book a free consultation
            </a>
            <a
              href="#services-pricing"
              onClick={onViewPricing}
              className={`${btnOutline} w-full justify-center whitespace-nowrap ${focusRing}`}
            >
              Explore our packages
            </a>
          </div>

          <p className="mt-8 max-w-[34ch] border-t border-rose/20 pt-5 text-sm font-medium leading-6 text-plum">
            Your day. Your moments. Our attention to every detail.
          </p>
        </div>
      </div>

      {/* Photo collage: overlaps the panel's curve only on xl screens */}
      <div className="relative z-10 lg:pr-4 xl:-ml-16">
        <div className="grid aspect-[5/6] grid-cols-[1.35fr_1fr] grid-rows-2 gap-3 sm:aspect-[6/5] sm:gap-4 lg:aspect-auto lg:h-[580px]">
          <img
            src={Bridal}
            alt="A bride in a beaded gown and veil while her assistant adjusts her shoes"
            width="600"
            height="900"
            fetchPriority="high"
            decoding="async"
            className="row-span-2 h-full w-full rounded-b-3xl rounded-t-full object-cover shadow-[0_20px_50px_-20px_rgba(74,28,48,0.45)]"
          />
          <img
            src={BlockOne}
            alt="Two assistants helping a bride lift her gown as she walks"
            width="400"
            height="450"
            decoding="async"
            className="h-full w-full rounded-b-2xl rounded-t-full object-cover"
          />
          <img
            src={BlockTwo}
            alt="A bridesmaid fastening the back of a bride's ball gown"
            width="400"
            height="450"
            decoding="async"
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>

        <p className="absolute -bottom-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-medium text-plum shadow-md sm:left-8">
          By your side, start to finish
        </p>
      </div>
    </section>
  )
}