# Booked consultation measurement

**Status: GA4 Measurement Protocol implementation is on `feature/google-calendly-booking-attribution`. It is not deployed, and a live `booked_consultation` event has not been verified.**

## What counts

A confirmed Calendly booking is the only booking conversion. The Worker sends one GA4 event named `booked_consultation`, with currency `GBP` and value `25`, after a signed `invitee.created` webhook. A Calendly click and the existing `booking_started` analytics event are not that conversion. Enquiry `generate_lead` and the ChatGPT Ads `lead_created` pixel are unchanged.

## Flow

1. After measurement consent, the site reads the GA4 `client_id` and `session_id`. It does not read them when consent is missing or denied.
2. A click on `https://calendly.com/kunle2000/30min` requests `POST /api/booking-attribution`. The opaque token is Calendly `utm_content`. Click IDs and the API secret are not placed on the Calendly URL.
3. A signed `invitee.created` webhook marks that token ready. `invitee.canceled` marks a pending, ready, or in-flight row canceled. One later reschedule can become ready again.
4. Every 30 minutes the Worker claims each ready row, validates it with the GA4 debug endpoint, then sends it to Measurement Protocol. The row is marked sent only after debug reports no validation messages and the collect endpoint returns HTTP 204. A transport failure releases the claim. An invalid payload is rejected and is not retried. `transaction_id` is the booking token.

## Configuration

- Build-time public variable: `VITE_GA_MEASUREMENT_ID=G-W3T6L19819`.
- Worker variable: `GA4_MEASUREMENT_ID=G-W3T6L19819`.
- Worker secret, already expected by name: `GA4_API_SECRET`. Do not put this value in wrangler vars, source, or logs.
- The collect request puts the secret in the Measurement Protocol query string. Do not print that URL.
- Protected retry: `POST /api/admin/ga4/booked-consultations` with `Authorization: Bearer <LEADS_ADMIN_TOKEN>`.
- The Google Ads offline click upload route and Google Ads API credential requirements have been removed. In GA4, mark `booked_consultation` as the key event. Do not mark `booking_started` as a key event.

## Still required before this can go live

- `GA4_API_SECRET` must be present on the `ai-midlands` Worker. A secret list that does not include that name means it is not configured for this Worker.
- Calendly `invitee.created` and `invitee.canceled` for `https://calendly.com/kunle2000/30min` must target `https://ai-midlands.co.uk/api/calendly` and use `CALENDLY_WEBHOOK_SIGNING_KEY`. There is no Calendly API token in this repo, so the subscription cannot be listed from here.
- Apply D1 migrations `0002_google_ads_attribution.sql` and `0003_booking_attribution.sql` only as part of deploying this Worker. Both are still pending.
