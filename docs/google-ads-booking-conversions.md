# Google Ads booked-consultation conversion: activation checklist

**Status: implementation updated on `feature/google-calendly-booking-attribution`; not deployed and not verified against a live Google Ads upload.**

## Confirmed Google Ads mapping (9 October 2026)
- Google Ads customer ID: `6483337211`.
- Newly created offline click-import conversion action ID: `7833321822`.
- Conversion action resource: `customers/6483337211/conversionActions/7833321822`.
- Current Google Ads name: `offline (upload)`; category: **Qualified lead**. Rename to **Booked consultation** in Google Ads for clarity.
- Non-secret Worker vars in `wrangler.jsonc`: `GOOGLE_ADS_CUSTOMER_ID=6483337211`, `GOOGLE_ADS_CONVERSION_ACTION_ID=7833321822`, `GOOGLE_ADS_BOOKING_CONVERSION_VALUE=25`, `GOOGLE_ADS_API_VERSION=v24`.
- The uploader sends £25 by default (`GOOGLE_ADS_BOOKING_CONVERSION_VALUE`). That value is only the booked-consultation conversion. The enquiry conversion is unchanged.
- Current action is **Primary** and counts **Every conversion**. Keep it **Secondary** and set the count to **One** until a live upload is verified. Google Ads `orderId` is the booking token, so a repeated upload of the same booking is a duplicate rather than a second conversion.
- Google Ads currently reports no associated data source and no uploaded conversions. The Google Ads API upload path is the intended source.


## Flow
1. With measurement consent, the website captures a Google click ID (gclid, gbraid or wbraid).
2. A visitor clicking Calendly gets a short-lived, random booking token from POST /api/booking-attribution. The token travels as Calendly utm_content; no click ID or visitor email is placed in the Calendly URL.
3. A signed Calendly `invitee.created` webhook matches `payload.tracking.utm_content` to that token and marks the row ready. A Calendly click, or a `booking_started` analytics event, is not a conversion. `invitee.canceled` marks a pending, ready, or in-flight row canceled so it is not uploaded.
4. A Cloudflare Worker cron runs every 30 minutes and uploads ready bookings one at a time through Google Ads `uploadClickConversions` (`v24`). A compare-and-set claim prevents two jobs uploading the same row. The row is marked uploaded only when Google echoes the conversion, or when Google reports a duplicate `orderId`. An empty result or an HTTP 5xx releases the claim for retry. A protected operator endpoint `POST /api/admin/google-ads/upload-bookings` supports the same job.

## Required manual configuration
- The **Google Ads imported/offline click conversion** already exists (ID `7833321822`, currently named `offline (upload)`). Do **not** create another. Rename it **Booked consultation** in Google Ads. It is **not** the existing website event-snippet conversion label. Use the correct customer ID and developer token.
- Cloudflare secrets already present, by name only: `CALENDLY_WEBHOOK_SIGNING_KEY`, `LEADS_ADMIN_TOKEN`, `RESEND_API_KEY`.
- Cloudflare secrets still required before any deploy: `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN`, `GOOGLE_ADS_DEVELOPER_TOKEN`. Optional `GOOGLE_ADS_LOGIN_CUSTOMER_ID` only if the developer token belongs to a manager account. Customer ID, conversion action, booking value, and API version are non-secret vars, not secrets.
- Register Calendly `invitee.created` and `invitee.canceled` webhooks for `https://calendly.com/kunle2000/30min`, targeting `https://ai-midlands.co.uk/api/calendly`, signed with the existing webhook signing key. There is no Calendly API token in this repo, so the subscription cannot be confirmed from here.
- Apply D1 migrations `0002_google_ads_attribution.sql` and `0003_booking_attribution.sql` only together with the deploy. Both are still pending on the remote database. Do not apply them while production is still running the current Worker.
- Cloudflare Worker cron is configured in wrangler.jsonc for every 30 minutes; verify the scheduled handler and worker trigger after deployment.
- Check the Google Ads offline-conversion upload prerequisites, including enhanced conversions settings where applicable, account eligibility, conversion-action ownership and OAuth scope.
- Verify real consent granted/denied flows, booking token delivery, Calendly signed webhook, one-booking-only handling, Google Ads API response, deduplication, and conversion appearing in Google Ads diagnostics.
- Do not make this conversion Primary until production tracking is proven.

## Known limitations / review required
- Google Ads offline click uploads may require specific click-ID handling and API-version updates; confirm gbraid/wbraid support for the selected API version.
- A crash after Google accepts an upload and before the database marks it uploaded is retried. The booking token is sent as `orderId`, and a duplicate acknowledgement is stored as uploaded rather than sent again as a new conversion.
- If the developer token was not allowlisted for offline uploads before 15 June 2026, Google can return `CUSTOMER_NOT_ALLOWLISTED_FOR_THIS_FEATURE`. That response leaves the booking ready for a later retry; it does not count as an uploaded conversion. Data Manager API is the fallback only after that error is confirmed with credentials.
- Existing webhook lead matching by email is independent and should not be treated as proof of click attribution.
- Current booking attribution expires after 7 days. Conversion uploads are scheduled every 30 minutes once deployed and configured.
- Existing tracking consent stores first-touch data in memory until consent is granted. Review privacy and retention policy before production.
