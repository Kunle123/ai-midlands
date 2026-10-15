import { useEffect } from "react";
import { trackCalendlyAppointment, withUtmParams } from "@/lib/tracking";

const CALENDLY_ORIGIN = "https://calendly.com";
const BOOKING_PATH = "/kunle2000/30min";

declare global {
  interface Window {
    Calendly?: { initPopupWidget: (options: { url: string }) => void };
  }
}

/**
 * Calendly's hosted booking page cannot message our website when opened in
 * another tab. Use its official popup widget for on-site booking links so the
 * confirmed event_scheduled postMessage can be measured.
 *
 * If the widget has not loaded, links keep their original external destination.
 */
export function CalendlyBookingTracking() {
  useEffect(() => {
    let popupOpened = false;
    let calendlyLoad: Promise<void> | null = null;

    const loadCalendly = () => {
      if (window.Calendly?.initPopupWidget) return Promise.resolve();
      if (calendlyLoad) return calendlyLoad;
      calendlyLoad = new Promise<void>((resolve, reject) => {
        const stylesheet = document.createElement("link");
        stylesheet.rel = "stylesheet";
        stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
        stylesheet.dataset.aiMidlandsCalendly = "true";
        document.head.appendChild(stylesheet);

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.dataset.aiMidlandsCalendly = "true";
        script.onload = () => window.Calendly?.initPopupWidget ? resolve() : reject(new Error("Calendly did not initialise"));
        script.onerror = () => reject(new Error("Calendly could not be loaded"));
        document.head.appendChild(script);
      });
      return calendlyLoad;
    };

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.origin !== CALENDLY_ORIGIN || url.pathname.replace(/\/$/, "") !== BOOKING_PATH) return;
      event.preventDefault();
      void loadCalendly().then(() => {
        if (!window.Calendly?.initPopupWidget) throw new Error("Calendly did not initialise");
        popupOpened = true;
        window.Calendly.initPopupWidget({ url: withUtmParams(url.toString()) });
      }).catch(() => {
        // Preserve the booking path if the optional popup script is unavailable.
        window.location.assign(url.toString());
      });
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== CALENDLY_ORIGIN || !popupOpened) return;
      if (event.data?.event !== "calendly.event_scheduled") return;
      // Calendly includes a unique scheduled-event URI in this payload.
      // Without it we cannot safely deduplicate a conversion.
      const bookingId = event.data?.payload?.event?.uri;
      if (typeof bookingId !== "string" || !bookingId.startsWith("https://api.calendly.com/scheduled_events/")) return;
      trackCalendlyAppointment(bookingId);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("message", handleMessage);
    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("message", handleMessage);
      document.querySelectorAll('[data-ai-midlands-calendly="true"]').forEach(element => element.remove());
    };
  }, []);

  return null;
}
