ALTER TABLE leads ADD COLUMN customer_at TEXT;

UPDATE leads
SET customer_at = updated_at
WHERE status = 'customer' AND customer_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_leads_customer_at ON leads(customer_at);
CREATE INDEX IF NOT EXISTS idx_leads_appointment_scheduled_at ON leads(appointment_scheduled_at);
