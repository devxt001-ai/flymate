"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"

export function SearchBar() {
  const [tripType, setTripType] = useState("round")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()

  const handleSearch = async () => {
    if (!from || !to || !departureDate) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)
    try {
      console.log("[v0] Starting flight search")

      const passengerArray = Array(Number.parseInt(passengers))
        .fill(null)
        .map(() => ({
          type: "adult",
        }))

      try {
        await fetch("/api/search-history", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            origin: from,
            destination: to,
            departure_date: departureDate,
            return_date: tripType === "round" ? returnDate : null,
            passengers: Number.parseInt(passengers),
          }),
        })
      } catch (historyError) {
        console.error("[v0] Failed to save search history:", historyError)
      }

      const response = await fetch("/api/search-flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          departureDate,
          returnDate: tripType === "round" ? returnDate : null,
          passengers: passengerArray,
          cabinClass,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Search failed")
      }

      const data = await response.json()
      console.log("[v0] Search results received:", data)

      sessionStorage.setItem("searchResults", JSON.stringify(data))
      sessionStorage.setItem(
        "searchParams",
        JSON.stringify({
          from,
          to,
          departureDate,
          returnDate,
          passengers: passengerArray,
        }),
      )

      router.push("/search")
    } catch (error: any) {
      console.error("[v0] Search error:", error)
      alert(`Search failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
      {/* Trip Type Selector */}
      <div className="flex gap-4 mb-6">
        {["one-way", "round", "multi"].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="trip"
              value={type}
              checked={tripType === type}
              onChange={(e) => setTripType(e.target.value)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium text-foreground capitalize">
              {type === "one-way"
                ? t("search.oneWay")
                : type === "round"
                  ? t("search.roundTrip")
                  : t("search.multiCity")}
            </span>
          </label>
        ))}
      </div>

      {/* Search Fields */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* From */}
        <div className="relative">
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.from")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="NYC, LAX, etc"
              value={from}
              onChange={(e) => setFrom(e.target.value.toUpperCase())}
              className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder-foreground/40"
            />
          </div>
        </div>

        {/* To */}
        <div className="relative">
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.to")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="NYC, LAX, etc"
              value={to}
              onChange={(e) => setTo(e.target.value.toUpperCase())}
              className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder-foreground/40"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.departure")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <Calendar className="w-5 h-5 text-primary" />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-foreground"
            />
          </div>
        </div>

        {/* Return Date */}
        {tripType === "round" && (
          <div>
            <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.return")}</label>
            <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
              <Calendar className="w-5 h-5 text-primary" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-transparent outline-none flex-1 text-sm text-foreground"
              />
            </div>
          </div>
        )}

        {/* Travelers & Class */}
        <div>
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.travelers")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <Users className="w-5 h-5 text-primary" />
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="bg-transparent outline-none flex-1 text-sm text-foreground"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cabin Class Selection */}
      <div className="mt-4 flex gap-4">
        {["economy", "premium_economy", "business", "first"].map((cabin) => (
          <label key={cabin} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="cabin"
              value={cabin}
              checked={cabinClass === cabin}
              onChange={(e) => setCabinClass(e.target.value)}
              className="w-4 h-4 accent-primary"
            />
            <span className="text-sm font-medium text-foreground capitalize">{cabin.replace("_", " ")}</span>
          </label>
        ))}
      </div>

      {/* Search Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSearch}
          disabled={loading}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-12 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50"
        >
          <Plane className="w-5 h-5" />
          {loading ? t("search.searching") : t("search.button")}
        </Button>
      </div>
    </div>
  )
}
