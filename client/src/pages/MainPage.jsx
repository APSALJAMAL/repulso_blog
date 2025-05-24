import '@/mainpage/App.css'

import Hero from '@/mainpage/components/Hero'
import CompanyLogo from '@/mainpage/components/CompanyLogo'
import PurposeSection from '@/mainpage/components/PurposeSection'
import FeaturesSection from '@/mainpage/components/FeaturesSection'
import ScheduleSection from '@/mainpage/components/ScheduleSection'
import MonitorSection from '@/mainpage/components/MonitorSection'
import PricingSection from '@/mainpage/components/PricingSection'
import ServicesSection from '@/mainpage/components/ServicesSection'
import TestimonialsSection from '@/mainpage/components/TestimonialsSection'
import NewsletterSection from '@/mainpage/components/NewsletterSection'
import Footer from '@/mainpage/components/Footer'
import Navbar from '@/mainpage/components/Navbar'

function MainPage() {
  return (
    <main className="relative  min-h-screen overflow-x-hidden">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection />
        <ScheduleSection />
        <MonitorSection />
        {/* <PricingSection /> */}
        <ServicesSection />
        <TestimonialsSection />
        {/* <NewsletterSection /> */}
        <Footer />
      </div>
    </main>
  )
}

export default MainPage
