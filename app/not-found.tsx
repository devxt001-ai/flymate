"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plane, Home, Search } from "lucide-react"

export default function NotFound() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
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

  const planeVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
    animate: {
      x: [0, 20, 0],
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12">
      <motion.div
        className="max-w-2xl w-full text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated Plane */}
        <motion.div
          className="mb-8 flex justify-center"
          variants={planeVariants}
          initial="hidden"
          animate={["visible", "animate"]}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <Plane className="w-24 h-24 text-primary relative z-10" />
          </div>
        </motion.div>

        {/* 404 Text */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-bold text-foreground mb-2">Oops! Flight Not Found</p>
          <p className="text-lg text-foreground/70">
            It seems like this page has taken off without us. Let's get you back on track!
          </p>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div variants={itemVariants} className="my-12 flex justify-center gap-4 text-4xl">
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
          >
            ✈️
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          >
            🌍
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          >
            🗺️
          </motion.span>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/")}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
          <Button
            onClick={() => router.push("/search")}
            variant="outline"
            className="border-2 border-primary text-foreground hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Search Flights
          </Button>
        </motion.div>

        {/* Additional Info */}
        <motion.div variants={itemVariants} className="mt-12 p-6 bg-card border border-border rounded-xl">
          <p className="text-foreground/80 mb-4">Need help? Our 24/7 support team is ready to assist you!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <a href="mailto:support@flymate.com" className="text-primary hover:underline font-semibold">
              📧 support@flymate.com
            </a>
            <span className="text-foreground/40">•</span>
            <a href="tel:+1234567890" className="text-primary hover:underline font-semibold">
              📞 +1 (234) 567-890
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
