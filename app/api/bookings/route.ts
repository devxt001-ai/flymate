import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { offerId, passengers, totalPrice, email } = body

    const result = await sql`
      INSERT INTO bookings (offer_id, passengers, total_price, email, status, created_at)
      VALUES (${offerId}, ${JSON.stringify(passengers)}, ${totalPrice}, ${email}, 'pending', NOW())
      RETURNING id, offer_id, email, status, created_at
    `

    return NextResponse.json({ success: true, booking: result[0] })
  } catch (error) {
    console.error("[v0] Booking error:", error)
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 })
    }

    const bookings = await sql`
      SELECT * FROM bookings WHERE email = ${email} ORDER BY created_at DESC
    `

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("[v0] Fetch bookings error:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
