/**
 * Pembaca environment variable terpusat (PRD §15).
 * Nilai publik aman dipakai di klien; nilai server hanya di kode server.
 */

export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://luhas.co.id",
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? "6285135720948",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID ?? "",
  analyticsDebug: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
  mapsEmbedUrl: process.env.NEXT_PUBLIC_MAPS_EMBED_URL ?? "",
} as const;

/** Hanya panggil di kode server. */
export const serverEnv = {
  leadWebhookUrl: process.env.LEAD_WEBHOOK_URL ?? "",
  leadNotifyEmail: process.env.LEAD_NOTIFY_EMAIL ?? "",
  leadInternalWa: process.env.LEAD_INTERNAL_WA ?? "",
  turnstileSecret: process.env.TURNSTILE_SECRET_KEY ?? "",
  instagramFeedToken: process.env.INSTAGRAM_FEED_TOKEN ?? "",
  tiktokFeedToken: process.env.TIKTOK_FEED_TOKEN ?? "",
} as const;

export const hasAnalytics = () =>
  Boolean(env.ga4Id || env.gtmId || env.metaPixelId || env.tiktokPixelId);
