import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { getPackages, getArticleSlugs } from "@/lib/cms";

// PRD §11: sitemap.xml otomatis, satu URL kanonik per paket, tanpa duplikat query.
export const revalidate = 3600;

const STATIC_PATHS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/paket", priority: 0.9, changeFrequency: "daily" },
  { path: "/simulasi-cicilan", priority: 0.6, changeFrequency: "monthly" },
  { path: "/paket/banding", priority: 0.4, changeFrequency: "monthly" },
  { path: "/tentang", priority: 0.6, changeFrequency: "monthly" },
  { path: "/pembimbing", priority: 0.5, changeFrequency: "monthly" },
  { path: "/galeri", priority: 0.5, changeFrequency: "weekly" },
  { path: "/testimoni", priority: 0.6, changeFrequency: "weekly" },
  { path: "/panduan", priority: 0.7, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
  { path: "/kontak", priority: 0.5, changeFrequency: "yearly" },
  { path: "/daftar", priority: 0.7, changeFrequency: "yearly" },
  { path: "/kebijakan-privasi", priority: 0.2, changeFrequency: "yearly" },
  { path: "/syarat-ketentuan", priority: 0.2, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, articleSlugs] = await Promise.all([getPackages(), getArticleSlugs()]);
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((s) => ({
    url: `${env.siteUrl}${s.path}`,
    lastModified: now,
    changeFrequency: s.changeFrequency,
    priority: s.priority,
  }));

  const packageEntries: MetadataRoute.Sitemap = packages.map((p) => ({
    url: `${env.siteUrl}/paket/${p.slug}`,
    lastModified: new Date(p.diperbaruiPada),
    changeFrequency: "weekly",
    priority: p.aktif ? 0.8 : 0.3,
  }));

  const articleEntries: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${env.siteUrl}/panduan/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...packageEntries, ...articleEntries];
}
