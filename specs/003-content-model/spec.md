# 003 — Model Konten & Adapter CMS

**PRD:** §10.1, §10.3, §18.5

## Kriteria penerimaan

| ID | Kriteria | PRD |
| --- | --- | --- |
| AC-CMS-01 | Schema Zod untuk Paket sesuai tabel §10.3 (semua field, tipe, enum) | §10.3 |
| AC-CMS-02 | Koleksi tambahan: Artikel, Testimoni, Pembimbing, FAQ, Galeri, PengaturanSitus | §10.3 |
| AC-CMS-03 | Adapter `lib/cms` mengekspos fungsi baca bertipe: `getPackages`, `getPackage(slug)`, `getArticles`, `getArticle(slug)`, `getTestimonials`, `getPembimbing`, `getFaq`, `getGallery`, `getSettings` | §10.1 |
| AC-CMS-04 | Komponen UI tidak pernah `import` file di `/content` langsung | C4 |
| AC-CMS-05 | Data tidak valid → error jelas saat build/dev (bukan diam-diam) | §19 |
| AC-CMS-06 | Paket `aktif: false` tetap dikembalikan tapi ditandai; helper `getActivePackages` | §10.3 |
| AC-CMS-07 | 7 paket seed (kategori beragam, `keberangkatan` dgn `sisaSeat`/status), 6 artikel, ≥ 8 testimoni, 3 pembimbing, ≥ 25 FAQ, galeri, settings | §5.3, §20 #6 |
| AC-CMS-08 | `keberangkatan` menyediakan derajat "sisa seat" (badge `hampir-penuh` bila sisa ≤ threshold) | §7.1, §7.2 |
| AC-CMS-09 | Kontrak adapter didokumentasikan agar bisa ditukar ke headless CMS tanpa ubah UI | §10.1 |

## Struktur
```
content/
  packages/*.json      1 file per paket
  articles/*.md        frontmatter + body markdown
  testimonials/*.json
  pembimbing/*.json
  faq.json             array bergrup
  gallery/*.json       1 file per album keberangkatan
  settings.json        nomor WA, jam operasional, banner, legalitas, statistik
lib/cms/
  schema.ts            Zod
  index.ts             kontrak + dokumentasi jalur upgrade
  packages.ts articles.ts testimonials.ts pembimbing.ts faq.ts gallery.ts settings.ts
```

## Tasks
- [x] `schema.ts`
- [x] loader per koleksi + validasi
- [x] `index.ts` barrel + dokumentasi kontrak
- [x] seed konten
