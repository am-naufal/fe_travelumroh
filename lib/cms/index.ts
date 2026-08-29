/**
 * Adapter CMS — titik masuk tunggal untuk semua konten (PRD §10.1, C4).
 *
 * ── Kontrak ──────────────────────────────────────────────────────────────
 * Komponen UI HANYA memanggil fungsi dari modul ini. Mereka tidak boleh
 * membaca `/content` langsung. Selama fungsi-fungsi ini mengembalikan bentuk
 * yang sama (lihat `schema.ts`), sumber konten bebas diganti tanpa menyentuh
 * komponen.
 *
 * ── Implementasi sekarang ────────────────────────────────────────────────
 * Membaca berkas lokal di `/content` (JSON + Markdown) dan memvalidasinya
 * dengan Zod saat build/dev. Editor menambah/mengubah paket lewat Git/PR.
 *
 * ── Jalur upgrade ke headless CMS (Sanity / Payload / Strapi) ─────────────
 * 1. Buat schema di CMS yang menghasilkan bentuk identik dengan `schema.ts`.
 * 2. Ganti isi tiap loader (`packages.ts`, dst.) dengan panggilan API CMS;
 *    tetap validasi hasilnya dengan schema Zod yang sama.
 * 3. Untuk konten real-time, ganti `revalidate` per-route dengan webhook
 *    `revalidateTag(tag, 'max')` dari CMS.
 * Tidak ada perubahan di `components/` atau `app/` yang dibutuhkan.
 */

export * from "./schema";
export * from "./packages";
export * from "./articles";
export * from "./testimonials";
export * from "./pembimbing";
export * from "./faq";
export * from "./gallery";
export { getSettings } from "./settings";

/** Revalidate default untuk konten (PRD §10.2: ISR 300 detik). */
export const CONTENT_REVALIDATE = 300;
