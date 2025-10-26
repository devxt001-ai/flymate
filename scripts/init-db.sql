-- Create bookings table for storing flight bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  offer_id VARCHAR(255) NOT NULL,
  passengers JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  email VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_offer_id ON bookings(offer_id);

-- Create search history table for tracking user searches
CREATE TABLE IF NOT EXISTS search_history (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  origin VARCHAR(10),
  destination VARCHAR(10),
  departure_date DATE,
  return_date DATE,
  passengers INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_search_history_email ON search_history(email);
