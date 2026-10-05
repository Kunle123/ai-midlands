# AI Midlands lead capture setup

The application now contains a Cloudflare Worker API for the assessment funnel. The site remains usable if the database is not configured; the server-side lead form appears automatically once `/api/health` reports an active D1 binding.

## 1. Create the D1 lead database

From the repository root while authenticated with Wrangler:

```bash
npx wrangler d1 create ai-midlands-leads --binding LEADS_DB --update-config
```

This adds the real `database_id` to `wrangler.jsonc` without committing a placeholder ID.

Apply the schema:

```bash
npx wrangler d1 migrations apply ai-midlands-leads --remote
```

Deploy:

```bash
pnpm build
npx wrangler deploy
```

Confirm:

```bash
curl https://ai-midlands.co.uk/api/health
```

Expected after D1 is active:

```json
{"ok":true,"leadCapture":true,"notifications":false,"calendlyWebhook":false}
```

## 2. Protect lead administration

Create a strong secret:

```bash
npx wrangler secret put LEADS_ADMIN_TOKEN
```

List recent leads:

```bash
curl -H "Authorization: Bearer <token>" \
  "https://ai-midlands.co.uk/api/admin/leads?limit=100"
```

Update a lead when it becomes a proposal, customer or lost opportunity:

```bash
curl -X PATCH \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"status":"customer"}' \
  "https://ai-midlands.co.uk/api/admin/leads/<lead-id>"
```

Allowed statuses are `lead`, `booking_started`, `appointment_scheduled`, `appointment_canceled`, `proposal`, `customer`, and `lost`.

## 3. Optional: new-lead email notification

Cloudflare Email Service can notify `hello@ai-midlands.co.uk` when a lead is saved. Onboard `ai-midlands.co.uk` in Cloudflare Email Service first, then add a send-email binding named `LEAD_NOTIFY` restricted to the destination address.

Example `wrangler.jsonc` entry:

```jsonc
"send_email": [
  {
    "name": "LEAD_NOTIFY",
    "destination_address": "hello@ai-midlands.co.uk"
  }
]
```

The Worker sends from `website@ai-midlands.co.uk`, so that sender/domain must be valid for the Email Service configuration.

## 4. Optional: Calendly appointment status

The Worker exposes:

```text
POST https://ai-midlands.co.uk/api/calendly
```

Create a Calendly webhook subscription for `invitee.created` and `invitee.canceled` using that callback URL and a webhook signing key. Store the same signing key in Cloudflare:

```bash
npx wrangler secret put CALENDLY_WEBHOOK_SIGNING_KEY
```

When Calendly sends a verified event, the Worker matches the most recent lead by invitee email and changes the funnel status to `appointment_scheduled` or `appointment_canceled`.

## Funnel recorded

The database supports:

```text
assessment_completed (analytics)
        ↓
lead
        ↓
booking_started
        ↓
appointment_scheduled
        ↓
proposal
        ↓
customer / lost
```

The browser measurement layer records `assessment_started`, `assessment_completed`, `lead_submitted`, `lead_created`, and `booking_started` when consent has been granted. The D1 record is the first-party commercial source of truth and does not depend on analytics consent.
