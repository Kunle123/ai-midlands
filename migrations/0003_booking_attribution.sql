-- Opaque, short-lived booking tokens link consented click IDs to Calendly webhook events.
CREATE TABLE IF NOT EXISTS booking_attribution (
  token TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  gclid TEXT,
  gbraid TEXT,
  wbraid TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  calendly_invitee_uri TEXT UNIQUE,
  booking_created_at TEXT,
  conversion_state TEXT NOT NULL DEFAULT 'pending',
  upload_claimed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_booking_attribution_created ON booking_attribution(created_at);
