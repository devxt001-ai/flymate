"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Send, CheckCircle, ArrowRight } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const subscribe = () => {
    if (!email) return
    setStatus("success")
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background -z-10" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary to-secondary p-0.5 shadow-xl">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl" />
          
          <div className="relative rounded-[1.4rem] bg-black/10 backdrop-blur-xl p-10 md:p-16 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full mb-4">
                  STAY UPDATED
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join Our <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Newsletter</span></h2>
                <p className="text-white/80 mb-6 text-lg">
                  Get exclusive flight deals, travel guides, and smart tips delivered straight to your inbox
                </p>
                
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" /> Weekly personalized flight deals
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" /> Travel tips from industry experts
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle className="w-5 h-5 text-primary-foreground" /> First access to special promotions
                  </div>
                </div>
              </div>
              
              <div className="relative">
                {status === "success" ? (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center border border-white/20 transform transition-all duration-500">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-white/80 mb-6">
                      Check your inbox to confirm your subscription and get your first travel deals.
                    </p>
                    <Button 
                      onClick={() => setStatus("idle")} 
                      className="bg-white text-primary hover:bg-white/90 px-6 gap-2 rounded-xl w-full"
                    >
                      Subscribe Another Email
                    </Button>
                  </div>
                ) : (
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 transform transition-all duration-500">
                    <h3 className="text-xl font-semibold text-white mb-6">Subscribe Now</h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 border border-white/10">
                        <Mail className="w-5 h-5 text-white/70" />
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-transparent outline-none flex-1 text-white placeholder:text-white/50"
                        />
                      </div>
                      <Button 
                        onClick={subscribe} 
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-6 py-6 gap-2 rounded-xl"
                      >
                        Subscribe Now <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                      <p className="text-xs text-white/60 text-center mt-2">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
