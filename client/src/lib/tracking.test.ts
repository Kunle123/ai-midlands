import { afterEach, describe, expect, it, vi } from "vitest";

// Mirrors gtag.js: only Arguments objects (or objects with callee) are js/config/event commands.
function isGtagCommand(item: unknown): boolean {
  if (item == null || typeof item !== "object") return false;
  if ("event" in item && (item as { event?: unknown }).event) return true;
  const acceptedByGtag =
    Object.prototype.toString.call(item) === "[object Arguments]" ||
    Object.prototype.hasOwnProperty.call(item, "callee");
  if (!acceptedByGtag) return false;
  const command = (item as { [index: number]: unknown })[0];
  return command === "config" || command === "event" || command === "js" || command === "get";
}

function installBrowser() {
  const store = new Map<string, string>();
  const scripts: Array<{ src: string; dataset: Record<string, string> }> = [];
  const documentMock = {
    title: "AI Midlands — Practical AI Automation & Integration",
    querySelector: () => null,
    createElement: () => {
      const script = { src: "", dataset: {} as Record<string, string> };
      scripts.push(script);
      return script;
    },
    head: { appendChild: () => undefined },
  };
  const windowMock = {
    localStorage: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    },
    location: {
      pathname: "/",
      search: "",
      href: "https://ai-midlands.co.uk/",
      origin: "https://ai-midlands.co.uk",
    },
  };

  vi.stubGlobal("window", windowMock);
  vi.stubGlobal("document", documentMock);
  return { scripts };
}

async function loadTracking() {
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", "G-W3T6L19819");
  return import("./tracking");
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("GA4 command format", () => {
  it("queues consent-granted page_view commands in the form gtag.js will send", async () => {
    const { scripts } = installBrowser();
    const { setTrackingConsent, trackPageView } = await loadTracking();

    setTrackingConsent("granted");
    trackPageView("/");

    const commands = (window.dataLayer ?? []).filter(isGtagCommand);
    expect(commands.map((command) => (command as { [index: number]: unknown })[0])).toEqual([
      "js",
      "config",
      "event",
    ]);
    expect((commands[1] as { [index: number]: unknown })[1]).toBe("G-W3T6L19819");
    expect((commands[1] as { [index: number]: { send_page_view?: boolean } })[2].send_page_view).toBe(false);
    expect((commands[2] as { [index: number]: unknown })[1]).toBe("page_view");
    expect(scripts.some((script) => script.src === "https://www.googletagmanager.com/gtag/js?id=G-W3T6L19819")).toBe(true);
    expect(isGtagCommand(["event", "page_view", {}])).toBe(false);
  });

  it("does not initialise GA4 when measurement consent is declined", async () => {
    installBrowser();
    const { setTrackingConsent, trackPageView } = await loadTracking();

    setTrackingConsent("denied");
    trackPageView("/");

    expect(window.dataLayer ?? []).toEqual([]);
    expect(window.gtag).toBeUndefined();
  });
});
