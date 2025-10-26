"use client"

import { Card } from "@/components/ui/card"
import { Shield, Headphones, RefreshCw, Lock } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Best Price Guarantee",
    description: "We guarantee the lowest prices or we'll match any offer",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated team is always here to help you",
  },
  {
    icon: RefreshCw,
    title: "Instant Refunds",
    description: "Quick and hassle-free refund process",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    description: "Your payment information is always protected",
  },
]

export function WhyBookWithUs() {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Book With Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <Card
                key={idx}
                className="p-6 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 bg-card border border-border"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
