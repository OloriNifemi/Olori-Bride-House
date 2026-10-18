import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ServicesPricing from '../components/ServicesPricing'
import Footer from '../components/Footer'

export default function LandingPage() {
  const location = useLocation()

  // Coming back from a reservation page opens the Pricing tab directly.
  const [tab, setTab] = useState(location.state?.tab ?? 'services')

  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) document.getElementById(target)?.scrollIntoView()
  }, [location.state])

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1120px] px-6 pt-7">
        <Header />
        <Hero onViewPricing={() => setTab('pricing')} />
      </div>

      <ServicesPricing tab={tab} onTabChange={setTab} />

      {/* TEMPORARY — replaced by the consultation booker in Part B */}
      <section id="contact" className="scroll-mt-4 border-t border-line bg-blush-50">
        <div className="mx-auto max-w-[1120px] px-6 pb-24 pt-20">
          <p className="mb-3 text-[15px] font-medium text-rose">Free consultation</p>
          <h2 className="max-w-[760px] text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[40px]">
            Let’s talk about your day.
          </h2>
          <p className="mt-4 max-w-[560px] text-plum-soft">
            The consultation booker is added in the next build step.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}