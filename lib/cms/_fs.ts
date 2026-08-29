/**
 * Utilitas baca konten lokal. HANYA untuk kode server (Server Components,
 * route handlers, generateStaticParams). Jangan impor dari komponen klien.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

export const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readJsonFile<T>(relPath: string, schema: z.ZodType<T>): Promise<T> {
  const full = path.join(CONTENT_DIR, relPath);
  let raw: string;
  try {
    raw = await fs.readFile(full, "utf8");
  } catch {
    throw new Error(`[cms] Berkas konten tidak ditemukan: content/${relPath}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    throw new Error(`[cms] JSON tidak valid di content/${relPath}: ${(e as Error).message}`);
  }
  const result = schema.safeParse(parsed);
  if (!result.success) {
    // PRD §19 / AC-CMS-05: gagalkan keras, jangan diam-diam.
    throw new Error(
      `[cms] Validasi gagal untuk content/${relPath}:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

export async function readJsonDir<T>(
  relDir: string,
  itemSchema: z.ZodType<T>,
): Promise<T[]> {
  const full = path.join(CONTENT_DIR, relDir);
  let files: string[];
  try {
    files = (await fs.readdir(full)).filter((f) => f.endsWith(".json"));
  } catch {
    throw new Error(`[cms] Folder konten tidak ditemukan: content/${relDir}`);
  }
  const items = await Promise.all(
    files.sort().map((f) => readJsonFile<T>(path.join(relDir, f), itemSchema)),
  );
  return items;
}

export async function readTextDir(relDir: string): Promise<{ name: string; raw: string }[]> {
  const full = path.join(CONTENT_DIR, relDir);
  const files = (await fs.readdir(full)).filter(
    (f) => f.endsWith(".md") || f.endsWith(".mdx"),
  );
  return Promise.all(
    files.sort().map(async (f) => ({
      name: f.replace(/\.mdx?$/, ""),
      raw: await fs.readFile(path.join(full, f), "utf8"),
    })),
  );
}
