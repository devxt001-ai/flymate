// Airport data interface
export interface Airport {
  code: string;
  name: string;
  city: string;
  country: string;
}

// Function to fetch airports based on search query
export async function searchAirports(query: string): Promise<Airport[]> {
  if (!query || query.length < 2) return [];
  
  try {
    // In a real app, this would be an API call to your backend
    // For example: return fetch(`/api/airports?q=${query}`).then(res => res.json())
    
    // For now, we'll simulate an API call with a 300ms delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = POPULAR_AIRPORTS.filter(airport => 
          airport.code.toLowerCase().includes(query.toLowerCase()) || 
          airport.name.toLowerCase().includes(query.toLowerCase()) || 
          airport.city.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 10); // Limit to 10 results
        resolve(results);
      }, 300);
    });
  } catch (error) {
    console.error("Error searching airports:", error);
    return [];
  }
}

// Popular airports data
export const POPULAR_AIRPORTS: Airport[] = [
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "United States" },
  { code: "LHR", name: "Heathrow Airport", city: "London", country: "United Kingdom" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
  { code: "HND", name: "Haneda Airport", city: "Tokyo", country: "Japan" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "IST", name: "Istanbul Airport", city: "Istanbul", country: "Turkey" },
  { code: "DEL", name: "Indira Gandhi International Airport", city: "New Delhi", country: "India" },
  { code: "BOM", name: "Chhatrapati Shivaji Maharaj International Airport", city: "Mumbai", country: "India" },
  { code: "BLR", name: "Kempegowda International Airport", city: "Bengaluru", country: "India" },
  { code: "MAA", name: "Chennai International Airport", city: "Chennai", country: "India" },
  { code: "HYD", name: "Rajiv Gandhi International Airport", city: "Hyderabad", country: "India" },
  { code: "CCU", name: "Netaji Subhas Chandra Bose International Airport", city: "Kolkata", country: "India" },
  { code: "PNQ", name: "Pune Airport", city: "Pune", country: "India" },
  { code: "BKK", name: "Suvarnabhumi Airport", city: "Bangkok", country: "Thailand" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia" },
  { code: "MEX", name: "Mexico City International Airport", city: "Mexico City", country: "Mexico" },
  { code: "GRU", name: "São Paulo–Guarulhos International Airport", city: "São Paulo", country: "Brazil" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { code: "MAD", name: "Adolfo Suárez Madrid–Barajas Airport", city: "Madrid", country: "Spain" },
  { code: "BCN", name: "Josep Tarradellas Barcelona–El Prat Airport", city: "Barcelona", country: "Spain" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  { code: "FCO", name: "Leonardo da Vinci–Fiumicino Airport", city: "Rome", country: "Italy" },
  { code: "SVO", name: "Sheremetyevo International Airport", city: "Moscow", country: "Russia" },
  { code: "ICN", name: "Incheon International Airport", city: "Seoul", country: "South Korea" },
  { code: "HKG", name: "Hong Kong International Airport", city: "Hong Kong", country: "China" },
  { code: "PEK", name: "Beijing Capital International Airport", city: "Beijing", country: "China" }
];