"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Business Traveler",
    text: "FlyMate made booking my flights incredibly easy. The prices are unbeatable!",
    rating: 5,
    avatar: "👩‍💼",
  },
  {
    name: "Rajesh Kumar",
    role: "Vacation Planner",
    text: "Best travel booking platform I've used. Customer support is amazing!",
    rating: 5,
    avatar: "👨‍💼",
  },
  {
    name: "Anjali Patel",
    role: "Frequent Flyer",
    text: "The deals and offers are fantastic. Saved so much on my last trip!",
    rating: 5,
    avatar: "👩‍🦰",
  },
]

export function Testimonials() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} className="p-6 bg-card border border-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{testimonial.avatar}</span>
                <div>
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/70">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground/80 italic">"{testimonial.text}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
