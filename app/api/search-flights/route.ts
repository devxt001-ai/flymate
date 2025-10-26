import { createOfferRequest } from "@/lib/duffel-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Search request received:", body)

    const { from, to, departureDate, returnDate, passengers, cabinClass } = body

    // Build passenger array
    const passengerArray = passengers.map((p: any) => ({
      type: p.type || "adult",
      age: p.age,
    }))

    // Build slices
    const slices = [
      {
        origin: from,
        destination: to,
        departure_date: departureDate,
      },
    ]

    if (returnDate) {
      slices.push({
        origin: to,
        destination: from,
        departure_date: returnDate,
      })
    }

    const offerRequest = {
      slices,
      passengers: passengerArray,
      cabin_class: cabinClass || "economy",
    }

    console.log("[v0] Creating offer request with:", offerRequest)
    const result = await createOfferRequest(offerRequest)

    return NextResponse.json(result)
  } catch (error: any) {
    console.error("[v0] Search flights error:", error)
    return NextResponse.json({ error: error.message || "Failed to search flights" }, { status: 500 })
  }
}
