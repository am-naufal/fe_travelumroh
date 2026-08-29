/** Helper metadata — PRD §11. */
import type { Metadata } from "next";
import { env } from "./env";

const SITE_NAME = "Luhas";
const DEFAULT_DESC =
  "Travel umroh resmi berizin Kemenag untuk muslim muda. Harga transparan, bisa dicicil, hotel dekat Masjidil Haram, pendamping ramah.";

interface PageMetaInput {
  title: string;
  description?: string;
  /** path absolut dari root, mis. "/paket/umroh-hemat" */
  path: string;
  ogImage?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  authors?: string[];
}

/** Potong ke batas PRD §11 (title ≤ 60, description ≤ 155) tanpa memotong kata. */
export function clampText(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max - 1);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? slice.slice(0, lastSpace) : slice).trimEnd()}…`;
}

export function pageMetadata(input: PageMetaInput): Metadata {
  const title = clampText(input.title, 60);
  const description = clampText(input.description ?? DEFAULT_DESC, 155);
  const url = new URL(input.path, env.siteUrl).toString();
  const ogImage = input.ogImage ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: input.type ?? "website",
      siteName: SITE_NAME,
      locale: "id_ID",
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.authors ? { authors: input.authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function absoluteUrl(path: string): string {
  return new URL(path, env.siteUrl).toString();
}
