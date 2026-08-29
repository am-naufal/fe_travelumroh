# 006 — Detail Paket (`/paket/[slug]`)

**PRD:** §7.3 — halaman terpenting untuk konversi & SEO.

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-DETAIL-01 | Header: nama, badge, harga per tipe kamar (tabel Quad/Triple/Double), tanggal berangkat, sisa seat, CTA ganda (WA + Daftar) | `app/paket/[slug]/page.tsx` |
| AC-DETAIL-02 | Galeri foto paket dengan lightbox | `components/package/package-gallery.tsx` |
| AC-DETAIL-03 | Ringkasan cepat: durasi, kota, maskapai, hotel Makkah (nama/bintang/jarak), hotel Madinah, pembimbing | dl di page |
| AC-DETAIL-04 | Simulasi cicilan khusus paket (DP + tenor → angsuran) | `InstallmentCalculator` `lockedPaket` |
| AC-DETAIL-05 | Itinerary harian (accordion per hari) | `components/package/itinerary.tsx` |
| AC-DETAIL-06 | Fasilitas: 2 kolom "Sudah termasuk" vs "Belum termasuk", eksplisit | page section |
| AC-DETAIL-07 | Syarat & dokumen | page section |
| AC-DETAIL-08 | Kebijakan pembayaran & pembatalan | `paket.kebijakanPembayaran` |
| AC-DETAIL-09 | Testimoni jamaah paket serupa | `getTestimonialsForPackage` |
| AC-DETAIL-10 | Paket lain yang mirip | `getRelatedPackages` |
| AC-DETAIL-11 | Sticky bottom bar di mobile: harga + "Chat Sekarang", muncul setelah lewat hero, tidak menutupi konten | `components/package/sticky-mobile-cta.tsx` + IntersectionObserver; FAB global disembunyikan |
| AC-DETAIL-12 | Pesan WA prefilled sesuai template PRD | `waPackage()` |
| AC-DETAIL-13 | Structured data `Product` + `Offer` + `AggregateRating` valid | `productLd()` |
| AC-DETAIL-14 | Brosur PDF dapat diunduh, event `brochure_download` | `BrochureButton` |
| AC-DETAIL-15 | SSG + `generateStaticParams` + ISR 300 | page config |
| AC-DETAIL-16 | Paket `aktif:false` → label "tidak tersedia", `noindex` | page + metadata |
| AC-DETAIL-17 | Event `view_package` saat halaman dibuka | `ViewPackageTracker` |

## Tasks
- [x] Semua 11 bagian PRD + sidebar TOC desktop
- [x] JSON-LD Product/Offer/AggregateRating + BreadcrumbList
- [x] OG image dinamis per paket
