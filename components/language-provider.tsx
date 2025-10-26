"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "es" | "fr" | "de" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.flights": "Flights",
    "nav.hotels": "Hotels",
    "nav.trains": "Trains",
    "nav.cabs": "Cabs",
    "nav.holidays": "Holidays",
    "nav.offers": "Offers",
    "nav.support": "Support",
    "nav.login": "Login",
    "hero.title": "Explore the World with",
    "hero.subtitle": "Book flights, hotels, trains, and holidays at the best prices. Trusted by millions worldwide.",
    "search.from": "From",
    "search.to": "To",
    "search.departure": "Departure",
    "search.return": "Return",
    "search.travelers": "Travelers",
    "search.button": "Search Flights",
    "recent.title": "Recent Searches & Deals",
    "offers.title": "Exclusive Offers",
    "offers.viewAll": "View All Offers",
    "results.found": "Flights Found",
    "results.sort": "Sort by",
    "booking.title": "Complete Your Booking",
    "booking.passenger": "Passenger Details",
    "booking.seats": "Seat Selection",
    "booking.addons": "Add-ons",
    "booking.payment": "Payment",
    "booking.previous": "Previous",
    "booking.next": "Next",
    "booking.complete": "Complete Booking",
  },
  es: {
    "nav.flights": "Vuelos",
    "nav.hotels": "Hoteles",
    "nav.trains": "Trenes",
    "nav.cabs": "Taxis",
    "nav.holidays": "Vacaciones",
    "nav.offers": "Ofertas",
    "nav.support": "Soporte",
    "nav.login": "Iniciar sesión",
    "hero.title": "Explora el mundo con",
    "hero.subtitle":
      "Reserva vuelos, hoteles, trenes y vacaciones a los mejores precios. Confiado por millones en todo el mundo.",
    "search.from": "Desde",
    "search.to": "Hacia",
    "search.departure": "Salida",
    "search.return": "Regreso",
    "search.travelers": "Viajeros",
    "search.button": "Buscar Vuelos",
    "recent.title": "Búsquedas Recientes y Ofertas",
    "offers.title": "Ofertas Exclusivas",
    "offers.viewAll": "Ver Todas las Ofertas",
    "results.found": "Vuelos Encontrados",
    "results.sort": "Ordenar por",
    "booking.title": "Completa tu Reserva",
    "booking.passenger": "Detalles del Pasajero",
    "booking.seats": "Selección de Asientos",
    "booking.addons": "Complementos",
    "booking.payment": "Pago",
    "booking.previous": "Anterior",
    "booking.next": "Siguiente",
    "booking.complete": "Completar Reserva",
  },
  fr: {
    "nav.flights": "Vols",
    "nav.hotels": "Hôtels",
    "nav.trains": "Trains",
    "nav.cabs": "Taxis",
    "nav.holidays": "Vacances",
    "nav.offers": "Offres",
    "nav.support": "Support",
    "nav.login": "Connexion",
    "hero.title": "Explorez le monde avec",
    "hero.subtitle":
      "Réservez des vols, hôtels, trains et vacances aux meilleurs prix. Approuvé par des millions dans le monde.",
    "search.from": "De",
    "search.to": "Vers",
    "search.departure": "Départ",
    "search.return": "Retour",
    "search.travelers": "Voyageurs",
    "search.button": "Rechercher des Vols",
    "recent.title": "Recherches Récentes et Offres",
    "offers.title": "Offres Exclusives",
    "offers.viewAll": "Voir Toutes les Offres",
    "results.found": "Vols Trouvés",
    "results.sort": "Trier par",
    "booking.title": "Complétez votre Réservation",
    "booking.passenger": "Détails du Passager",
    "booking.seats": "Sélection des Sièges",
    "booking.addons": "Suppléments",
    "booking.payment": "Paiement",
    "booking.previous": "Précédent",
    "booking.next": "Suivant",
    "booking.complete": "Terminer la Réservation",
  },
  de: {
    "nav.flights": "Flüge",
    "nav.hotels": "Hotels",
    "nav.trains": "Züge",
    "nav.cabs": "Taxis",
    "nav.holidays": "Urlaub",
    "nav.offers": "Angebote",
    "nav.support": "Unterstützung",
    "nav.login": "Anmelden",
    "hero.title": "Erkunden Sie die Welt mit",
    "hero.subtitle":
      "Buchen Sie Flüge, Hotels, Züge und Urlaub zu den besten Preisen. Vertraut von Millionen weltweit.",
    "search.from": "Von",
    "search.to": "Nach",
    "search.departure": "Abflug",
    "search.return": "Rückkehr",
    "search.travelers": "Reisende",
    "search.button": "Flüge Suchen",
    "recent.title": "Letzte Suchen und Angebote",
    "offers.title": "Exklusive Angebote",
    "offers.viewAll": "Alle Angebote Anzeigen",
    "results.found": "Flüge Gefunden",
    "results.sort": "Sortieren nach",
    "booking.title": "Buchen Sie Ihre Reise",
    "booking.passenger": "Passagierdetails",
    "booking.seats": "Sitzplatzwahl",
    "booking.addons": "Zusatzleistungen",
    "booking.payment": "Zahlung",
    "booking.previous": "Zurück",
    "booking.next": "Weiter",
    "booking.complete": "Buchung Abschließen",
  },
  hi: {
    "nav.flights": "उड़ानें",
    "nav.hotels": "होटल",
    "nav.trains": "ट्रेनें",
    "nav.cabs": "कैब",
    "nav.holidays": "छुट्टियां",
    "nav.offers": "ऑफर",
    "nav.support": "सहायता",
    "nav.login": "लॉगिन",
    "hero.title": "FlyMate के साथ दुनिया की खोज करें",
    "hero.subtitle": "सर्वोत्तम कीमतों पर उड़ानें, होटल, ट्रेनें और छुट्टियां बुक करें। दुनिया भर में लाखों द्वारा विश्वसनीय।",
    "search.from": "से",
    "search.to": "को",
    "search.departure": "प्रस्थान",
    "search.return": "वापसी",
    "search.travelers": "यात्री",
    "search.button": "उड़ानें खोजें",
    "recent.title": "हाल की खोजें और डील",
    "offers.title": "विशेष ऑफर",
    "offers.viewAll": "सभी ऑफर देखें",
    "results.found": "उड़ानें मिलीं",
    "results.sort": "इसके अनुसार क्रमबद्ध करें",
    "booking.title": "अपनी बुकिंग पूरी करें",
    "booking.passenger": "यात्री विवरण",
    "booking.seats": "सीट चयन",
    "booking.addons": "ऐड-ऑन",
    "booking.payment": "भुगतान",
    "booking.previous": "पिछला",
    "booking.next": "अगला",
    "booking.complete": "बुकिंग पूरी करें",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
