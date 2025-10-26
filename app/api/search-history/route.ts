import { sql } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { origin, destination, departure_date, return_date, passengers, email } = body

    const result = await sql`
      INSERT INTO search_history (email, origin, destination, departure_date, return_date, passengers, created_at)
      VALUES (${email || null}, ${origin}, ${destination}, ${departure_date}, ${return_date || null}, ${passengers}, NOW())
      RETURNING id, origin, destination, departure_date, created_at
    `

    console.log("[v0] Search history saved:", result[0])
    return NextResponse.json({ success: true, search: result[0] })
  } catch (error) {
    console.error("[v0] Search history error:", error)
    return NextResponse.json({ error: "Failed to save search history" }, { status: 500 })
  }
}
