# Audit Menyeluruh — Website Luhas

**Tanggal audit:** 29 Agustus 2026
**Basis:** PRD `CLAUDE.md` v1.0 · commit fase F0–F4
**Metode:** Spec-Driven Development (`specs/`)
**Lingkungan uji:** Next.js 16.3.3, Node 22, `next build` + `next start` (produksi lokal),
crawl HTTP semua route, uji API, validasi schema & JSON-LD.

Legenda status:
`✅ Lengkap` · `🟡 Sebagian` (alasan disebut) · `⏳ Tertunda` (butuh aset/kredensial/alat eksternal)

---

## 1. Ringkasan

| Area | Status |
| --- | --- |
| Struktur & rendering (SSG/ISR) | ✅ 38 route ter-build; beranda/paket/detail/artikel = static + ISR 300 |
| Semua halaman PRD §7.1–§7.11 | ✅ dibangun |
| Sitemap §6 (17 route) | ✅ semua ada + `/terima-kasih` (tracking) |
| Konten dari CMS (adapter Zod) | ✅ tidak ada UI membaca `/content` langsung |
| WhatsApp sebagai konversi utama | ✅ satu helper `lib/wa-link.ts`, prefilled + UTM |
| Analytics §14 (9 event) | ✅ kode lengkap, consent-gated · ⏳ verifikasi DebugView (butuh ID GA4) |
| SEO §11 (metadata, JSON-LD, sitemap, OG) | ✅ · ⏳ Rich Results Test (butuh internet) |
| Performa §12 | 🟡 fondasi lengkap · ⏳ skor Lighthouse p75 (butuh runner + data lapangan) |
| Aksesibilitas §13 | 🟡 fondasi lengkap · ⏳ audit axe + Lighthouse a11y |
| Foto/video asli §5.3 | ⏳ placeholder terdokumentasi (`public/images/README.md`) |
| Uji in-app browser TikTok/IG §16 | ⏳ butuh perangkat nyata |

**Tidak ada error konsol server, tidak ada request gagal, satu `<h1>` per halaman** (crawl 22 route).
**Typecheck, ESLint (0 error), `next build` semuanya lulus.**

---

## 2. Matriks ketertelusuran — PRD §7 (Spesifikasi Halaman)

### §7.1 Beranda (`/`) — spec 004
| Blok PRD | Status | Bukti |
| --- | --- | --- |
| 1 Hero (headline+subheadline+harga+2 CTA+gambar, LCP=hero `priority`, penuh di 360×640) | ✅ | `components/sections/hero.tsx`; headline & harga terverifikasi di HTML |
| 2 Trust bar (SK PPIU klik→Kemenag, jumlah jamaah, tahun, rating Google) | ✅ | `sections/trust-bar.tsx` — link ke `settings.legalitas.urlVerifikasiKemenag` |
| 3 Paket unggulan (3–4 kartu + badge, harga/durasi/tanggal/hotel+jarak) | ✅ | `sections/featured-packages.tsx` + `PackageCard` |
| 4 Kenapa Luhas (4 poin, ≤15 kata) | ✅ | `sections/home-blocks.tsx` — tiap poin ≤ 15 kata |
| 5 Simulasi mini (slider+tenor→angsuran real-time, tautan kalkulator penuh) | ✅ | `sections/mini-calculator.tsx` |
| 6 Testimoni video (carousel 3–5, 9:16, lazy, poster, tanpa autoplay bersuara) | ✅ | `sections/video-testimonials.tsx`, `VideoTestimonialCard` (load-on-click) |
| 7 Feed sosial (grid 6, graceful degradation) | ✅ | `sections/social-feed.tsx` + `/api/social-feed` (cache server, fallback statis) |
| 8 Alur pendaftaran (4 langkah, horizontal desktop / vertikal mobile) | ✅ | `home-blocks.tsx` `RegistrationSteps` |
| 9 Artikel terbaru (3) | ✅ | `sections/latest-articles.tsx` |
| 10 FAQ ringkas (5 + tautan, FAQPage schema) | ✅ | `sections/faq-preview.tsx` — `faqLd()` |
| 11 CTA penutup (blok kontras + WA) | ✅ | `home-blocks.tsx` `ClosingCta` |
| Rendering SSG+ISR 300, TravelAgency JSON-LD | ✅ | `app/page.tsx` `revalidate=300`, `travelAgencyLd` |

