"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, Briefcase, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface FlightResultsProps {
  filters: any
}

export function FlightResults({ filters }: FlightResultsProps) {
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("price")
  const router = useRouter()

  useEffect(() => {
    const loadFlights = () => {
      try {
        const searchResults = sessionStorage.getItem("searchResults")
        if (searchResults) {
          const data = JSON.parse(searchResults)
          console.log("[v0] Loaded search results:", data)

          if (data.data && data.data.offers) {
            setFlights(data.data.offers)
            setError(null)
          } else {
            setError("No flights found for your search")
            setFlights([])
          }
        } else {
          setError("No search results found. Please search again.")
        }
      } catch (err: any) {
        console.error("[v0] Error loading flights:", err)
        setError(err.message || "Failed to load flights")
      } finally {
        setLoading(false)
      }
    }

    loadFlights()
  }, [])

  const processedFlights = flights
    .filter((flight) => {
      const price = Number.parseFloat(flight.total_amount || 0)
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })
    .sort((a, b) => {
      const priceA = Number.parseFloat(a.total_amount || 0)
      const priceB = Number.parseFloat(b.total_amount || 0)

      switch (sortBy) {
        case "price":
          return priceA - priceB
        case "duration":
          const durationA = a.slices?.[0]?.duration || ""
          const durationB = b.slices?.[0]?.duration || ""
          return durationA.localeCompare(durationB)
        case "departure":
          const depA = a.slices?.[0]?.departure_at || ""
          const depB = b.slices?.[0]?.departure_at || ""
          return depA.localeCompare(depB)
        default:
          return 0
      }
    })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const handleSelectFlight = (flightId: string) => {
    sessionStorage.setItem("selectedOfferId", flightId)
    router.push("/booking")
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-24 bg-muted rounded" />
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Error</h3>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <motion.h2
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {processedFlights.length} Flights Found
        </motion.h2>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
        >
          <option value="price">Cheapest First</option>
          <option value="duration">Fastest First</option>
          <option value="departure">Earliest Departure</option>
        </select>
      </div>

      <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
        {processedFlights.map((flight) => {
          const slice = flight.slices?.[0]
          const price = Number.parseFloat(flight.total_amount || 0)
          const departureTime = slice?.departure_at
            ? new Date(slice.departure_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            : "N/A"
          const arrivalTime = slice?.arrival_at
            ? new Date(slice.arrival_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            : "N/A"
          const stops = (slice?.segments?.length || 1) - 1

          return (
            <motion.div key={flight.id} variants={itemVariants}>
              <Card className="p-6 hover:shadow-lg transition-shadow border border-border">
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Airline & Times */}
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-foreground mb-2">{flight.owner?.name || "Airline"}</h3>
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{departureTime}</p>
                        <p className="text-xs text-foreground/60">{slice?.origin?.iata_code}</p>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-0.5 bg-border" />
                          <Clock className="w-4 h-4 text-foreground/60" />
                          <div className="flex-1 h-0.5 bg-border" />
                        </div>
                        <p className="text-xs text-foreground/60 text-center">{slice?.duration || "N/A"}</p>
                        {stops > 0 && (
                          <p className="text-xs text-accent text-center font-semibold">
                            {stops} Stop{stops > 1 ? "s" : ""}
                          </p>
                        )}
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{arrivalTime}</p>
                        <p className="text-xs text-foreground/60">{slice?.destination?.iata_code}</p>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="md:col-span-1 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Briefcase className="w-4 h-4" />
                      <span>Baggage included</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Users className="w-4 h-4" />
                      <span>Available</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="text-foreground/70 ml-1">Verified</span>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="md:col-span-1 text-right">
                    <div className="mb-3">
                      <p className="text-3xl font-bold text-primary">₹{Math.round(price)}</p>
                      <p className="text-xs text-foreground/60">per person</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleSelectFlight(flight.id)}
                        className="w-full bg-primary hover:bg-primary/90 gap-2"
                      >
                        Select
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
