"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { theme, setTheme } = useTheme()
  const { t, language, setLanguage } = useLanguage()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.company")}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.careers")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.press")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.support")}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.faqs")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.helpCenter")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.status")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.policies")}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.cancellation")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.refund")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.services")}</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.flights")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.hotels")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.trains")}
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition">
                  {t("footer.holidays")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-foreground">{t("footer.followUs")}</h4>
            <div className="flex gap-4">
              <button className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition text-foreground">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition text-foreground">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition text-foreground">
                <Instagram className="w-5 h-5" />
              </button>
              <button className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition text-foreground">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/60 text-sm">{t("footer.copyright")}</p>
          <div className="flex gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition flex items-center gap-2 text-foreground text-sm"
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="p-2 bg-muted hover:bg-muted/80 rounded-lg transition text-foreground text-sm outline-none"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
