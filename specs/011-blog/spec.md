# 011 — Panduan / Blog

**PRD:** §7.8

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-BLOG-01 | Kategori: Persiapan, Biaya, Ibadah, Tips Perjalanan, Dokumen | `kategoriArtikel` enum; filter di `article-list.tsx` (client, halaman tetap statis) |
| AC-BLOG-02 | Halaman artikel: daftar isi, estimasi baca, penulis, tanggal | `app/panduan/[slug]/page.tsx` + `extractToc` + `github-slugger` + `rehype-slug` |
| AC-BLOG-03 | CTA paket di tengah dan akhir artikel | `components/article/article-body.tsx` `InlineCta` |
| AC-BLOG-04 | Artikel terkait | `getRelatedArticles` (kategori sama diutamakan) |
| AC-BLOG-05 | JSON-LD `Article` | `articleLd()` |
| AC-BLOG-06 | SSG + `generateStaticParams` + ISR 300 | page config |
| AC-BLOG-07 | Konten dari CMS (Markdown + frontmatter, adapter Zod) | `lib/cms/articles.ts` |
| AC-BLOG-08 | ≥ 6 artikel seed | `content/articles/*.md` |

## Catatan
MDX disederhanakan ke Markdown + `react-markdown` (stabil di RSC Next 16).

## Tasks
- [x] `/panduan` (statis) + `/panduan/[slug]`
- [x] 6 artikel seed lintas kategori
