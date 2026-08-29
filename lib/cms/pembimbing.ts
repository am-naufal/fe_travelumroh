import "server-only";
import { readJsonDir } from "./_fs";
import { pembimbingSchema, type Pembimbing } from "./schema";

export async function getPembimbing(): Promise<Pembimbing[]> {
  return readJsonDir("pembimbing", pembimbingSchema);
}

export async function getPembimbingBySlug(slug: string): Promise<Pembimbing | null> {
  return (await getPembimbing()).find((p) => p.slug === slug) ?? null;
}
