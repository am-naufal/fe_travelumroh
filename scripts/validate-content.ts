/**
 * Validasi seluruh /content terhadap schema Zod (PRD §19 / AC-CMS-05).
 * Jalankan: npm run validate:content
 *
 * Membaca berkas langsung (tanpa lewat lib/cms yang di-gate `server-only`)
 * lalu memvalidasi dengan schema yang sama. `next build` juga memvalidasi
 * konten lewat SSG — skrip ini untuk pengecekan cepat di luar build.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  paketSchema,
  pembimbingSchema,
  testimoniSchema,
  faqFileSchema,
  albumGaleriSchema,
  artikelFrontmatterSchema,
  pengaturanSitusSchema,
} from "../lib/cms/schema";
import { z } from "zod";

const DIR = path.join(process.cwd(), "content");
let failed = 0;

async function jsonDir(rel: string, schema: z.ZodType) {
  const full = path.join(DIR, rel);
  const files = (await fs.readdir(full)).filter((f) => f.endsWith(".json"));
  let ok = 0;
  for (const f of files) {
    const raw = await fs.readFile(path.join(full, f), "utf8");
    const res = schema.safeParse(JSON.parse(raw));
    if (res.success) ok++;
    else {
      failed++;
      console.error(`✖ ${rel}/${f}\n${z.prettifyError(res.error)}\n`);
    }
  }
  console.log(`  ${rel.padEnd(14)} ${ok}/${files.length} OK`);
  return files.length;
}

async function jsonFile(rel: string, schema: z.ZodType) {
  const raw = await fs.readFile(path.join(DIR, rel), "utf8");
  const res = schema.safeParse(JSON.parse(raw));
  if (res.success) console.log(`  ${rel.padEnd(14)} OK`);
  else {
    failed++;
    console.error(`✖ ${rel}\n${z.prettifyError(res.error)}\n`);
  }
}

async function main() {
  await jsonDir("packages", paketSchema);
  await jsonDir("pembimbing", pembimbingSchema);
  await jsonDir("testimonials", testimoniSchema);
  await jsonDir("gallery", albumGaleriSchema);
  await jsonFile("faq.json", faqFileSchema);
  await jsonFile("settings.json", pengaturanSitusSchema);

  const artDir = path.join(DIR, "articles");
  const artFiles = (await fs.readdir(artDir)).filter((f) => /\.mdx?$/.test(f));
  let artOk = 0;
  for (const f of artFiles) {
    const { data } = matter(await fs.readFile(path.join(artDir, f), "utf8"));
    if (data.tanggal instanceof Date) data.tanggal = data.tanggal.toISOString().slice(0, 10);
    const res = artikelFrontmatterSchema.safeParse(data);
    if (res.success) artOk++;
    else {
      failed++;
      console.error(`✖ articles/${f}\n${z.prettifyError(res.error)}\n`);
    }
  }
  console.log(`  articles       ${artOk}/${artFiles.length} OK`);

  // Integritas referensi
  const pembimbing = JSON.parse("[]") as never[];
  const pSlugs = new Set<string>();
  for (const f of (await fs.readdir(path.join(DIR, "pembimbing"))).filter((x) => x.endsWith(".json"))) {
    const p = JSON.parse(await fs.readFile(path.join(DIR, "pembimbing", f), "utf8"));
    pSlugs.add(p.slug);
  }
  for (const f of (await fs.readdir(path.join(DIR, "packages"))).filter((x) => x.endsWith(".json"))) {
    const p = JSON.parse(await fs.readFile(path.join(DIR, "packages", f), "utf8"));
    if (p.pembimbingSlug && !pSlugs.has(p.pembimbingSlug)) {
      failed++;
      console.error(`✖ ${f}: pembimbingSlug "${p.pembimbingSlug}" tidak ada`);
    }
  }
  void pembimbing;

  if (failed > 0) {
    console.error(`\n${failed} kegagalan.`);
    process.exit(1);
  }
  console.log("\nSemua konten valid.");
}

main();
