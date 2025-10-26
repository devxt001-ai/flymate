"use client"

import { SearchBar } from "./search-bar"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Plane, Sparkles } from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Heading */}
        <motion.div className="text-center mb-12" variants={itemVariants as any}>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            {t("hero.title")} {" "}
            <span className="brand-shine gradient-underline">FlyMate</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto text-balance">{t("hero.subtitle")}</p>

          {/* badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground/80">
              <Sparkles className="h-4 w-4 text-primary" /> Best price guarantee
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground/80">
              <Plane className="h-4 w-4 text-secondary" /> No hidden fees
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-sm text-foreground/80">
              24/7 support
            </span>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button className="px-6">Search Flights</Button>
            <Button variant="outline" className="px-6 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary dark:hover:text-primary-foreground dark:hover:border-primary">Explore Destinations</Button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div className="max-w-6xl mx-auto" variants={itemVariants as any}>
          <SearchBar />
        </motion.div>
      </motion.div>
    </section>
  )
}
