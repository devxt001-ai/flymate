"use client"

import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { FlightFilters } from "@/components/flight-filters"
import { FlightResults } from "@/components/flight-results"
import { useState } from "react"

export default function SearchPage() {
  const [filters, setFilters] = useState({
    priceRange: [0, 500000],
    airlines: [],
    stops: "all",
    duration: "all",
    departure: "all",
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Search Bar Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">Modify Your Search</h2>
          <SearchBar />
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FlightFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Flight Results */}
          <div className="lg:col-span-3">
            <FlightResults filters={filters} />
          </div>
        </div>
      </div>
    </main>
  )
}
