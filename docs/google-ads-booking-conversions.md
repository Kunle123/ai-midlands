# Google Ads booked-consultation conversion: activation checklist

**Status: draft implementation; not activated or verified.**

## Flow
1. With measurement consent, the website captures a Google click ID (gclid, gbraid or wbraid).
2. A visitor clicking Calendly gets a short-lived, random booking token from POST /api/booking-attribution. The token travels as Calendly utm_content; no click ID or visitor email is placed in the Calendly URL.
3. A signed Calendly invitee.created webhook matches payload.tracking.utm_content to that token and records the confirmed booking.
4. A protected operator endpoint POST /api/admin/google-ads/upload-bookings submits ready bookings through Google Ads uploadClickConversions and marks successful batches uploaded.

## Required manual configuration
- Create a **Google Ads imported/offline click conversion** named **Booked consultation**. This is **not** the existing website event-snippet conversion label. Obtain its numeric conversion action ID. Use the correct customer ID and developer token.
- Set Cloudflare Worker secrets GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET, GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CUSTOMER_ID, GOOGLE_ADS_CONVERSION_ACTION_ID, LEADS_ADMIN_TOKEN, CALENDLY_WEBHOOK_SIGNING_KEY. GOOGLE_ADS_API_VERSION can be set to the currently supported version (default v22; verify against current Google Ads API support).
- Register a Calendly invitee.created webhook targeting https://ai-midlands.co.uk/api/calendly. Verify signature and the tracking.utm_content field with a test booking.
- Apply D1 migrations 0002 and 0003 before deploying the Worker.
- Configure an authenticated scheduled caller for POST /api/admin/google-ads/upload-bookings; it does not run automatically.
- Check the Google Ads offline-conversion upload prerequisites, including enhanced conversions settings where applicable, account eligibility, conversion-action ownership and OAuth scope.
- Verify real consent granted/denied flows, booking token delivery, Calendly signed webhook, one-booking-only handling, Google Ads API response, deduplication, and conversion appearing in Google Ads diagnostics.
- Do not make this conversion Primary until production tracking is proven.

## Known limitations / review required
- Google Ads offline click uploads may require specific click-ID handling and API-version updates; confirm gbraid/wbraid support for the selected API version.
- The uploader conservatively leaves all rows retryable when a batch returns partial failures; this can resend previously accepted rows. Review Google Ads deduplication and implement per-row partial failure handling before unattended scheduling.
- Existing webhook lead matching by email is independent and should not be treated as proof of click attribution.
- Current booking attribution expires after 7 days. Conversion uploads have no automated schedule.
- Existing tracking consent stores first-touch data in memory until consent is granted. Review privacy and retention policy before production.
