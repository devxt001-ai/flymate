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

import { Plane } from "lucide-react"

export function PopularDestinations() {
  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="mb-6 md:mb-0">
            <div className="inline-block">
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-3">
                EXPLORE THE WORLD
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Top International Destinations
              </span>
            </h2>
            <p className="text-foreground/60 mt-3 text-lg max-w-2xl">
              Handpicked routes with great prices and flexible fares for your next adventure
            </p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
            View all destinations
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <div key={idx} className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              <Card
                className={`relative bg-gradient-to-br ${dest.image} h-72 rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-500`}
              >
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Floating badges */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary shadow-lg">
                    <Plane className="h-3.5 w-3.5" /> Best fare
                  </span>
                  {idx % 2 === 0 && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-secondary/90 px-3 py-1 text-xs font-medium text-white shadow-lg">
                      Hot deal
                    </span>
                  )}
                </div>

                {/* City info with animated underline */}
                <div className="absolute top-6 left-6 z-20">
                  <h3 className="text-3xl font-bold text-white drop-shadow-md group-hover:text-primary-foreground transition-colors">
                    {dest.city}
                    <div className="h-1 w-0 group-hover:w-full bg-white/70 mt-1 transition-all duration-500 rounded-full"></div>
                  </h3>
                  <p className="text-white/90 text-lg">{dest.country}</p>
                </div>

                {/* Price tag */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-2">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                      <p className="text-xl font-bold text-white">From {dest.price}</p>
                    </div>
                  </div>
                </div>

                {/* Hover content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30">
                  <div className="bg-black/60 backdrop-blur-sm w-4/5 p-5 rounded-xl border border-white/20">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-lg font-semibold text-white">From {dest.price}</p>
                      <span className="rounded-full bg-primary px-2 py-1 text-xs text-white font-semibold animate-pulse">Limited time</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-4">
                      <span className="flex items-center gap-2 text-sm text-white/90">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div> Free cancellation
                      </span>
                      <span className="flex items-center gap-2 text-sm text-white/90">
                        <div className="w-2 h-2 rounded-full bg-blue-400"></div> Direct flights available
                      </span>
                      <span className="flex items-center gap-2 text-sm text-white/90">
                        <div className="w-2 h-2 rounded-full bg-purple-400"></div> 24/7 dedicated support
                      </span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white">
                      Book Now
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
