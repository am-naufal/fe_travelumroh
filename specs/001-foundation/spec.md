# 001 — Fondasi Proyek

**PRD:** §10 (Persyaratan Teknis), §17 F0, §10.5 (struktur repo)

## Tujuan
Kerangka Next.js siap-produksi tempat semua fitur lain dibangun.

## Kriteria penerimaan

| ID | Kriteria | PRD |
| --- | --- | --- |
| AC-FND-01 | Next.js App Router + TypeScript `strict` (`noImplicitAny`, dst.) | §10.1 |
| AC-FND-02 | Tailwind CSS terpasang; token desain tersedia sebagai utilitas | §10.1 |
| AC-FND-03 | Struktur direktori sesuai §10.5 (`app/`, `components/ui|sections`, `lib/`, `content/`) | §10.5 |
| AC-FND-04 | ESLint + Prettier jalan tanpa error di seluruh repo | §10.1 |
| AC-FND-05 | Alias impor `@/*` berfungsi | §10.5 |
| AC-FND-06 | Rendering: beranda/daftar/detail/artikel = SSG + ISR `revalidate: 300` | §10.2 |
| AC-FND-07 | `next.config` mengaktifkan format gambar AVIF/WebP | §12 |
| AC-FND-08 | Font via `next/font` (Plus Jakarta Sans + Inter), `display: swap`, subset latin, ≤ 2 keluarga | §9.3, §12 |
| AC-FND-09 | `.env.example` mendaftar semua kunci integrasi (WA, GA4, GTM, Meta, TikTok, webhook, Turnstile) | §10.4, §15 |
| AC-FND-10 | `git` diinisialisasi; commit per fase | kesepakatan |
| AC-FND-11 | `README.md` proyek menjelaskan cara menjalankan, struktur, dan batas lingkungan | — |

## Keputusan teknis
- Next.js 16 (Turbopack default), React 19.2. `params`/`searchParams` async.
- Komponen bergaya shadcn/ui ditulis tangan di atas Radix primitives (kompatibilitas
  Next 16 / Tailwind v4 / React 19) — memenuhi maksud "shadcn/ui sebagai basis" PRD §10.1.
- Tailwind v4: token via `@theme` di `app/globals.css` (tanpa `tailwind.config.js`).
- MDX artikel: disederhanakan ke Markdown + `react-markdown` + `remark-gfm` (stabil di RSC).

## Tasks
- [x] `create-next-app` + dependency inti
- [x] Struktur direktori
- [x] Token desain di `globals.css` (lihat 002)
- [x] Font `next/font`
- [x] `next.config.ts`: images (AVIF/WebP, qualities), bundle-analyzer opsional
- [x] `.env.example`
- [x] `lib/env.ts` pembaca env yang aman
- [x] Prettier config + script `format`, `typecheck`
- [x] `README.md`
