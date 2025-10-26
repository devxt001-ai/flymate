"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

const recentSearches = [
  { from: "Delhi", to: "Dubai", price: "₹12,500", discount: "20% Off", airline: "🛫" },
  { from: "Mumbai", to: "London", price: "₹28,000", discount: "Popular", airline: "🛫" },
  { from: "Bangalore", to: "Singapore", price: "₹8,500", discount: "15% Off", airline: "🛫" },
  { from: "Hyderabad", to: "Bangkok", price: "₹6,200", discount: "Trending", airline: "🛫" },
]

export function RecentSearches() {
  const { t } = useLanguage()

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl font-bold text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {t("recentSearches.title")}
        </motion.h2>

        <motion.div
          className="overflow-x-auto pb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex gap-4 min-w-max">
            {recentSearches.map((search, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <Card className="flex-shrink-0 w-72 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-card border border-border">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-foreground/60">{t("recentSearches.route")}</p>
                        <p className="text-lg font-semibold text-foreground">
                          {search.from} → {search.to}
                        </p>
                      </div>
                      <span className="text-3xl">{search.airline}</span>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm text-foreground/60">{t("recentSearches.startingFrom")}</p>
                        <p className="text-2xl font-bold text-primary">{search.price}</p>
                      </div>
                      <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                        {search.discount}
                      </span>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
