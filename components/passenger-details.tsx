"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2 } from "lucide-react"

interface Passenger {
  id: number
  title: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
}

interface PassengerDetailsProps {
  passengers: Passenger[]
  setPassengers: (passengers: Passenger[]) => void
}

export function PassengerDetails({ passengers, setPassengers }: PassengerDetailsProps) {
  const handlePassengerChange = (id: number, field: string, value: string) => {
    setPassengers(passengers.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const addPassenger = () => {
    const newId = Math.max(...passengers.map((p) => p.id), 0) + 1
    setPassengers([
      ...passengers,
      { id: newId, title: "Mr", firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "", gender: "m" },
    ])
  }

  const removePassenger = (id: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Passenger Details</h2>

      <div className="space-y-8">
        {passengers.map((passenger, index) => (
          <div key={passenger.id} className="pb-8 border-b border-border last:border-b-0">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-foreground">Passenger {index + 1}</h3>
              {passengers.length > 1 && (
                <button
                  onClick={() => removePassenger(passenger.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
                <select
                  value={passenger.title}
                  onChange={(e) => handlePassengerChange(passenger.id, "title", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option>Mr</option>
                  <option>Mrs</option>
                  <option>Ms</option>
                  <option>Dr</option>
                </select>
              </div>

              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">First Name *</label>
                <input
                  type="text"
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(passenger.id, "firstName", e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Last Name *</label>
                <input
                  type="text"
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(passenger.id, "lastName", e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={passenger.dateOfBirth}
                  onChange={(e) => handlePassengerChange(passenger.id, "dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Gender</label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(passenger.id, "gender", e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                  <option value="u">Other</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handlePassengerChange(passenger.id, "email", e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Phone */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handlePassengerChange(passenger.id, "phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Passenger Button */}
      <Button
        onClick={addPassenger}
        variant="outline"
        className="mt-6 gap-2 border-primary text-primary hover:bg-primary/10 bg-transparent"
      >
        <Plus className="w-4 h-4" />
        Add Another Passenger
      </Button>
    </div>
  )
}