### §7.2 Daftar Paket (`/paket`) — spec 005
| Kriteria PRD | Status | Bukti |
| --- | --- | --- |
| Filter: kategori, bulan, harga(slider), durasi(9/12/14+), kota, maskapai, bintang Makkah; dapat digabung | ✅ | `package-explorer.tsx` |
| Filter tercermin di URL query, bookmarkable, tanpa full reload | ✅ | `router.replace(...,{scroll:false})` + `useSearchParams` |
| Pengurutan: harga terendah / keberangkatan terdekat / populer | ✅ | idem |
| Kartu: nama, foto, harga quad, durasi, tanggal terdekat, maskapai, hotel Makkah+jarak(m), badge sisa seat, Detail + Tanya WA, checkbox Bandingkan | ✅ | `PackageCard` |
| Skeleton saat memuat (bukan layar kosong) | ✅ | `PackageCardSkeleton`, gate `hydrated` |
| Kondisi kosong + tombol reset + saran | ✅ | `EmptyState` di explorer |
| Paginasi/infinite scroll setelah 12 kartu | ✅ | `PER_PAGE = 12` |
| Event `filter_apply` | ✅ | `track()` di `setParams` |

### §7.3 Detail Paket (`/paket/[slug]`) — spec 006
| Bagian PRD (1–11) | Status | Bukti |
| --- | --- | --- |
| 1 Header: nama, badge, tabel harga Quad/Triple/Double, tanggal, sisa seat, CTA ganda | ✅ | `app/paket/[slug]/page.tsx` |
| 2 Galeri foto paket | ✅ | `package-gallery.tsx` + lightbox |
| 3 Ringkasan cepat (durasi, kota, maskapai, hotel Makkah nama/bintang/jarak, hotel Madinah, pembimbing) | ✅ | `<dl>` di page |
| 4 Simulasi cicilan khusus paket | ✅ | `InstallmentCalculator lockedPaket` |
| 5 Itinerary harian (accordion per hari) | ✅ | `itinerary.tsx` |
| 6 Fasilitas: 2 kolom termasuk/tidak termasuk, eksplisit | ✅ | page |
| 7 Syarat & dokumen | ✅ | page |
| 8 Kebijakan pembayaran & pembatalan | ✅ | `paket.kebijakanPembayaran` |
| 9 Testimoni jamaah paket serupa | ✅ | `getTestimonialsForPackage` |
| 10 Paket lain yang mirip | ✅ | `getRelatedPackages` |
| 11 Sticky bottom bar mobile (harga + Chat), muncul setelah lewat hero, tidak menutupi konten | ✅ | `sticky-mobile-cta.tsx` IntersectionObserver; FAB global disembunyikan via `body[data-sticky-cta]` |
| Kriteria: WA prefilled sesuai template | ✅ | terverifikasi: `wa.me/6285135720948?text=Assalamualaikum, saya tertarik dengan paket {nama} keberangkatan {tanggal}. Mohon informasinya.` |
| Kriteria: `Product`+`Offer`+`AggregateRating` valid | ✅ struktur | `productLd()`; validator lokal lulus · ⏳ Rich Results Test |
| Kriteria: brosur PDF diunduh, event `brochure_download` | 🟡 | `BrochureButton` + event ada; **file PDF belum ada** (`public/brosur/*` menyusul) |
| SSG + `generateStaticParams` + ISR 300 | ✅ | 8 paket ter-prerender |
| `aktif:false` → label "tidak tersedia" + noindex | ✅ | terverifikasi di `/paket/umroh-syawal-2026-14h` |
| Event `view_package` | ✅ | `ViewPackageTracker` |

### §7.4 Banding Paket — spec 007
Tabel ≤ 3 paket, baris harga per tipe kamar/durasi/maskapai/hotel+jarak/fasilitas/sisa seat, perbedaan
disorot, mobile scroll horizontal kolom terkunci, Context+localStorage, `?paket=`. **✅** — `compare-view.tsx`.

