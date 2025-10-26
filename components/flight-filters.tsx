"use client"

import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FlightFiltersProps {
  filters: any
  setFilters: (filters: any) => void
}

export function FlightFilters({ filters, setFilters }: FlightFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    airlines: true,
    stops: true,
    duration: true,
    departure: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const airlines = ["Air India", "IndiGo", "SpiceJet", "Vistara", "GoAir"]
  const stops = ["Non-stop", "1 Stop", "2+ Stops"]
  const durations = ["0-5 hours", "5-10 hours", "10-15 hours", "15+ hours"]
  const departureTimes = ["Early Morning", "Morning", "Afternoon", "Evening", "Night"]

  return (
    <div className="space-y-4">
      {/* Price Filter */}
      <Card className="p-6">
        <button onClick={() => toggleSection("price")} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-foreground">Price Range</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.price ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              min={0}
              max={50000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-foreground/60">
              <span>₹{filters.priceRange[0]}</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        )}
      </Card>

      {/* Airlines Filter */}
      <Card className="p-6">
        <button onClick={() => toggleSection("airlines")} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-foreground">Airlines</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.airlines ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.airlines && (
          <div className="space-y-3">
            {airlines.map((airline) => (
              <div key={airline} className="flex items-center gap-2">
                <Checkbox id={airline} />
                <Label htmlFor={airline} className="text-sm cursor-pointer">
                  {airline}
                </Label>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Stops Filter */}
      <Card className="p-6">
        <button onClick={() => toggleSection("stops")} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-foreground">Stops</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.stops ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.stops && (
          <div className="space-y-3">
            {stops.map((stop) => (
              <div key={stop} className="flex items-center gap-2">
                <Checkbox id={stop} />
                <Label htmlFor={stop} className="text-sm cursor-pointer">
                  {stop}
                </Label>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Duration Filter */}
      <Card className="p-6">
        <button onClick={() => toggleSection("duration")} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-foreground">Duration</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.duration ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.duration && (
          <div className="space-y-3">
            {durations.map((duration) => (
              <div key={duration} className="flex items-center gap-2">
                <Checkbox id={duration} />
                <Label htmlFor={duration} className="text-sm cursor-pointer">
                  {duration}
                </Label>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Departure Time Filter */}
      <Card className="p-6">
        <button onClick={() => toggleSection("departure")} className="flex items-center justify-between w-full mb-4">
          <h3 className="font-semibold text-foreground">Departure Time</h3>
          <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.departure ? "rotate-180" : ""}`} />
        </button>
        {expandedSections.departure && (
          <div className="space-y-3">
            {departureTimes.map((time) => (
              <div key={time} className="flex items-center gap-2">
                <Checkbox id={time} />
                <Label htmlFor={time} className="text-sm cursor-pointer">
                  {time}
                </Label>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
