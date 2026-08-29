# 004 — Beranda (`/`)

**PRD:** §7.1

Urutan blok mengikuti urutan pertanyaan di kepala pengunjung (disengaja).

| ID | Blok | Kriteria penerimaan | Implementasi |
| --- | --- | --- | --- |
| AC-HOME-01 | Hero | Headline nilai jual + subheadline + harga mulai + 2 CTA + gambar jamaah; LCP = gambar hero (`priority`), tampil penuh di 360×640 | `components/sections/hero.tsx` |
| AC-HOME-02 | Trust bar | SK PPIU, jumlah jamaah, tahun, rating Google; nomor SK klik → verifikasi Kemenag | `sections/trust-bar.tsx` |
| AC-HOME-03 | Paket unggulan | 3–4 kartu + badge; harga, durasi, tanggal, hotel + jarak | `sections/featured-packages.tsx` + `PackageCard` |
| AC-HOME-04 | Kenapa Luhas | 4 poin, ≤ 15 kata/poin | `sections/home-blocks.tsx` `WhyLuhas` |
| AC-HOME-05 | Simulasi mini | Slider harga + tenor → angsuran real-time; tautan kalkulator penuh | `sections/mini-calculator.tsx` |
| AC-HOME-06 | Testimoni video | Carousel 3–5 video 9:16; lazy, poster, tanpa autoplay bersuara | `sections/video-testimonials.tsx` |
| AC-HOME-07 | Feed sosial | Grid 6 post; gagal muat tidak merusak layout | `sections/social-feed.tsx` + `/api/social-feed` |
| AC-HOME-08 | Alur pendaftaran | 4 langkah; horizontal desktop, vertikal mobile | `home-blocks.tsx` `RegistrationSteps` |
| AC-HOME-09 | Artikel terbaru | 3 artikel | `sections/latest-articles.tsx` |
| AC-HOME-10 | FAQ ringkas | 5 pertanyaan + tautan; FAQPage schema | `sections/faq-preview.tsx` |
| AC-HOME-11 | CTA penutup | Blok kontras + tombol WhatsApp | `home-blocks.tsx` `ClosingCta` |
| AC-HOME-12 | Rendering | SSG + ISR 300; `TravelAgency` JSON-LD | `app/page.tsx` |

## Tasks
- [x] Semua 11 blok + urutan
- [x] JSON-LD TravelAgency + FAQPage
- [x] ISR 300
