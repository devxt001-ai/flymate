import { Card } from "@/components/ui/card"
import { Plane, MapPin, Calendar, Users } from "lucide-react"

interface BookingSummaryProps {
  currentStep: number
  passengers: any[]
  selectedSeats: string[]
  offer?: any
}

export function BookingSummary({ currentStep, passengers, selectedSeats, offer }: BookingSummaryProps) {
  const basePrice = offer ? Number.parseFloat(offer.total_amount || 0) : 8500
  const seatsPrice = selectedSeats.length * 500
  const addOnsPrice = 1500
  const totalPrice = basePrice + seatsPrice + addOnsPrice

  const slice = offer?.slices?.[0]
  const departureTime = slice?.departure_at
    ? new Date(slice.departure_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    : "N/A"
  const departureDate = slice?.departure_at
    ? new Date(slice.departure_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "N/A"

  return (
    <Card className="p-6 sticky top-24 border border-border">
      <h3 className="text-xl font-bold text-foreground mb-6">Booking Summary</h3>

      {/* Flight Details */}
      <div className="space-y-4 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <Plane className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-foreground/60">Flight</p>
            <p className="font-semibold text-foreground">{offer?.owner?.name || "Airline"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-foreground/60">Route</p>
            <p className="font-semibold text-foreground">
              {slice?.origin?.iata_code} → {slice?.destination?.iata_code}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-foreground/60">Date & Time</p>
            <p className="font-semibold text-foreground">
              {departureDate} at {departureTime}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-foreground/60">Passengers</p>
            <p className="font-semibold text-foreground">
              {passengers.length} Passenger{passengers.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 py-6 border-b border-border">
        <div className="flex justify-between text-sm">
          <span className="text-foreground/70">Base Fare ({passengers.length}x)</span>
          <span className="font-semibold text-foreground">₹{Math.round(basePrice * passengers.length)}</span>
        </div>
        {selectedSeats.length > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Seat Selection ({selectedSeats.length})</span>
            <span className="font-semibold text-foreground">₹{seatsPrice}</span>
          </div>
        )}
        {currentStep >= 3 && (
          <div className="flex justify-between text-sm">
            <span className="text-foreground/70">Add-ons</span>
            <span className="font-semibold text-foreground">₹{addOnsPrice}</span>
          </div>
        )}
      </div>

      {/* Total */}
      <div className="pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-foreground">Total</span>
        <span className="text-2xl font-bold text-primary">₹{Math.round(totalPrice)}</span>
      </div>
    </Card>
  )
}
