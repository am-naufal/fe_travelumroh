import "server-only";
import matter from "gray-matter";
import { readTextDir } from "./_fs";
import { artikelFrontmatterSchema, type Artikel } from "./schema";

const KATA_PER_MENIT = 200;

function menitBaca(text: string): number {
  const kata = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(kata / KATA_PER_MENIT));
}

export async function getArticles(): Promise<Artikel[]> {
  const files = await readTextDir("articles");
  const items = files.map(({ raw }) => {
    const { data, content } = matter(raw);
    // gray-matter/js-yaml memparse tanggal tanpa kutip menjadi Date — normalkan.
    if (data.tanggal instanceof Date) {
      data.tanggal = data.tanggal.toISOString().slice(0, 10);
    }
    const fm = artikelFrontmatterSchema.parse(data);
    return { ...fm, body: content.trim(), menitBaca: menitBaca(content) } satisfies Artikel;
  });
  return items.sort((a, b) => b.tanggal.localeCompare(a.tanggal));
}

export async function getArticle(slug: string): Promise<Artikel | null> {
  return (await getArticles()).find((a) => a.slug === slug) ?? null;
}

export async function getArticleSlugs(): Promise<string[]> {
  return (await getArticles()).map((a) => a.slug);
}

export async function getRelatedArticles(slug: string, limit = 3): Promise<Artikel[]> {
  const all = await getArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, limit);
  return all
    .filter((a) => a.slug !== slug)
    .sort((a, b) => {
      const ka = a.kategori === current.kategori ? 0 : 1;
      const kb = b.kategori === current.kategori ? 0 : 1;
      return ka - kb;
    })
    .slice(0, limit);
}
