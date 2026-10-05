CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'lead',

  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  process_text TEXT NOT NULL,

  assessment_title TEXT,
  complexity TEXT,
  budget_band TEXT,
  timeframe TEXT,
  systems_json TEXT,
  human_control TEXT,
  assessment_json TEXT,
  page_path TEXT,

  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  oppref TEXT,

  booking_started_at TEXT,
  appointment_scheduled_at TEXT,
  appointment_canceled_at TEXT,
  calendly_invitee_uri TEXT,
  calendly_event_uri TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads(utm_campaign);
