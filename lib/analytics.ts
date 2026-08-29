/**
 * Event tracking — PRD §14.
 * Semua event digerbangi consent (PRD §15): sebelum pengunjung menyetujui
 * cookie pemasaran, event hanya dicatat di konsol (mode debug) dan tidak dikirim.
 */
import { env } from "./env";

export type AnalyticsEvent =
  | { name: "view_package"; params: { package_slug: string; price: number; category: string } }
  | {
      name: "wa_click";
      params: { source_page: string; package_slug?: string; cta_position: string };
    }
  | { name: "lead_submit"; params: { package_slug?: string; budget_plan: string; pax: number } }
  | { name: "brochure_download"; params: { package_slug: string } }
  | { name: "calculator_use"; params: { price: number; dp: number; tenor: number } }
  | { name: "filter_apply"; params: { filters: string } }
  | { name: "compare_open"; params: { packages: string } }
  | { name: "video_play"; params: { video_id: string } }
  | { name: "scroll_depth"; params: { page: string; percent: 25 | 50 | 75 | 100 } };

const CONSENT_KEY = "luhas-consent-v1";

export type ConsentValue = "granted" | "denied" | null;

export function getConsent(): ConsentValue {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<ConsentValue, null>) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* private mode — abaikan */
  }
  window.dispatchEvent(new CustomEvent("luhas-consent-change", { detail: value }));
  if (value === "granted") {
    // Consent Mode v2 — kabari GTM/GA
    pushDataLayer({
      event: "consent_update",
      analytics_storage: "granted",
      ad_storage: "granted",
    });
  }
}

interface WindowWithTrackers extends Window {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  ttq?: { track: (name: string, params?: unknown) => void };
}

function w(): WindowWithTrackers | null {
  return typeof window === "undefined" ? null : (window as WindowWithTrackers);
}

function pushDataLayer(obj: Record<string, unknown>) {
  const win = w();
  if (!win) return;
  win.dataLayer = win.dataLayer ?? [];
  win.dataLayer.push(obj);
}

export function track(event: AnalyticsEvent) {
  if (env.analyticsDebug) {
    console.info("[analytics]", event.name, event.params);
  }

  if (getConsent() !== "granted") return;

  const win = w();
  if (!win) return;

  // GA4 (gtag) + GTM (dataLayer)
  pushDataLayer({ event: event.name, ...event.params });
  win.gtag?.("event", event.name, event.params);

  // Meta Pixel — petakan ke event standar bila relevan
  if (event.name === "lead_submit") win.fbq?.("track", "Lead", event.params);
  else if (event.name === "wa_click") win.fbq?.("track", "Contact", event.params);
  else if (event.name === "view_package") win.fbq?.("track", "ViewContent", event.params);
  else win.fbq?.("trackCustom", event.name, event.params);

  // TikTok Pixel
  if (event.name === "lead_submit") win.ttq?.track("SubmitForm", event.params);
  else if (event.name === "wa_click") win.ttq?.track("Contact", event.params);
  else if (event.name === "view_package") win.ttq?.track("ViewContent", event.params);
}

/* ── Helper UTM (PRD §14: UTM ikut ke pesan WA) ───────────────────────── */

export type Utm = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string>
>;

export function readUtmFromSearch(search: string): Utm {
  const p = new URLSearchParams(search);
  const utm: Utm = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const) {
    const v = p.get(k);
    if (v) utm[k] = v;
  }
  return utm;
}

const UTM_STORE = "luhas-utm-v1";

/** Simpan UTM kunjungan pertama agar tetap terbawa lintas halaman. */
export function persistUtm(search: string) {
  const utm = readUtmFromSearch(search);
  if (Object.keys(utm).length === 0) return;
  try {
    window.sessionStorage.setItem(UTM_STORE, JSON.stringify(utm));
  } catch {
    /* abaikan */
  }
}

export function getPersistedUtm(): Utm {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UTM_STORE);
    return raw ? (JSON.parse(raw) as Utm) : {};
  } catch {
    return {};
  }
}
