# AI Midlands lead capture setup

The application contains a Cloudflare Worker API for the assessment funnel. The site remains usable if the database is not configured; the server-side lead form appears automatically once `/api/health` reports an active D1 binding.

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

Expected after D1 is active but before notifications/Calendly are configured:

```json
{"ok":true,"leadCapture":true,"notifications":false,"notificationProvider":null,"calendlyWebhook":false}
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

## 3. New-lead email notification with Resend

The production notification path uses Resend so it works without upgrading the Cloudflare Workers plan.

Create and verify the sending subdomain:

```text
notify.ai-midlands.co.uk
```

Resend supplies the DNS records for the subdomain. Add those records in Cloudflare as DNS-only records and wait for Resend to show the domain as verified.

Create a send-only Resend API key for AI Midlands, then store it as a Cloudflare Worker secret:

```bash
npx wrangler secret put RESEND_API_KEY
```

The Worker sends notifications:

```text
From: AI Midlands <website@notify.ai-midlands.co.uk>
To: enquiries@ai-midlands.co.uk
Reply-To: the lead's email address
```

The Resend request uses an idempotency key based on the lead ID so a retry does not create a duplicate notification.

After deploying the Resend-enabled Worker, confirm:

```bash
curl https://ai-midlands.co.uk/api/health
```

Expected notification state:

```json
{"notifications":true,"notificationProvider":"resend"}
```

## 4. Optional fallback: Cloudflare Email Service

The Worker still supports a Cloudflare send-email binding named `LEAD_NOTIFY` as a fallback. Resend takes precedence when `RESEND_API_KEY` is configured.

## 5. Calendly appointment status

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
