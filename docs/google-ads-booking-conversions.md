# Google Ads booked-consultation conversion: activation checklist

**Status: conversion action identified and documented; draft implementation not activated or verified.**

## Confirmed Google Ads mapping (9 October 2026)
- Google Ads customer ID: `6483337211`.
- Newly created offline click-import conversion action ID: `7833321822`.
- Conversion action resource: `customers/6483337211/conversionActions/7833321822`.
- Current Google Ads name: `offline (upload)`; category: **Qualified lead**. Rename to **Booked consultation** in Google Ads for clarity.
- Set Worker configuration `GOOGLE_ADS_CUSTOMER_ID=6483337211` and `GOOGLE_ADS_CONVERSION_ACTION_ID=7833321822` when deploying; this document does **not** set live Cloudflare secrets.
- Current action is **Primary**, counts **Every conversion**, and defaults to £1 when no value is sent. Recommend switching count to **One** and keeping it **Secondary** until upload verification. Uploader currently sends £1 per booking; agree and configure a higher booking value before activating.
- Google Ads currently reports no associated data source and no uploaded conversions. The Google Ads API upload path is the intended source.


## Flow
1. With measurement consent, the website captures a Google click ID (gclid, gbraid or wbraid).
2. A visitor clicking Calendly gets a short-lived, random booking token from POST /api/booking-attribution. The token travels as Calendly utm_content; no click ID or visitor email is placed in the Calendly URL.
3. A signed Calendly invitee.created webhook matches payload.tracking.utm_content to that token and records the confirmed booking.
4. A Cloudflare Worker cron runs every 30 minutes and uploads ready bookings through Google Ads uploadClickConversions. A protected operator endpoint POST /api/admin/google-ads/upload-bookings supports manual retries. Each booking is submitted individually and marked uploaded only after successful API acknowledgement.

## Required manual configuration
- The **Google Ads imported/offline click conversion** already exists (ID `7833321822`, currently named `offline (upload)`). Do **not** create another. Rename it **Booked consultation** in Google Ads. It is **not** the existing website event-snippet conversion label. Use the correct customer ID and developer token.
- Set Cloudflare Worker secrets GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_CONVERSION_ACTION_ID, LEADS_ADMIN_TOKEN, CALENDLY_WEBHOOK_SIGNING_KEY. GOOGLE_ADS_API_VERSION can be set to the currently supported version (default v22; verify against current Google Ads API support).
- Register a Calendly invitee.created webhook targeting https://ai-midlands.co.uk/api/calendly. Verify signature and the tracking.utm_content field with a test booking.
- Apply D1 migrations 0002 and 0003 before deploying the Worker.
- Cloudflare Worker cron is configured in wrangler.jsonc for every 30 minutes; verify the scheduled handler and worker trigger after deployment.
- Check the Google Ads offline-conversion upload prerequisites, including enhanced conversions settings where applicable, account eligibility, conversion-action ownership and OAuth scope.
- Verify real consent granted/denied flows, booking token delivery, Calendly signed webhook, one-booking-only handling, Google Ads API response, deduplication, and conversion appearing in Google Ads diagnostics.
- Do not make this conversion Primary until production tracking is proven.

## Known limitations / review required
- Google Ads offline click uploads may require specific click-ID handling and API-version updates; confirm gbraid/wbraid support for the selected API version.
- The uploader now handles per-booking API results, but crash windows between Google acknowledgement and database marking may still cause retries. Confirm Google Ads deduplication semantics and monitor rejected/duplicate uploads.
- Existing webhook lead matching by email is independent and should not be treated as proof of click attribution.
- Current booking attribution expires after 7 days. Conversion uploads are scheduled every 30 minutes once deployed and configured.
- Existing tracking consent stores first-touch data in memory until consent is granted. Review privacy and retention policy before production.
