# Constitution — Website Luhas

Prinsip yang mengikat setiap fitur. Pelanggaran harus dicatat eksplisit di `tasks.md`
fitur terkait dan di audit akhir.

## C1 — Mobile-first mutlak (PRD §1, §2, §16)
Desain dan uji dari lebar 360px. Asumsi >85% traffic ponsel, banyak dari in-app browser
TikTok/Instagram yang lambat. Layout tidak boleh menggeser (CLS ≤ 0,1). Area sentuh ≥ 44×44px.

## C2 — Harga transparan sejak awal (PRD §1, §2 P1)
Harga "mulai dari" dan simulasi cicilan tampil di kartu paket dan hero, tidak disembunyikan
di balik "hubungi kami". Dilarang menampilkan harga yang tidak pernah tersedia (PRD §3.3).

## C3 — WhatsApp sebagai konversi utama (PRD §1, §10.4)
Setiap CTA berujung ke `https://wa.me/6285135720948` dengan pesan prefilled kontekstual
(paket + tanggal + sumber traffic/UTM). Nomor & pesan dibangun lewat satu helper `lib/wa-link.ts`.

## C4 — Konten dari CMS, bukan hardcode (PRD §18.5, §10.1)
Komponen tidak mengimpor file konten langsung. Semua konten lewat adapter `lib/cms/*`
yang tervalidasi Zod. Adapter saat ini membaca `/content` lokal; kontraknya harus tetap
sama bila kelak diganti Sanity/Payload.

## C5 — Kecepatan tidak dikompromikan (PRD §3.3, §12)
Target mobile p75: LCP ≤ 2,5s, INP ≤ 200ms, CLS ≤ 0,1, Lighthouse Performance ≥ 90,
JS awal ≤ 180KB gzip, bobot beranda ≤ 1,2MB. Gambar via `next/image` (AVIF/WebP, `sizes`
eksplisit, dimensi tetap). Video: poster + load-on-click, tanpa autoplay bersuara.
Skrip pihak ketiga `afterInteractive` atau lebih lambat. Maks 2 keluarga font, `display: swap`.

## C6 — Aksesibilitas WCAG 2.1 AA (PRD §13)
Operasi penuh keyboard, fokus terlihat, kontras teks ≥ 4,5:1 dan komponen ≥ 3:1, label
pada tiap input dengan `aria-describedby` untuk error, landmark + skip link, hormati
`prefers-reduced-motion`, warna bukan satu-satunya penanda informasi.

## C7 — SEO sebagai aset (PRD §2 P5, §11)
SSG/ISR (revalidate 300) untuk beranda, daftar paket, detail paket, artikel. Satu `h1`
per halaman, metadata dinamis (title ≤ 60, description ≤ 155), structured data valid,
satu URL kanonik per paket, `sitemap.xml` + `robots.txt` otomatis, `alt` deskriptif.

## C8 — Graceful degradation (PRD §7.1 blok 7, §19)
Kegagalan sumber eksternal (feed sosial, peta, webhook lead) tidak merusak layout dan
tidak membuat pengunjung buntu — selalu ada jalur alternatif (mis. tombol WA langsung).

## C9 — Privasi & kepatuhan (PRD §15)
Checkbox persetujuan tidak tercentang default. Cookie banner dengan opsi menolak sebelum
skrip pemasaran dijalankan. Kredensial hanya di environment variable. Data lead seperlunya.

## C10 — Definition of Done (PRD §18)
Halaman selesai bila: sesuai desain di 360/768/1280px; Lighthouse mobile Perf ≥ 90,
A11y ≥ 95, SEO ≥ 95; nol error konsol & request gagal; event analytics terverifikasi;
konten dari CMS; state loading/kosong/error ada; diuji Safari iOS + in-app browser;
metadata & structured data lolos Rich Results Test; copy harga & legalitas disetujui.

## Batas lingkungan (dikonfirmasi pemilik produk)
- CMS: lapisan lokal `/content` + adapter; jalur upgrade terdokumentasi.
- Aset visual: placeholder berdimensi tetap + `alt` deskriptif hingga foto asli tersedia.
- Analytics/Pixel/WA-API/webhook/Turnstile: kode lengkap, non-aktif tanpa env var.
- Lighthouse p75/CrUX & uji in-app browser nyata: butuh perangkat/lapangan — checklist manual.
- `brand-primary #0A5CAF` diperlakukan sebagai biru (label "hijau toska" di PRD §9.2
  menunggu konfirmasi tim desain — lihat 002-design-system/spec.md).
