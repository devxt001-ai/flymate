"use client"

import { Navbar } from "@/components/navbar"
import { BookingSteps } from "@/components/booking-steps"
import { PassengerDetails } from "@/components/passenger-details"
import { SeatSelection } from "@/components/seat-selection"
import { BookingSummary } from "@/components/booking-summary"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle } from "lucide-react"

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [passengers, setPassengers] = useState([
    { id: 1, title: "Mr", firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "", gender: "m" },
  ])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [selectedOffer, setSelectedOffer] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const offerId = sessionStorage.getItem("selectedOfferId")
    if (!offerId) {
      setError("No flight selected. Please search and select a flight first.")
      return
    }

    const loadOffer = async () => {
      try {
        console.log("[v0] Loading offer:", offerId)
        const response = await fetch(`/api/get-offer?id=${offerId}`)
        if (!response.ok) {
          throw new Error("Failed to load offer")
        }
        const data = await response.json()
        console.log("[v0] Offer loaded:", data)
        setSelectedOffer(data.data)
      } catch (err: any) {
        console.error("[v0] Error loading offer:", err)
        setError(err.message || "Failed to load flight details")
      }
    }

    loadOffer()
  }, [])

  const handleNextStep = () => {
    if (currentStep === 1) {
      // Validate passenger details
      const allFilled = passengers.every((p) => p.firstName && p.lastName && p.email && p.phone && p.dateOfBirth)
      if (!allFilled) {
        alert("Please fill in all passenger details")
        return
      }
    }
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteBooking = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("[v0] Creating order with passengers:", passengers)

      const response = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: selectedOffer.id,
          passengers: passengers.map((p, idx) => ({
            id: selectedOffer.passengers?.[idx]?.id || `passenger_${idx}`,
            title: p.title,
            firstName: p.firstName,
            lastName: p.lastName,
            email: p.email,
            phone: p.phone,
            dateOfBirth: p.dateOfBirth,
            gender: p.gender,
          })),
          email: passengers[0].email,
          phone: passengers[0].phone,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create booking")
      }

      const order = await response.json()
      console.log("[v0] Order created successfully:", order)

      try {
        await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            offerId: selectedOffer.id,
            passengers: passengers,
            totalPrice: order.data?.total_amount || 0,
            email: passengers[0].email,
          }),
        })
      } catch (dbError) {
        console.error("[v0] Failed to save booking to database:", dbError)
        // Don't block confirmation if database save fails
      }

      // Store order details and redirect to confirmation
      sessionStorage.setItem("orderDetails", JSON.stringify(order.data))
      router.push("/confirmation")
    } catch (err: any) {
      console.error("[v0] Booking error:", err)
      setError(err.message || "Failed to complete booking")
    } finally {
      setLoading(false)
    }
  }

  if (error && !selectedOffer) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-destructive/10 border border-destructive/50 rounded-lg p-6 flex items-center gap-4">
            <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div>
              <h2 className="font-semibold text-destructive mb-2">Error</h2>
              <p className="text-destructive/80">{error}</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Complete Your Booking</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <BookingSteps currentStep={currentStep} />

            <div className="mt-8 bg-white dark:bg-card rounded-2xl shadow-lg p-8 border border-border">
              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {currentStep === 1 && <PassengerDetails passengers={passengers} setPassengers={setPassengers} />}
              {currentStep === 2 && <SeatSelection selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} />}
              {currentStep === 3 && <AddOnsSelection />}
              {currentStep === 4 && <PaymentDetails />}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-border">
                <button
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={currentStep === 4 ? handleCompleteBooking : handleNextStep}
                  disabled={loading}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Processing..." : currentStep === 4 ? "Complete Booking" : "Next"}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <BookingSummary
              currentStep={currentStep}
              passengers={passengers}
              selectedSeats={selectedSeats}
              offer={selectedOffer}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

function AddOnsSelection() {
  const addOns = [
    { id: 1, name: "Extra Baggage (20kg)", price: 1500, selected: false },
    { id: 2, name: "Seat Selection", price: 500, selected: false },
    { id: 3, name: "Meal Upgrade", price: 800, selected: false },
    { id: 4, name: "Travel Insurance", price: 2000, selected: false },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Add-ons & Services</h2>
      <div className="space-y-4">
        {addOns.map((addon) => (
          <label
            key={addon.id}
            className="flex items-center gap-4 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
          >
            <input type="checkbox" className="w-5 h-5 accent-primary" />
            <div className="flex-1">
              <p className="font-semibold text-foreground">{addon.name}</p>
            </div>
            <p className="text-lg font-bold text-primary">₹{addon.price}</p>
          </label>
        ))}
      </div>
    </div>
  )
}

function PaymentDetails() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Payment Details</h2>
      <div className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-4">Select Payment Method</label>
          <div className="grid grid-cols-2 gap-4">
            {["Credit Card", "Debit Card", "UPI", "Net Banking"].map((method) => (
              <label
                key={method}
                className="flex items-center gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors"
              >
                <input type="radio" name="payment" className="w-4 h-4 accent-primary" />
                <span className="font-medium text-foreground">{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Card Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <label className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
          <input type="checkbox" className="w-5 h-5 accent-primary mt-1" />
          <span className="text-sm text-foreground/70">I agree to the terms and conditions and privacy policy</span>
        </label>
      </div>
    </div>
  )
}
