import { getOffer } from "@/lib/duffel-client"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const offerId = request.nextUrl.searchParams.get("id")

    if (!offerId) {
      return NextResponse.json({ error: "Offer ID is required" }, { status: 400 })
    }

    console.log("[v0] Fetching offer:", offerId)
    const offer = await getOffer(offerId)

    return NextResponse.json(offer)
  } catch (error: any) {
    console.error("[v0] Get offer error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch offer" }, { status: 500 })
  }
}
