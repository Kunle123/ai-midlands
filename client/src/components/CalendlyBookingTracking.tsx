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
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
    stylesheet.dataset.aiMidlandsCalendly = "true";
    document.head.appendChild(stylesheet);

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.dataset.aiMidlandsCalendly = "true";
    document.head.appendChild(script);

    let popupOpened = false;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a[href]");
      if (!anchor) return;
      const url = new URL(anchor.href);
      if (url.origin !== CALENDLY_ORIGIN || url.pathname.replace(/\/$/, "") !== BOOKING_PATH) return;
      // Do not break existing booking links if Calendly's script is unavailable.
      if (!window.Calendly?.initPopupWidget) return;
      event.preventDefault();
      popupOpened = true;
      window.Calendly.initPopupWidget({ url: withUtmParams(url.toString()) });
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
      script.remove();
      stylesheet.remove();
    };
  }, []);

  return null;
}
