import "server-only";
import { readJsonDir } from "./_fs";
import { testimoniSchema, type Testimoni } from "./schema";

export async function getTestimonials(): Promise<Testimoni[]> {
  return readJsonDir("testimonials", testimoniSchema);
}

export async function getVideoTestimonials(): Promise<Testimoni[]> {
  return (await getTestimonials()).filter((t) => t.video);
}

export async function getTestimonialsForPackage(paketSlug: string, limit = 3): Promise<Testimoni[]> {
  const all = await getTestimonials();
  const match = all.filter((t) => t.paketSlug === paketSlug);
  return (match.length ? match : all).slice(0, limit);
}

/** Rating agregat untuk JSON-LD AggregateRating (PRD §7.3). */
export async function aggregateRating(): Promise<{ nilai: number; jumlah: number }> {
  const all = await getTestimonials();
  if (all.length === 0) return { nilai: 5, jumlah: 0 };
  const nilai = all.reduce((s, t) => s + t.rating, 0) / all.length;
  return { nilai: Math.round(nilai * 10) / 10, jumlah: all.length };
}
