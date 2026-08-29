# 016 — Infrastruktur SEO

**PRD:** §11

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-SEO-01 | Satu URL kanonik per paket, tanpa duplikat query di sitemap | `app/sitemap.ts` (hanya path bersih) + `alternates.canonical` di `pageMetadata` |
| AC-SEO-02 | Metadata dinamis per halaman (title ≤ 60, desc ≤ 155) | `lib/seo.ts` `pageMetadata` + `clampText` |
| AC-SEO-03 | `sitemap.xml` & `robots.txt` otomatis | `app/sitemap.ts`, `app/robots.ts` |
| AC-SEO-04 | Structured data: TravelAgency, Product+Offer, Article, FAQPage, BreadcrumbList, VideoObject | `lib/jsonld.ts` + `components/seo/json-ld.tsx` (escape `<`) |
| AC-SEO-05 | Open Graph + Twitter Card per halaman; OG image dinamis paket | `pageMetadata` + `app/opengraph-image.tsx` + `app/paket/[slug]/opengraph-image.tsx` |
| AC-SEO-06 | Satu `h1` per halaman | audit manual (F4) |
| AC-SEO-07 | `alt` deskriptif pada semua gambar konten | schema `gambarSchema.alt.min(3)` + `<Figure>` wajib `image.alt` |
| AC-SEO-08 | Struktur i18n disiapkan, hanya `id` aktif | `lib/i18n.ts`, `<html lang="id">` |
| AC-SEO-09 | Heading hierarkis | komponen memakai h1→h2→h3 berurut |

## Tasks
- [x] sitemap/robots/manifest, metadata helper, JSON-LD builders, OG images
- [ ] Verifikasi `h1` tunggal & Rich Results (F4 audit)
