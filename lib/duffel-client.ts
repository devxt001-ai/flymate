// This file is only imported in API routes and server components

const DUFFEL_API_BASE = "https://api.duffel.com/v1"

// Use server-side environment variable without NEXT_PUBLIC prefix
const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_ACCESS_TOKEN

if (!DUFFEL_ACCESS_TOKEN) {
  console.warn("[v0] DUFFEL_ACCESS_TOKEN environment variable is not set")
}

export interface DuffelPassenger {
  type: "adult" | "child" | "infant"
  age?: number
}

export interface DuffelSlice {
  origin: string
  destination: string
  departure_date: string
}

export interface OfferRequest {
  slices: DuffelSlice[]
  passengers: DuffelPassenger[]
  cabin_class?: "economy" | "premium_economy" | "business" | "first"
}

export interface Offer {
  id: string
  base_price: string
  tax_total_amount: string
  total_amount: string
  owner: {
    iata_code: string
    name: string
  }
  slices: Array<{
    id: string
    origin: {
      iata_code: string
      name: string
    }
    destination: {
      iata_code: string
      name: string
    }
    departure_at: string
    arrival_at: string
    duration: string
    segments: Array<{
      id: string
      operating_carrier: {
        iata_code: string
        name: string
      }
      aircraft: {
        iata_code: string
        name: string
      }
      departure_at: string
      arrival_at: string
      origin: {
        iata_code: string
      }
      destination: {
        iata_code: string
      }
    }>
  }>
}

export async function createOfferRequest(payload: OfferRequest) {
  try {
    const response = await fetch(`${DUFFEL_API_BASE}/offer_requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DUFFEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Duffel API Error:", error)
      throw new Error(`Duffel API Error: ${error.errors?.[0]?.message || "Unknown error"}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Failed to create offer request:", error)
    throw error
  }
}

export async function getOfferRequest(id: string) {
  try {
    const response = await fetch(`${DUFFEL_API_BASE}/offer_requests/${id}`, {
      headers: {
        Authorization: `Bearer ${DUFFEL_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch offer request")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Failed to get offer request:", error)
    throw error
  }
}

export async function getOffer(id: string) {
  try {
    const response = await fetch(`${DUFFEL_API_BASE}/offers/${id}`, {
      headers: {
        Authorization: `Bearer ${DUFFEL_ACCESS_TOKEN}`,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch offer")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Failed to get offer:", error)
    throw error
  }
}

export async function createOrder(payload: any) {
  try {
    const response = await fetch(`${DUFFEL_API_BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DUFFEL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error("[v0] Duffel Order Error:", error)
      throw new Error(`Failed to create order: ${error.errors?.[0]?.message || "Unknown error"}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("[v0] Failed to create order:", error)
    throw error
  }
}
