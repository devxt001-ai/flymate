"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Send } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-white/80 mb-8">Get exclusive deals and travel tips delivered to your inbox</p>

        <div className="flex gap-2 max-w-md mx-auto">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-lg px-4 py-3">
            <Mail className="w-5 h-5 text-primary" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none flex-1 text-foreground"
            />
          </div>
          <Button className="bg-white text-primary hover:bg-white/90 px-6 gap-2">
            <Send className="w-4 h-4" />
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  )
}