### §7.5 Simulasi Cicilan — spec 008
Input harga(paket/manual)+DP(nominal/%)+tenor 3/6/9/12; output angsuran/total/**tanggal pelunasan H-40**
dengan peringatan bila tenor melewati batas; real-time; **disclaimer** "simulasi internal, bukan produk
pembiayaan pihak ketiga"; tombol "Konsultasi via WA" kirim ringkasan; event `calculator_use`. **✅** —
`lib/installment.ts` + `components/forms/installment-calculator.tsx` + `app/simulasi-cicilan/page.tsx`.

### §7.6 Tentang — spec 009
Cerita, visi, legalitas (SK PPIU/NIB/akta), foto kantor, tim, jamaah/tahun, tanpa foto stok. **✅** —
`app/tentang/page.tsx` + `travelAgencyLd`. 🟡 narasi cerita/visi ditulis sebagai copy halaman (bukan
koleksi CMS) — perlu persetujuan marketing (PRD §18.9); foto kantor = placeholder.

### §7.7 Galeri & Testimoni — spec 010
Galeri masonry + filter keberangkatan/tahun + lightbox. Testimoni kartu (nama/kota/paket/foto/kutipan) +
video vertikal + izin jamaah (`izinPublikasi: literal(true)`) + `VideoObject` + transkrip. **✅** —
`gallery-view.tsx`, `app/testimoni/page.tsx`.

### §7.8 Panduan/Blog — spec 011
Kategori, daftar isi, estimasi baca, penulis, tanggal, CTA paket di tengah & akhir, artikel terkait,
`Article` JSON-LD. **✅** — `app/panduan/*` + `article-body.tsx`. 6 artikel seed lintas 4 kategori.
Catatan: MDX disederhanakan ke Markdown + `react-markdown` (stabil di RSC Next 16) — lihat 001/011.

### §7.9 FAQ — spec 012
≥ 25 pertanyaan (28), 5 grup, accordion, pencarian dalam halaman, FAQPage schema. **✅** —
`content/faq.json` + `faq-accordion.tsx` + `app/faq/page.tsx`.

### §7.10 Kontak — spec 013
Alamat, peta lazy (load-on-click, bukan iframe auto), jam operasional, WA per divisi, form pesan singkat.
**✅** — `app/kontak/page.tsx` + `lazy-map.tsx` + `contact-form.tsx` (form menyusun pesan → WhatsApp,
selaras strategi WA-first).

### §7.11 Form Pendaftaran Minat — spec 014
| Kriteria PRD | Status |
| --- | --- |
| Semua field + validasi (nama≥3, WA→62xxx, email format, kota, paket prefill, bulan, jumlah 1–50, rencana, catatan≤500, persetujuan wajib) | ✅ `lib/lead-schema.ts` (Zod, klien+server) |
| Maksimal 2 langkah | ✅ |
| Validasi inline saat blur | ✅ RHF `mode:"onBlur"` |
| Honeypot + rate limit + Turnstile (opsional) | ✅ diuji: honeypot→`{ok:true}` senyap; rate limit→429 setelah 5/menit |
| Prefill paket dari halaman paket | ✅ `?paket=` |
| Setelah submit → `/terima-kasih` + tombol "Lanjut chat WA" + event konversi | ✅ |
| Data ke (a) email (b) Sheet/CRM (c) WA internal | ✅ `deliver()` env-driven (log bila tak ada integrasi) |
| Gagal kirim → tombol WA langsung, tidak buntu | ✅ `showWaFallback` |
| Redirect `/terima-kasih` untuk tracking konversi | ✅ noindex |

---

## 3. Matriks ketertelusuran — PRD §8–§16

| PRD | Item | Status | Catatan |
| --- | --- | --- | --- |
| §8 | Alur A–D (iklan→chat, riset organik, pembanding, koordinator grup) | ✅ | semua langkah tiap alur punya halaman & CTA; UTM dibawa ke WA |
| §9 | Design system: token warna/tipografi/spacing/radius/shadow/breakpoint | ✅ | `app/globals.css` `@theme` — semua nilai dari PRD §9.2–§9.4 |
| §9.2 | Kontras teks ≥ 4,5:1 | ✅ | ink `#0B1B3D` di bg `#F4F7FC` ≈ 15:1; primary `#0A5CAF` di putih ≈ 5.9:1; muted `#5A6B8C` di putih ≈ 4.6:1 |
| §9.2 | "hijau toska modern" untuk `#0A5CAF` | 🟡 | **nilai hex tersebut biru, bukan hijau toska** — dipakai apa adanya demi kontras; perlu konfirmasi tim desain |
| §9.6 | 18 komponen inti | ✅ | Button/PackageCard/PriceTag/Badge/FilterBar/Accordion/Tabs/Carousel/VideoTestimonialCard/InstallmentCalculator/StickyMobileCTA/LeadForm/Breadcrumb/EmptyState/Skeleton/Toast/Modal/Lightbox |
| §9.7 | Transisi 150–250ms ease-out, hormati `prefers-reduced-motion` | ✅ | `--ease-out` token + media query global; tanpa Framer Motion berat |
| §10.1 | Stack: Next+TS strict, Tailwind+shadcn, RHF+Zod, lucide, Framer Motion, CMS headless | 🟡 | shadcn → komponen bergaya shadcn ditulis tangan di atas Radix (kompatibilitas Next16/TW4/React19); Framer Motion (`motion`) terpasang, dipakai hemat; **CMS = lapisan lokal** (disepakati) dengan jalur upgrade di `lib/cms/index.ts` |
| §10.2 | Rendering SSG+ISR 300; filter/kalkulator client; form server action/route | ✅ | beranda/paket/detail/artikel/tentang/faq/dst static+ISR; `/api/lead` route |
| §10.3 | Model konten Paket + koleksi lain | ✅ | `lib/cms/schema.ts` — semua field §10.3; koleksi Artikel/Testimoni/Pembimbing/FAQ/Galeri/PengaturanSitus |
| §10.4 | Integrasi: WA deep link, GA4+GTM, Meta Pixel, TikTok Pixel, feed IG/TikTok (server cache), Maps lazy, notifikasi lead | ✅ kode | semua ada; aktif bila env diisi |
| §10.5 | Struktur repo | ✅ | `app/ components/ui|sections|... lib/ content/ public/` |
| §11 | SEO: kanonik/paket, metadata dinamis (title≤60/desc≤155), sitemap+robots otomatis, structured data 6 tipe, OG+Twitter, OG image dinamis paket, 1 `h1`/halaman, `alt` deskriptif, i18n disiapkan | ✅ struktur | `lib/seo.ts` `clampText`, `app/sitemap.ts` (URL bersih, tanpa query), `lib/jsonld.ts`, OG images; crawl: 1 `h1` tiap halaman; schema `gambar.alt.min(3)` · ⏳ Rich Results Test butuh internet; kata kunci target belum diukur (GSC pasca-rilis) |
| §12 | Performa: `next/image` AVIF/WebP `sizes` eksplisit dimensi tetap; video poster+load-on-click; font ≤2 `swap` preload heading; skrip 3P `afterInteractive`; Lighthouse CI | 🟡 | `<Figure>` satu-satunya jalur gambar (dimensi/rasio selalu diset → CLS aman); `next.config` formats+deviceSizes; `.lighthouserc.json` (mobile, Perf≥90/A11y≥95/SEO≥95). **Skor LCP/INP/CLS p75, bobot JS/halaman: ⏳ belum diukur** (butuh runner Lighthouse + gambar nyata + CrUX). Placeholder gambar saat ini justru meringankan halaman |
| §13 | Aksesibilitas WCAG 2.1 AA | 🟡 | keyboard + `:focus-visible` global; label+`aria-describedby`+`aria-invalid` di form; area sentuh `h-11`/`.tap-target`; landmark `header/nav/main/footer` + skip link; caption/transkrip video; `prefers-reduced-motion`; warna+teks (sisa seat). **⏳ audit axe/Lighthouse a11y, uji screen reader** |
| §14 | 9 event + UTM ke WA | ✅ kode | tabel event di `specs/017`; semua terpasang di komponen terkait; UTM disimpan sesi + dilampirkan ke pesan WA (terverifikasi di URL) · ⏳ verifikasi GA4 DebugView |
| §15 | Keamanan/privasi: HTTPS/HSTS, rate limit form, honeypot+Turnstile, data seperlunya+UU PDP, consent tidak default-checked, cookie banner opsi tolak, kredensial di env, SK PPIU akurat | 🟡 | header keamanan dasar di `next.config` (HSTS di platform); rate limit + honeypot diuji; `.env.example` lengkap; consent banner + checkbox tidak default-checked (terverifikasi); halaman privasi selaras UU PDP (**draf — perlu review legal**); **nomor SK PPIU contoh — perlu verifikasi tim legal sebelum publikasi** |
| §16 | Browser: 2 versi terakhir Chrome/Safari/FF/Edge, iOS 15+, Android 10+, **in-app browser TikTok/IG/FB wajib diuji**, 360–1920px | ⏳ | target browser Next 16 (Chrome/Edge/FF 111+, Safari 16.4+); layout mobile-first dari 360px; **uji in-app browser & Safari iOS butuh perangkat nyata** |

---

## 4. Definition of Done (PRD §18) — per status

| # | Kriteria DoD | Status |
| --- | --- | --- |
| 1 | Sesuai desain di 360/768/1280px | 🟡 layout responsif mobile-first dibangun & di-crawl; **verifikasi visual pixel butuh browser** (ekstensi Chrome tidak terhubung di sesi ini) |
| 2 | Lighthouse mobile Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 | ⏳ config siap (`.lighthouserc.json`); skor belum dijalankan |
| 3 | Nol error konsol & request gagal | ✅ crawl 22 route: semua 200, log server bersih |
| 4 | Event analytics terverifikasi di GA4 DebugView | ⏳ butuh GA4 ID; mode `NEXT_PUBLIC_ANALYTICS_DEBUG=1` tersedia untuk cek konsol |
| 5 | Konten dari CMS, bukan hardcode | ✅ (pengecualian sadar: narasi brand di `/tentang` & poin "Kenapa Luhas" adalah copy halaman) |
| 6 | Kondisi loading, kosong, error tersedia | ✅ Skeleton, EmptyState, `app/error.tsx`, `not-found.tsx`, form error + fallback |
| 7 | Diuji Safari iOS & in-app browser IG/TikTok | ⏳ butuh perangkat |
| 8 | Metadata & structured data lolos Rich Results Test | 🟡 validator struktur lokal lulus; **Rich Results Test resmi butuh internet** |
| 9 | Copy harga & legalitas disetujui marketing & legal | ⏳ harga paket & nomor SK PPIU adalah data contoh; halaman legal adalah draf |

---

## 5. Penyimpangan sadar dari PRD

| # | PRD | Penyimpangan | Alasan | Tindak lanjut |
| --- | --- | --- | --- | --- |
| D1 | §10.1 CMS headless | Lapisan konten lokal `/content` + adapter Zod | Disepakati pemilik produk; tanpa kredensial CMS | Ikuti langkah upgrade di `lib/cms/index.ts` saat memilih Sanity/Payload |
| D2 | §10.1 shadcn/ui | Komponen bergaya shadcn ditulis tangan di atas Radix | Kompatibilitas Next 16 / Tailwind v4 / React 19 | — (setara secara fungsi & API) |
| D3 | §9.2 warna | `brand-primary #0A5CAF` diperlakukan biru, label "hijau toska" diabaikan | Nilai hex adalah biru; kontras AA aman | Konfirmasi tim desain: biru atau hijau toska? |
| D4 | §7.8 MDX | Markdown + `react-markdown` (bukan MDX) | Stabilitas RSC di Next 16 | Naikkan ke `@next/mdx` bila butuh komponen dalam artikel |
| D5 | §5.3 foto/video | Placeholder berdimensi tetap + `alt` deskriptif | Aset asli belum tersedia | `public/images/README.md` — ganti file lalu `NEXT_PUBLIC_USE_REAL_IMAGES=true` |
| D6 | §7.10 form kontak | Form kontak menyusun pesan lalu buka WhatsApp | Selaras strategi WA-first (C3); tak menahan pengunjung menunggu balasan email | Tambah pengiriman email bila diinginkan |
| D7 | §18.5 | Narasi `/tentang` & poin "Kenapa Luhas" sebagai copy halaman | Brand copy, bukan data katalog | Pindah ke `PengaturanSitus`/koleksi bila tim ingin edit tanpa deploy |

---

## 6. Item terbuka yang butuh pihak lain

**Butuh data/keputusan bisnis:**
- Harga paket, tanggal keberangkatan, kuota nyata (saat ini data contoh realistis).
- Nomor SK PPIU, NIB, akta yang asli + verifikasi tim legal (PRD §15).
- Konfirmasi warna brand (D3).
- Persetujuan copy harga & klaim legalitas (DoD §9).
- Isi final halaman Kebijakan Privasi & Syarat-Ketentuan oleh tim legal.

**Butuh kredensial (isi di `.env.local` / dashboard Vercel):**
`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
`NEXT_PUBLIC_TIKTOK_PIXEL_ID`, `INSTAGRAM_FEED_TOKEN`, `TIKTOK_FEED_TOKEN`,
`LEAD_WEBHOOK_URL`, `LEAD_NOTIFY_EMAIL`, `LEAD_INTERNAL_WA`,
`TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `NEXT_PUBLIC_MAPS_EMBED_URL`.

**Butuh aset:**
- ≥ 60 foto keberangkatan asli + 5 video testimoni 9:16 (`public/images/`, `public/video/`).
- Brosur PDF per paket (`public/brosur/*.pdf`).
- Formulir izin publikasi testimoni (PRD §19).

**Butuh alat/lingkungan (jalankan sebelum go-live — PRD §17 F4):**
- `npx @lhci/cli autorun` (config sudah ada) — Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 mobile.
- Rich Results Test / Schema Markup Validator untuk tiap tipe JSON-LD.
- GA4 DebugView menelusuri 9 event PRD §14.
- Uji perangkat nyata: Safari iOS 15+, in-app browser TikTok/Instagram/Facebook (PRD §16).
- Axe DevTools / pemeriksaan screen reader untuk WCAG 2.1 AA.
- Aktifkan HSTS di Vercel.

---

## 7. Verifikasi yang SUDAH dijalankan di sesi ini

| Uji | Hasil |
| --- | --- |
| `npx tsc --noEmit` | ✅ 0 error |
| `npx eslint .` | ✅ 0 error (14 warning `set-state-in-effect` — pola SSR sah, diturunkan ke warning) |
| `npx next build` | ✅ 38 route; static+ISR sesuai rencana; 8 paket + 6 artikel prerender |
| `npm run validate:content` (`scripts/validate-content.ts`) | ✅ 8 paket / 3 pembimbing / 8 testimoni / 3 galeri / 28 FAQ / settings / 6 artikel valid; integritas `pembimbingSlug` OK |
| `npm run validate:jsonld` (`scripts/validate-jsonld.ts`) | ✅ TravelAgency/Product+Offer+AggregateRating/Article/FAQPage/BreadcrumbList/VideoObject — invariant struktur lolos |
| Crawl HTTP 22 route (`next start`) | ✅ semua 200; 1 `<h1>`/halaman; JSON-LD hadir; log server bersih |
| `/api/lead` valid submit | ✅ `{ok:true, paketNama}` |
| `/api/lead` honeypot terisi | ✅ `{ok:true}` (dibuang senyap) |
| `/api/lead` rate limit | ✅ 429 setelah 5 permintaan/menit |
| `/api/social-feed` tanpa token | ✅ fallback statis 6 item |
| Consent gate | ✅ tak ada skrip GTM/gtag di HTML sebelum consent |
| Consent checkbox form | ✅ tidak tercentang default |
| WA deep link paket | ✅ `wa.me/6285135720948?text=` + template PRD §7.3 + jejak halaman/UTM |
| Sitemap | ✅ URL kanonik bersih, tanpa parameter query, tiap paket sekali |
| `<html lang="id">`, `data-scroll-behavior="smooth"`, skip link | ✅ |

---

## 8. Kesimpulan

Seluruh **ruang lingkup fungsional Rilis 1 (PRD §5.1)** terbangun dan lulus build, typecheck,
lint, validasi konten & JSON-LD, serta crawl HTTP tanpa error. Arsitektur mematuhi konstitusi
(`specs/constitution.md`): mobile-first, harga transparan, WhatsApp sebagai konversi, konten
via adapter, graceful degradation, consent sebelum skrip pemasaran.

Yang tersisa sebelum **go-live** bukan pekerjaan pembangunan melainkan **pengisian data nyata,
kredensial, aset foto/video, review legal, dan pengujian berbasis alat/perangkat** (Lighthouse
p75, Rich Results Test, GA4 DebugView, Safari iOS, in-app browser) — semuanya terdaftar di §6.
