import { createOrder } from "@/lib/duffel-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Create order request received")

    const { offerId, passengers, email, phone } = body

    const orderPayload = {
      selected_offers: [offerId],
      passengers: passengers.map((p: any) => ({
        id: p.id,
        title: p.title,
        given_name: p.firstName,
        family_name: p.lastName,
        email: email,
        phone_number: phone,
        born_at: p.dateOfBirth,
        gender: p.gender || "m",
      })),
      contact: {
        email_address: email,
        phone_number: phone,
      },
    }

    console.log("[v0] Creating order with payload:", orderPayload)
    const order = await createOrder(orderPayload)

    return NextResponse.json(order)
  } catch (error: any) {
    console.error("[v0] Create order error:", error)
    return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 })
  }
}
