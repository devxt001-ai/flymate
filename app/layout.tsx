import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: {
    default: "FlyMate — Book Flights, Hotels, Trains & Holidays",
    template: "%s | FlyMate",
  },
  description:
    "Search and book international and domestic flights, hotels, trains and holidays at the best prices. Trusted by millions.",
  keywords: [
    "flights",
    "cheap flights",
    "flight booking",
    "airline tickets",
    "international flights",
    "domestic flights",
    "hotels",
    "train tickets",
    "travel deals",
    "vacation packages",
    "FlyMate",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "FlyMate — Book Flights, Hotels, Trains & Holidays",
    description:
      "Search and book flights, hotels, trains and holidays at the best prices.",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "FlyMate travel booking" }],
    siteName: "FlyMate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlyMate — Book Flights & Holidays",
    description:
      "Search and book flights, hotels, trains and holidays at the best prices.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
  themeColor: "#3b82f6",
  viewport: { width: "device-width", initialScale: 1 },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} font-sans antialiased`}>
        <LanguageProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Analytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
