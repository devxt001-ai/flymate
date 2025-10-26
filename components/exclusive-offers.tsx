"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const offers = [
  { title: "Summer Getaway", discount: "40% OFF", color: "from-primary to-secondary" },
  { title: "Hotel Deals", discount: "50% OFF", color: "from-accent to-orange-400" },
  { title: "Train Bookings", discount: "25% OFF", color: "from-blue-400 to-cyan-400" },
  { title: "Holiday Packages", discount: "35% OFF", color: "from-purple-400 to-pink-400" },
  { title: "Cab Services", discount: "30% OFF", color: "from-green-400 to-emerald-400" },
  { title: "Group Bookings", discount: "45% OFF", color: "from-orange-400 to-red-400" },
]

export function ExclusiveOffers() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h2
            className="text-3xl font-bold text-foreground"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Exclusive Offers
          </motion.h2>
          <Button variant="outline" className="gap-2 bg-transparent">
            View All Offers
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {offers.map((offer, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card
                className={`bg-gradient-to-br ${offer.color} p-8 text-white rounded-2xl overflow-hidden relative group`}
              >
                <motion.div
                  className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.1)" }}
                />
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                  <p className="text-4xl font-bold mb-4">{offer.discount}</p>
                  <button className="text-white font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Explore Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
