import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Header from '../components/Header'
import Hero from '../components/Hero'
import ServicesPricing from '../components/ServicesPricing'
import ConsultationSection from '../components/ConsultationSection'
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
      <ConsultationSection />
      <Footer />
    </div>
  )
}