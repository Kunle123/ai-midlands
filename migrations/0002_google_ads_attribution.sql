-- Consent-gated attribution values, populated only for assessment leads.
-- Do not infer a booked meeting conversion from these fields alone.
ALTER TABLE leads ADD COLUMN gclid TEXT;
ALTER TABLE leads ADD COLUMN gbraid TEXT;
ALTER TABLE leads ADD COLUMN wbraid TEXT;
