import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  getTrackingConsent,
  initialiseTracking,
  preserveOpprefOnInternalLink,
  setTrackingConsent,
  trackCustomEvent,
  trackPageView,
  withUtmParams,
  type TrackingConsent as ConsentState,
} from "@/lib/tracking";

function intentFromPath(pathname: string) {
  const slug = pathname.replace(/^\//, "").split("/")[0];
  return slug || "homepage";
}

export function TrackingConsent() {
  const [location] = useLocation();
  const [consent, setConsent] = useState<ConsentState>(() => getTrackingConsent());
  const [settingsOpen, setSettingsOpen] = useState(consent === "unknown");

  useEffect(() => {
    initialiseTracking(consent);
  }, [consent]);

  useEffect(() => {
    if (consent === "granted") trackPageView(location);
  }, [consent, location]);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("javascript:")) return;

      const intent = intentFromPath(window.location.pathname);
      const linkText = anchor.textContent?.replace(/\s+/g, " ").trim().slice(0, 120) || "";

      if (rawHref.startsWith("mailto:")) {
        trackCustomEvent("contact_intent", { intent, link_text: linkText });
        return;
      }

      try {
        const url = new URL(rawHref, window.location.href);

        if (url.hostname === "calendly.com" || url.hostname.endsWith(".calendly.com")) {
          const attributedUrl = withUtmParams(url.toString());
          anchor.setAttribute("href", attributedUrl);
          trackCustomEvent("booking_started", { intent, link_text: linkText });
          return;
        }

        if (url.origin === window.location.origin && consent !== "granted") {
          const preserved = preserveOpprefOnInternalLink(url.toString());
          anchor.setAttribute("href", preserved);
        }
      } catch {
        // Ignore malformed or non-HTTP links.
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [consent]);

  const choose = (next: Exclude<ConsentState, "unknown">) => {
    setTrackingConsent(next);
    setConsent(next);
    setSettingsOpen(false);
  };

  return (
    <>
      {settingsOpen && (
        <div className="fixed inset-x-3 bottom-3 z-[1000] mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/15">
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Analytics & advertising measurement</p>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              We use measurement to understand which campaigns and pages lead to enquiries. No analytics or advertising measurement events are sent until you allow them.
            </p>
          </div>
          <div className="mt-3 flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-lg bg-[#e85d2a] px-3 py-2 text-xs font-semibold text-white hover:bg-[#d14e1e]"
            >
              Allow measurement
            </button>
          </div>
        </div>
      )}

      {!settingsOpen && consent !== "unknown" && (
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="fixed bottom-3 left-3 z-[999] rounded-full border border-slate-200 bg-white/95 px-3 py-1.5 text-[11px] font-medium text-slate-500 shadow-sm backdrop-blur hover:text-slate-800"
          aria-label="Open tracking settings"
        >
          Tracking settings
        </button>
      )}
    </>
  );
}
