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
    gtag: (...args: unknown[]) => { events.push(args); },
    oaiq: (...args: unknown[]) => { measures.push(args); },
  });
  vi.stubGlobal("document", { title: "AI Midlands", querySelector: () => null, createElement: () => ({ dataset: {} }), head: { appendChild: () => undefined } });
  return { events, measures };
}

async function loadTracking() {
  vi.resetModules();
  vi.stubEnv("VITE_OPENAI_ADS_PIXEL_ID", "pixel");
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", "");
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
    expect(browser.measures).toContainEqual(["measure", "lead_created", { type: "customer_action" }]);
  });
});
