"use client"

import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2, Plane, MapPin, Calendar, Users, Ticket } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function ConfirmationPage() {
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const details = sessionStorage.getItem("orderDetails")
    if (details) {
      setOrderDetails(JSON.parse(details))
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-lg" />
            <div className="h-64 bg-muted rounded-lg" />
          </div>
        </div>
      </main>
    )
  }

  if (!orderDetails) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="p-8 text-center">
            <p className="text-foreground/70 mb-4">No booking details found</p>
            <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
              Back to Home
            </Button>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CheckCircle className="w-16 h-16 text-green-500" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-foreground/70">Your flight has been successfully booked</p>
        </motion.div>

        {/* Booking Reference */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Booking Reference</p>
                <p className="text-2xl font-bold text-primary">{orderDetails.id || "ORD-2024-001"}</p>
              </div>
              <Ticket className="w-12 h-12 text-primary/30" />
            </div>
          </Card>
        </motion.div>

        {/* Flight Details */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Flight Details</h2>

            <div className="space-y-6">
              {/* Flight Info */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Plane className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Airline</p>
                    <p className="font-semibold text-foreground">{orderDetails.owner?.name || "Airline"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground/60">Flight Number</p>
                  <p className="font-semibold text-foreground">AI-101</p>
                </div>
              </div>

              {/* Route */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <MapPin className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Route</p>
                    <p className="font-semibold text-foreground">
                      {orderDetails.slices?.[0]?.origin?.iata_code} → {orderDetails.slices?.[0]?.destination?.iata_code}
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-4">
                  <Calendar className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-sm text-foreground/60">Departure</p>
                    <p className="font-semibold text-foreground">
                      {orderDetails.slices?.[0]?.departure_at
                        ? new Date(orderDetails.slices[0].departure_at).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <p className="text-sm text-foreground/60">Passengers</p>
                  <p className="font-semibold text-foreground">
                    {orderDetails.passengers?.length || 1} Passenger
                    {(orderDetails.passengers?.length || 1) > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Passenger List */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Passengers</h2>
            <div className="space-y-4">
              {orderDetails.passengers?.map((passenger: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">
                      {passenger.given_name} {passenger.family_name}
                    </p>
                    <p className="text-sm text-foreground/60">Passenger {idx + 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground/60">Email</p>
                    <p className="font-semibold text-foreground">{passenger.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Price Summary */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Price Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-foreground/70">
                <span>Base Fare</span>
                <span>₹{Math.round(Number.parseFloat(orderDetails.base_price || 0))}</span>
              </div>
              <div className="flex justify-between text-foreground/70">
                <span>Taxes & Fees</span>
                <span>₹{Math.round(Number.parseFloat(orderDetails.tax_total_amount || 0))}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground pt-3 border-t border-border">
                <span>Total Amount</span>
                <span className="text-primary">₹{Math.round(Number.parseFloat(orderDetails.total_amount || 0))}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Download className="w-4 h-4" />
            Download Ticket
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share Booking
          </Button>
          <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
            Back to Home
          </Button>
        </motion.div>

        {/* Important Info */}
        <motion.div
          className="mt-12 p-6 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• A confirmation email has been sent to your registered email address</li>
            <li>• Please arrive at the airport at least 3 hours before departure</li>
            <li>• Keep your booking reference handy for check-in</li>
            <li>• You can manage your booking from your account dashboard</li>
          </ul>
        </motion.div>
      </div>
    </main>
  )
}
