"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, MapPin, Users, Plane, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { useRouter } from "next/navigation"
import { searchAirports, type Airport } from "./airport-data"

export function SearchBar() {
  const [tripType, setTripType] = useState("round")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [fromQuery, setFromQuery] = useState("")
  const [toQuery, setToQuery] = useState("")
  const [fromResults, setFromResults] = useState<Airport[]>([])
  const [toResults, setToResults] = useState<Airport[]>([])
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false)
  const [departureDate, setDepartureDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [cabinClass, setCabinClass] = useState("economy")
  const [loading, setLoading] = useState(false)
  const { t } = useLanguage()
  const router = useRouter()
  const fromRef = useRef<HTMLDivElement>(null)
  const toRef = useRef<HTMLDivElement>(null)
  const travelersRef = useRef<HTMLDivElement>(null)

  // Handle outside clicks to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
      if (travelersRef.current && !travelersRef.current.contains(event.target as Node)) {
        setShowTravelersDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search airports when query changes or on focus
  useEffect(() => {
    const searchFrom = async () => {
      if (fromQuery.length >= 2) {
        const results = await searchAirports(fromQuery);
        setFromResults(results);
        setShowFromDropdown(true);
      } else if (fromQuery.length === 0 && showFromDropdown) {
        // Show popular airports on focus with empty query
        const results = await searchAirports("a");
        setFromResults(results);
      }
    };
    searchFrom();
  }, [fromQuery, showFromDropdown]);

  useEffect(() => {
    const searchTo = async () => {
      if (toQuery.length >= 2) {
        const results = await searchAirports(toQuery);
        setToResults(results);
        setShowToDropdown(true);
      } else if (toQuery.length === 0 && showToDropdown) {
        // Show popular airports on focus with empty query
        const results = await searchAirports("a");
        setToResults(results);
      }
    };
    searchTo();
  }, [toQuery, showToDropdown]);

  const handleSelectAirport = (airport: Airport, type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom(airport.code);
      setFromQuery(`${airport.city}, ${airport.country}`);
      setShowFromDropdown(false);
    } else {
      setTo(airport.code);
      setToQuery(`${airport.city}, ${airport.country}`);
      setShowToDropdown(false);
    }
  };

  const clearInput = (type: 'from' | 'to') => {
    if (type === 'from') {
      setFrom('');
      setFromQuery('');
      setShowFromDropdown(false);
    } else {
      setTo('');
      setToQuery('');
      setShowToDropdown(false);
    }
  };
  
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
        <div className="relative" ref={fromRef}>
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.from")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="City or Airport"
              value={fromQuery}
              onChange={(e) => setFromQuery(e.target.value)}
              onFocus={() => {
                setShowFromDropdown(true);
                if (fromQuery.length === 0) {
                  const loadPopular = async () => {
                    const results = await searchAirports("");
                    setFromResults(results);
                  };
                  loadPopular();
                }
              }}
              className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder-foreground/40"
            />
            {fromQuery && (
              <button onClick={() => clearInput('from')} className="text-foreground/60 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {showFromDropdown && fromResults.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <div className="sticky top-0 bg-muted/80 backdrop-blur-sm p-2 border-b border-border flex items-center justify-between">
                <p className="text-xs font-medium text-foreground/70 uppercase">POPULAR CITIES</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setShowFromDropdown(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {fromResults.map((airport) => (
                <div
                  key={airport.code}
                  className="flex justify-between items-center p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleSelectAirport(airport, 'from')}
                >
                  <div>
                    <p className="font-medium text-foreground">{airport.city}, {airport.country}</p>
                    <p className="text-xs text-foreground/70">{airport.name}</p>
                  </div>
                  <span className="text-sm font-mono text-primary font-semibold">{airport.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* To */}
        <div className="relative" ref={toRef}>
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.to")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3">
            <MapPin className="w-5 h-5 text-primary" />
            <input
              type="text"
              placeholder="City or Airport"
              value={toQuery}
              onChange={(e) => setToQuery(e.target.value)}
              onFocus={() => {
                setShowToDropdown(true);
                if (toQuery.length === 0) {
                  const loadPopular = async () => {
                    const results = await searchAirports("");
                    setToResults(results);
                  };
                  loadPopular();
                }
              }}
              className="bg-transparent outline-none flex-1 text-sm text-foreground placeholder-foreground/40"
            />
            {toQuery && (
              <button onClick={() => clearInput('to')} className="text-foreground/60 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {showToDropdown && toResults.length > 0 && (
            <div className="absolute z-50 mt-1 w-full bg-background border border-border rounded-lg shadow-lg max-h-80 overflow-y-auto">
              <div className="sticky top-0 bg-muted/80 backdrop-blur-sm p-2 border-b border-border flex items-center justify-between">
                <p className="text-xs font-medium text-foreground/70 uppercase">POPULAR CITIES</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setShowToDropdown(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              {toResults.map((airport) => (
                <div
                  key={airport.code}
                  className="flex justify-between items-center p-3 hover:bg-muted/50 cursor-pointer"
                  onClick={() => handleSelectAirport(airport, 'to')}
                >
                  <div>
                    <p className="font-medium text-foreground">{airport.city}, {airport.country}</p>
                    <p className="text-xs text-foreground/70">{airport.name}</p>
                  </div>
                  <span className="text-sm font-mono text-primary font-semibold">{airport.code}</span>
                </div>
              ))}
            </div>
          )}
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
        <div className="relative">
          <label className="text-xs font-semibold text-foreground mb-2 block">{t("search.travelers")}</label>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-3 cursor-pointer" onClick={() => setShowTravelersDropdown(!showTravelersDropdown)}>
            <Users className="w-5 h-5 text-primary" />
            <div className="flex-1 text-sm text-foreground">
              {passengers} {parseInt(passengers) === 1 ? 'Traveler' : 'Travelers'}, {cabinClass.replace('_', ' ')}
            </div>
          </div>
          {showTravelersDropdown && (
            <div className="absolute top-full left-0 w-72 bg-background border border-border rounded-md shadow-lg z-50 p-4 mt-1" ref={travelersRef}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Travelers</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => setShowTravelersDropdown(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Adults</span>
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => setPassengers(Math.max(1, parseInt(passengers) - 1).toString())}
                    >
                      -
                    </Button>
                    <span className="text-sm font-medium w-4 text-center">{passengers}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-6 w-6 rounded-full"
                      onClick={() => setPassengers((parseInt(passengers) + 1).toString())}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <div className="pt-3 border-t">
                  <h4 className="text-sm font-medium mb-2">Cabin Class</h4>
                  <div className="space-y-2">
                    {["economy", "premium_economy", "business", "first"].map((cabin) => (
                      <label key={cabin} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="cabin-dropdown"
                          value={cabin}
                          checked={cabinClass === cabin}
                          onChange={(e) => setCabinClass(e.target.value)}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm capitalize">{cabin.replace("_", " ")}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-2" 
                  size="sm"
                  onClick={() => setShowTravelersDropdown(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          )}
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
