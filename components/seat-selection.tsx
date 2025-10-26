"use client"

import { motion } from "framer-motion"

interface SeatSelectionProps {
  selectedSeats: string[]
  setSelectedSeats: (seats: string[]) => void
}

export function SeatSelection({ selectedSeats, setSelectedSeats }: SeatSelectionProps) {
  const rows = ["A", "B", "C", "D", "E", "F"]
  const columns = Array.from({ length: 6 }, (_, i) => i + 1)
  const bookedSeats = ["A1", "A2", "B3", "C5", "D2", "E4", "F1", "F6"]

  const toggleSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat))
    } else {
      setSelectedSeats([...selectedSeats, seat])
    }
  }

  const getSeatStatus = (seat: string) => {
    if (selectedSeats.includes(seat)) return "selected"
    if (bookedSeats.includes(seat)) return "booked"
    return "available"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Select Your Seats</h2>

      <div className="flex justify-center mb-8">
        <div className="inline-block">
          {/* Seat Grid */}
          <motion.div className="space-y-2" variants={containerVariants} initial="hidden" animate="visible">
            {rows.map((row) => (
              <div key={row} className="flex gap-2 items-center">
                <span className="w-6 text-center font-semibold text-foreground/60">{row}</span>
                <div className="flex gap-2">
                  {columns.map((col) => {
                    const seat = `${row}${col}`
                    const status = getSeatStatus(seat)

                    return (
                      <motion.button
                        key={seat}
                        onClick={() => status === "available" && toggleSeat(seat)}
                        disabled={status === "booked"}
                        className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                          status === "available"
                            ? "bg-muted text-foreground hover:bg-primary hover:text-white cursor-pointer"
                            : status === "selected"
                              ? "bg-primary text-white"
                              : "bg-destructive/20 text-destructive cursor-not-allowed"
                        }`}
                        variants={itemVariants}
                        whileHover={status === "available" ? { scale: 1.1 } : {}}
                        whileTap={status === "available" ? { scale: 0.95 } : {}}
                      >
                        {col}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Legend */}
          <div className="flex gap-6 justify-center mt-8 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-muted rounded" />
              <span className="text-sm text-foreground/70">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded" />
              <span className="text-sm text-foreground/70">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-destructive/20 rounded" />
              <span className="text-sm text-foreground/70">Booked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <motion.div
          className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm font-semibold text-foreground mb-2">Selected Seats:</p>
          <p className="text-lg font-bold text-primary">{selectedSeats.join(", ")}</p>
        </motion.div>
      )}
    </div>
  )
}
