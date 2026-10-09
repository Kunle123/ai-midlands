import { afterEach, describe, expect, it, vi } from "vitest";

function installBrowser(search: string) {
  const store = new Map<string, string>();
  const events: unknown[][] = [];
  const measures: unknown[][] = [];
  vi.stubGlobal("window", {
    location: {
      search,
      pathname: "/",
      href: `https://ai-midlands.co.uk/${search}`,
      origin: "https://ai-midlands.co.uk",
    },
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, value); },
      removeItem: (key: string) => { store.delete(key); },
    },
    dataLayer: [] as unknown[][],
    gtag: (...args: unknown[]) => {
      events.push(args);
      if (args[0] === "get" && typeof args[3] === "function") {
        const callback = args[3] as (value: string) => void;
        callback(args[2] === "client_id" ? "111.222" : "1699999999");
      }
    },
    oaiq: (...args: unknown[]) => { measures.push(args); },
  });
  vi.stubGlobal("document", {
    title: "AI Midlands",
    cookie: "_ga=GA1.1.111.222; _ga_W3T6L19819=GS1.1.1700000000.1.1.1700000000.0.0.0",
    querySelector: () => null,
    createElement: () => ({ dataset: {} }),
    head: { appendChild: () => undefined },
  });
  return { events, measures };
}

async function loadTracking() {
  vi.resetModules();
  vi.stubEnv("VITE_OPENAI_ADS_PIXEL_ID", "pixel");
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-W3T6L19819");
  vi.stubEnv("VITE_TRACKING_DEBUG", "false");
  return import("./tracking");
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("click id consent", () => {
  it("keeps Google click ids out of attribution until measurement is allowed", async () => {
    installBrowser("?gclid=click-1&utm_source=google");
    const tracking = await loadTracking();
    tracking.initialiseTracking("unknown");
    expect(tracking.getAttribution().gclid).toBeUndefined();
    tracking.setTrackingConsent("denied");
    expect(tracking.getAttribution().gclid).toBeUndefined();
    const deniedUrl = new URL(tracking.withUtmParams("https://calendly.com/kunle2000/30min"));
    expect(deniedUrl.searchParams.get("gclid")).toBeNull();
  });

  it("includes a consented click id in attribution but not on the Calendly URL", async () => {
    installBrowser("?gclid=click-1&utm_source=google");
    const tracking = await loadTracking();
    tracking.setTrackingConsent("granted");
    expect(tracking.getAttribution().gclid).toBe("click-1");
    const url = new URL(tracking.withUtmParams("https://calendly.com/kunle2000/30min"));
    expect(url.searchParams.get("utm_source")).toBe("google");
    expect(url.searchParams.get("gclid")).toBeNull();
  });

  it("leaves the enquiry and ChatGPT lead events unchanged", async () => {
    const browser = installBrowser("");
    const tracking = await loadTracking();
    tracking.setTrackingConsent("granted");
    tracking.trackLeadCreated("process_assessment");
    const names = browser.events.filter(entry => entry[0] === "event").map(entry => entry[1]);
    expect(names).toContain("generate_lead");
    expect(names).not.toContain("conversion");
    expect(names).not.toContain("booked_consultation");
    expect(browser.measures).toContainEqual(["measure", "lead_created", { type: "customer_action" }]);
  });

  it("reads GA4 identifiers only after measurement consent and does not treat a click as a booking", async () => {
    const browser = installBrowser("?gclid=click-1");
    const tracking = await loadTracking();
    tracking.initialiseTracking("unknown");
    expect(await tracking.readGa4Identity()).toBeNull();
    tracking.setTrackingConsent("granted");
    expect(await tracking.readGa4Identity()).toEqual({ clientId: "111.222", sessionId: "1699999999" });
    tracking.trackCustomEvent("booking_started", { intent: "homepage" });
    const names = browser.events.filter(entry => entry[0] === "event").map(entry => entry[1]);
    expect(names).toContain("booking_started");
    expect(names).not.toContain("booked_consultation");
  });
});
