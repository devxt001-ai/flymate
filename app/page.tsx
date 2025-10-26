"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { RecentSearches } from "@/components/recent-searches"
import { ExclusiveOffers } from "@/components/exclusive-offers"
import { PopularDestinations } from "@/components/popular-destinations"
import { WhyBookWithUs } from "@/components/why-book-with-us"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <RecentSearches />
      <ExclusiveOffers />
      <PopularDestinations />
      <WhyBookWithUs />
      <Testimonials />
      <Newsletter />
      <Footer />
    </main>
  )
}
