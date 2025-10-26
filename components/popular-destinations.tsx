"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const destinations = [
  { city: "Dubai", country: "UAE", price: "₹12,500", image: "from-orange-400 to-red-500" },
  { city: "London", country: "UK", price: "₹28,000", image: "from-blue-400 to-blue-600" },
  { city: "Singapore", country: "Singapore", price: "₹8,500", image: "from-green-400 to-emerald-600" },
  { city: "Bangkok", country: "Thailand", price: "₹6,200", image: "from-yellow-400 to-orange-500" },
  { city: "Paris", country: "France", price: "₹32,000", image: "from-pink-400 to-rose-500" },
  { city: "Tokyo", country: "Japan", price: "₹35,000", image: "from-purple-400 to-indigo-600" },
]

export function PopularDestinations() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-8">Top International Destinations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, idx) => (
            <Card
              key={idx}
              className={`bg-gradient-to-br ${dest.image} h-64 rounded-2xl overflow-hidden group cursor-pointer relative`}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-6 z-10">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full">
                  <h3 className="text-2xl font-bold mb-1">{dest.city}</h3>
                  <p className="text-sm text-white/80 mb-3">{dest.country}</p>
                  <p className="text-lg font-semibold mb-3">From {dest.price}</p>
                  <Button className="w-full bg-white text-primary hover:bg-white/90">Explore Now</Button>
                </div>
              </div>

              {/* Static Info */}
              <div className="absolute top-4 left-4 right-4 z-20">
                <h3 className="text-2xl font-bold text-white">{dest.city}</h3>
                <p className="text-white/80 text-sm">{dest.country}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
