import "server-only";
import { readJsonDir } from "./_fs";
import { paketSchema, type Paket, type Keberangkatan } from "./schema";
import { daysUntil } from "../format";

/** Ambang "sisa seat sedikit" untuk badge otomatis — PRD §7.1/§7.2. */
export const SEAT_HAMPIR_PENUH = 6;

export async function getPackages(): Promise<Paket[]> {
  const list = await readJsonDir("packages", paketSchema);
  const slugs = new Set<string>();
  for (const p of list) {
    if (slugs.has(p.slug)) throw new Error(`[cms] slug paket duplikat: ${p.slug}`);
    slugs.add(p.slug);
  }
  return list.sort((a, b) => a.hargaMulai - b.hargaMulai);
}

/** Hanya paket aktif — untuk listing & beranda (AC-CMS-06). */
export async function getActivePackages(): Promise<Paket[]> {
  return (await getPackages()).filter((p) => p.aktif);
}

export async function getFeaturedPackages(limit = 4): Promise<Paket[]> {
  const active = await getActivePackages();
  const unggulan = active.filter((p) => p.unggulan);
  return (unggulan.length ? unggulan : active).slice(0, limit);
}

export async function getPackage(slug: string): Promise<Paket | null> {
  const list = await getPackages();
  return list.find((p) => p.slug === slug) ?? null;
}

export async function getPackageSlugs(): Promise<string[]> {
  return (await getPackages()).map((p) => p.slug);
}

/** Keberangkatan terdekat yang belum tutup. */
export function keberangkatanTerdekat(paket: Paket): Keberangkatan | null {
  return (
    [...paket.keberangkatan]
      .filter((k) => k.status !== "tutup" && daysUntil(k.tanggal) >= 0)
      .sort((a, b) => a.tanggal.localeCompare(b.tanggal))[0] ?? null
  );
}

/** Badge efektif: eksplisit dari CMS, atau otomatis bila seat menipis. */
export function badgeEfektif(paket: Paket): "promo" | "best-seller" | "hampir-penuh" | null {
  if (paket.badge) return paket.badge;
  const k = keberangkatanTerdekat(paket);
  if (k && k.sisaSeat > 0 && k.sisaSeat <= SEAT_HAMPIR_PENUH) return "hampir-penuh";
  return null;
}

export function totalSisaSeat(paket: Paket): number {
  return paket.keberangkatan
    .filter((k) => k.status !== "tutup")
    .reduce((sum, k) => sum + k.sisaSeat, 0);
}

/** Paket serupa: kategori sama dulu, lalu harga terdekat (PRD §7.3 bagian 10). */
export async function getRelatedPackages(slug: string, limit = 3): Promise<Paket[]> {
  const list = await getActivePackages();
  const current = list.find((p) => p.slug === slug);
  if (!current) return [];
  return list
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const catA = a.kategori === current.kategori ? 0 : 1;
      const catB = b.kategori === current.kategori ? 0 : 1;
      if (catA !== catB) return catA - catB;
      return Math.abs(a.hargaMulai - current.hargaMulai) - Math.abs(b.hargaMulai - current.hargaMulai);
    })
    .slice(0, limit);
}
