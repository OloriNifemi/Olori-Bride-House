import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Hero from '../components/Hero'
import ServicesPricing from '../components/ServicesPricing'
import ConsultationSection from '../components/ConsultationSection'

export default function LandingPage() {
  const location = useLocation()

  // Coming back from a reservation page opens the Pricing tab directly.
  const [tab, setTab] = useState(location.state?.tab ?? 'services')

  // Scroll to a section when the URL has a #hash (header links) or when we
  // arrive from a reservation page; otherwise start at the top.
  useEffect(() => {
    const id = location.state?.scrollTo ?? location.hash.slice(1)
    if (id) document.getElementById(id)?.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      <div className="mx-auto max-w-[1120px] px-6">
        <Hero onViewPricing={() => setTab('pricing')} />
      </div>

      <ServicesPricing tab={tab} onTabChange={setTab} />
      <ConsultationSection />
    </>
  )
}