"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"

interface BookingStepsProps {
  currentStep: number
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  const steps = [
    { number: 1, title: "Passenger Details" },
    { number: 2, title: "Seat Selection" },
    { number: 3, title: "Add-ons" },
    { number: 4, title: "Payment" },
  ]

  return (
    <div className="flex justify-between mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center flex-1">
            <motion.div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                step.number < currentStep
                  ? "bg-primary text-white"
                  : step.number === currentStep
                    ? "bg-primary text-white ring-4 ring-primary/30"
                    : "bg-muted text-foreground/60"
              }`}
              animate={{
                scale: step.number === currentStep ? 1.1 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {step.number < currentStep ? <Check className="w-6 h-6" /> : step.number}
            </motion.div>
            <motion.p
              className={`text-sm font-medium mt-2 text-center ${step.number <= currentStep ? "text-foreground" : "text-foreground/60"}`}
              animate={{
                opacity: step.number <= currentStep ? 1 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            >
              {step.title}
            </motion.p>
          </div>
          {index < steps.length - 1 && (
            <motion.div
              className={`h-1 flex-1 mx-2 rounded-full transition-all ${
                step.number < currentStep ? "bg-primary" : "bg-muted"
              }`}
              animate={{
                scaleX: step.number < currentStep ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
