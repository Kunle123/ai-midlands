export type TrackingConsent = "unknown" | "granted" | "denied";

type Attribution = Partial<Record<
  "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term" | "oppref",
  string
>>;

declare global {
  interface Window {
    oaiq?: ((...args: unknown[]) => void) & { q?: unknown[][] };
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "aim_tracking_consent_v1";
const ATTRIBUTION_KEY = "aim_attribution_v1";
const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "oppref",
] as const;

let currentConsent: TrackingConsent = "unknown";
let openAIInitialised = false;
let gaInitialised = false;
let firstTouchAttribution: Attribution | null = null;

const debugEnabled = import.meta.env.VITE_TRACKING_DEBUG === "true";

function debug(...args: unknown[]) {
  if (debugEnabled) console.info("[AI Midlands tracking]", ...args);
}

function readAttributionFromUrl(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result: Attribution = {};

  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key)?.trim();
    if (value) result[key] = value;
  }

  return result;
}

function captureFirstTouch(): Attribution {
  if (!firstTouchAttribution) firstTouchAttribution = readAttributionFromUrl();
  return firstTouchAttribution;
}

function readStoredAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? JSON.parse(raw) as Attribution : {};
  } catch {
    return {};
  }
}

function persistAttribution() {
  if (typeof window === "undefined") return;
  const merged = { ...readStoredAttribution(), ...captureFirstTouch(), ...readAttributionFromUrl() };
  try {
    if (Object.keys(merged).length) {
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(merged));
    }
  } catch {
    // Storage may be unavailable; tracking still works for the current page.
  }
}

export function getAttribution(): Attribution {
  return {
    ...(currentConsent === "granted" ? readStoredAttribution() : {}),
    ...captureFirstTouch(),
    ...readAttributionFromUrl(),
  };
}

export function getTrackingConsent(): TrackingConsent {
  if (typeof window === "undefined") return "unknown";
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch {
    return "unknown";
  }
}

function ensureOpenAIQueue() {
  if (typeof window === "undefined" || window.oaiq) return;
  const queue = ((...args: unknown[]) => {
    queue.q?.push(args);
  }) as Window["oaiq"];
  queue.q = [];
  window.oaiq = queue;
}

function initialiseOpenAIPixel(consent: boolean) {
  if (typeof window === "undefined") return;
  const pixelId = import.meta.env.VITE_OPENAI_ADS_PIXEL_ID?.trim();
  if (!pixelId) {
    debug("OpenAI Pixel not configured");
    return;
  }

  ensureOpenAIQueue();
  window.oaiq?.("consent", consent);

  if (!openAIInitialised) {
    window.oaiq?.("init", { pixelId, debug: debugEnabled });

    if (!document.querySelector('script[data-ai-midlands-openai-pixel="true"]')) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
      script.dataset.aiMidlandsOpenaiPixel = "true";
      document.head.appendChild(script);
    }

    openAIInitialised = true;
  }
}

function initialiseGA() {
  if (typeof window === "undefined" || gaInitialised) return;
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  if (!measurementId) {
    debug("GA4 not configured");
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, { send_page_view: false });

  if (!document.querySelector('script[data-ai-midlands-ga="true"]')) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.aiMidlandsGa = "true";
    document.head.appendChild(script);
  }

  gaInitialised = true;
}

export function initialiseTracking(consent: TrackingConsent) {
  currentConsent = consent;
  captureFirstTouch();

  // OpenAI's SDK supports consent being set before initialisation. With consent
  // denied/unknown it does not send measurement events or retain its cookies.
  initialiseOpenAIPixel(consent === "granted");

  if (consent === "granted") {
    persistAttribution();
    initialiseGA();
  }
}

export function setTrackingConsent(consent: Exclude<TrackingConsent, "unknown">) {
  currentConsent = consent;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(CONSENT_KEY, consent);
      if (consent === "granted") {
        persistAttribution();
      } else {
        window.localStorage.removeItem(ATTRIBUTION_KEY);
      }
    } catch {
      // Continue with in-memory consent if storage is unavailable.
    }
  }

  initialiseOpenAIPixel(consent === "granted");
  window.oaiq?.("consent", consent === "granted");

  if (consent === "granted") {
    initialiseGA();
  } else {
    window.gtag?.("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function resetTrackingConsent() {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
      window.localStorage.removeItem(ATTRIBUTION_KEY);
    } catch {
      // Ignore storage failures.
    }
  }
  currentConsent = "unknown";
  window.oaiq?.("consent", false);
}

function gaParams(extra: Record<string, string | number | boolean | undefined> = {}) {
  const attribution = getAttribution();
  return {
    page_path: typeof window !== "undefined" ? `${window.location.pathname}${window.location.search}` : undefined,
    ...attribution,
    ...extra,
  };
}

export function trackPageView(path: string) {
  if (currentConsent !== "granted" || typeof window === "undefined") return;

  const pageId = path || window.location.pathname || "/";
  window.oaiq?.("measure", "page_viewed", {
    type: "contents",
    contents: [{ id: pageId, name: document.title, content_type: "page" }],
  });

  window.gtag?.("event", "page_view", gaParams({
    page_title: document.title,
    page_location: window.location.href,
  }));

  debug("page_view", pageId);
}

export function trackCustomEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (currentConsent !== "granted") return;

  const intent = typeof params.intent === "string" ? params.intent : undefined;

  window.oaiq?.(
    "measure",
    "custom",
    intent ? { type: "custom", plan_id: intent } : { type: "custom" },
    { custom_event_name: name },
  );

  window.gtag?.("event", name, gaParams(params));
  debug(name, params);
}

export function trackLeadCreated(intent?: string) {
  if (currentConsent !== "granted") return;

  window.oaiq?.("measure", "lead_created", { type: "customer_action" });
  window.gtag?.("event", "generate_lead", gaParams({ intent }));
  debug("lead_created", intent);
}

export function withUtmParams(target: string): string {
  if (typeof window === "undefined") return target;
  try {
    const url = new URL(target, window.location.origin);
    const attribution = getAttribution();
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
      const value = attribution[key];
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    return url.toString();
  } catch {
    return target;
  }
}

export function preserveOpprefOnInternalLink(target: string): string {
  if (typeof window === "undefined" || currentConsent === "granted") return target;
  try {
    const url = new URL(target, window.location.origin);
    if (url.origin !== window.location.origin) return target;
    const oppref = getAttribution().oppref;
    if (oppref && !url.searchParams.has("oppref")) url.searchParams.set("oppref", oppref);
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return target;
  }
}
