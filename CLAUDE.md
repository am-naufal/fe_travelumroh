# PRD — Frontend Website Luhas

### Tour & Travel Umroh · Company Profile + Lead Generation

|                     |                                                                      |
| ------------------- | -------------------------------------------------------------------- |
| **Produk**          | Website Luhas (luhas.co.id)                                          |
| **Tipe**            | Company profile + katalog paket + lead form (tanpa transaksi online) |
| **Versi dokumen**   | 1.0                                                                  |
| **Tanggal**         | 29 Agustus 2026                                                      |
| **Status**          | Draft untuk review                                                   |
| **Pemilik dokumen** | Product Owner Luhas                                                  |
| **Stakeholder**     | Marketing, Sales/CS, Operasional Umroh, Engineering, Desain          |

---

## 1. Ringkasan Eksekutif

Luhas adalah biro perjalanan umroh yang menyasar segmen **muslim muda usia 25–40 tahun** — generasi yang riset di TikTok dan Instagram, membandingkan harga di ponsel, sensitif terhadap kejelasan biaya, dan lebih memilih chat daripada telepon.

Website ini **bukan mesin transaksi**. Fungsinya adalah mesin kepercayaan dan mesin lead: mengubah traffic dari iklan, konten sosial, dan pencarian organik menjadi percakapan WhatsApp yang berkualitas dengan tim sales.

Keputusan produk paling penting dalam PRD ini:

1. **Mobile-first mutlak.** Diasumsikan >85% traffic dari ponsel, mayoritas dari in-app browser TikTok/Instagram yang lambat.
2. **Harga transparan sejak awal.** Harga mulai + simulasi cicilan tampil di kartu paket, bukan disembunyikan di balik "hubungi kami".
3. **WhatsApp sebagai konversi utama.** Setiap CTA berujung ke WhatsApp dengan pesan terisi otomatis (paket + tanggal + sumber traffic).
4. **Konten sosial adalah bagian dari produk**, bukan tempelan — feed Instagram/TikTok dan video testimoni jamaah tampil di halaman utama dan halaman paket.

---

## 2. Latar Belakang & Pernyataan Masalah

### 2.1 Kondisi saat ini

Calon jamaah muda memulai perjalanannya dari konten sosial, bukan dari website. Website travel umroh yang ada umumnya:

- Menyembunyikan harga sehingga pengunjung mundur sebelum kontak.
- Berat, penuh slider dan animasi, gagal dimuat di koneksi seluler.
- Terlihat generik dan tidak meyakinkan — sulit membedakan travel legal dari travel bermasalah.
- Tidak menjawab kekhawatiran nyata: "apakah izin PPIU-nya asli?", "kalau saya belum punya uang penuh bagaimana?", "berangkatnya benar-benar jadi tidak?".

### 2.2 Masalah yang diselesaikan

| #   | Masalah                                  | Dampak                                         | Solusi di produk ini                                                                |
| --- | ---------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------- |
| P1  | Harga tidak transparan                   | Bounce tinggi, lead tidak berkualitas          | Harga mulai + rincian per tipe kamar + kalkulator cicilan                           |
| P2  | Kepercayaan rendah terhadap travel umroh | Calon jamaah ragu, butuh waktu lama memutuskan | Blok legalitas (nomor SK PPIU Kemenag), testimoni video, galeri keberangkatan nyata |
| P3  | Traffic sosial tidak terkonversi         | Biaya iklan tinggi, ROAS rendah                | Landing page cepat, CTA WhatsApp lengket, pesan prefilled + tracking sumber         |
| P4  | Perbandingan paket sulit                 | Pengunjung membuka banyak tab, lalu pergi      | Filter, banding paket berdampingan, badge "sisa seat"                               |
| P5  | Website tidak ditemukan di Google        | Ketergantungan penuh pada iklan berbayar       | SSG/ISR, schema markup, blog panduan umroh                                          |

---

## 3. Tujuan & Metrik Sukses

### 3.1 Tujuan produk

- **G1** — Menjadi sumber lead utama Luhas (menggeser DM Instagram sebagai kanal masuk).
- **G2** — Membangun persepsi Luhas sebagai travel umroh yang modern, transparan, dan legal.
- **G3** — Menurunkan beban tim CS dengan menjawab pertanyaan berulang di website.
- **G4** — Membangun aset organik jangka panjang lewat konten SEO.

### 3.2 KPI dan target (3 bulan setelah rilis)

| KPI                                 | Baseline | Target          | Cara ukur                            |
| ----------------------------------- | -------- | --------------- | ------------------------------------ |
| Conversion rate ke WhatsApp         | —        | ≥ 6% dari sesi  | GA4 event `wa_click` / sesi          |
| Lead form terkirim                  | —        | ≥ 150 / bulan   | GA4 event `lead_submit`              |
| Lead berkualitas (siap DP)          | —        | ≥ 25% dari lead | Tagging manual di CRM/spreadsheet CS |
| Bounce rate mobile                  | —        | ≤ 45%           | GA4                                  |
| LCP mobile (p75)                    | —        | ≤ 2,5 detik     | Lighthouse CI + CrUX                 |
| Halaman paket masuk 10 besar Google | 0        | ≥ 5 kata kunci  | Google Search Console                |
| Waktu rata-rata di halaman paket    | —        | ≥ 90 detik      | GA4                                  |

### 3.3 Anti-goal (yang secara sadar TIDAK dikejar)

- Bukan mengejar jumlah lead sebanyak-banyaknya bila kualitas turun.
- Bukan menambah animasi/efek visual yang mengorbankan kecepatan.
- Tidak menampilkan harga palsu (harga "mulai dari" yang tidak pernah tersedia).

---

## 4. Target Pengguna

### 4.1 Persona utama — "Rizky, 29, Karyawan Swasta"

Menikah, satu anak, gaji bulanan tetap, tinggal di kota besar. Menemukan Luhas dari video TikTok soal biaya umroh. Membuka website sambil rebahan di ponsel. Ingin tahu: berapa total yang harus disiapkan, bisa dicicil berapa lama, hotelnya berapa jauh dari Masjidil Haram, dan apakah travel ini resmi. Tidak mau menelepon; akan chat WhatsApp kalau tombolnya jelas.

**Kebutuhan:** harga jujur, simulasi cicilan, bukti legalitas, jawaban cepat.
**Penghalang:** takut tertipu, takut komitmen finansial, tidak punya waktu membaca panjang.

### 4.2 Persona sekunder — "Nadia, 33, Wirausaha"

Ingin memberangkatkan orang tua. Membandingkan 3–4 travel. Sangat memperhatikan fasilitas (hotel bintang berapa, jarak, maskapai langsung atau transit) dan pendampingan lansia. Membaca detail itinerary sampai habis.

**Kebutuhan:** perbandingan paket, detail fasilitas, kebijakan pendampingan lansia.

### 4.3 Persona tersier — "Ustadz Fauzi, 45, Koordinator Jamaah"

Mengumpulkan rombongan dari majelis taklimnya. Butuh brosur PDF yang bisa disebar dan skema keberangkatan grup.

**Kebutuhan:** unduh brosur, kontak khusus grup, ketersediaan seat.

---

## 5. Ruang Lingkup

### 5.1 Termasuk (In Scope — Rilis 1)

- Beranda (landing utama)
- Daftar paket umroh dengan filter dan pengurutan
- Halaman detail paket (satu halaman per paket, SEO-friendly)
- Banding paket (bandingkan hingga 3 paket)
- Kalkulator simulasi cicilan
- Tentang Luhas (legalitas, tim, pembimbing ibadah)
- Galeri & testimoni (foto + video)
- Blog / Panduan Umroh
- FAQ
- Kontak & lokasi kantor
- Form pendaftaran minat (lead form) + WhatsApp deep link
- Halaman kebijakan privasi & syarat ketentuan
- CMS untuk tim marketing mengelola paket, blog, testimoni, dan galeri

### 5.2 Tidak Termasuk (Out of Scope — Rilis 1)

- Pembayaran online / payment gateway
- Login jamaah / portal dokumen
- Dashboard agen & sistem komisi
- Sistem manajemen keberangkatan internal (back office operasional)
- Multi-bahasa (hanya Bahasa Indonesia di Rilis 1; struktur i18n disiapkan)
- Aplikasi mobile native

### 5.3 Asumsi

- Data paket disediakan tim operasional dalam format terstruktur dan diperbarui minimal 2 minggu sekali.
- Nomor WhatsApp bisnis (WhatsApp Business API atau minimal WA Business) tersedia dan dijaga tim CS jam kerja.
- Foto keberangkatan asli tersedia (bukan stok) minimal 60 foto dan 5 video testimoni.
- Legalitas PPIU aktif dan nomor SK boleh dipublikasikan.

---

## 6. Arsitektur Informasi (Sitemap)

```
/                              Beranda
/paket                         Daftar semua paket + filter
/paket/[slug]                  Detail paket
/paket/banding                 Banding paket (hingga 3)
/simulasi-cicilan              Kalkulator cicilan
/tentang                       Tentang Luhas + legalitas + tim
/pembimbing                    Profil pembimbing ibadah / muthawif
/galeri                        Galeri foto & video keberangkatan
/testimoni                     Testimoni jamaah
/panduan                       Blog / artikel panduan umroh
/panduan/[slug]                Artikel
/faq                           Pertanyaan yang sering diajukan
/kontak                        Kontak, peta kantor, jam operasional
/daftar                        Form pendaftaran minat
/kebijakan-privasi             Kebijakan privasi
/syarat-ketentuan              Syarat & ketentuan
/terima-kasih                  Halaman konfirmasi setelah submit (untuk tracking konversi)
```

**Navigasi utama (maks. 5 item):** Paket · Simulasi Cicilan · Panduan · Testimoni · Tentang
**CTA tetap di header:** tombol "Chat Sekarang" (WhatsApp)
**Footer:** legalitas, kontak, sosial media, sitemap ringkas, kebijakan.

---

## 7. Spesifikasi Halaman

### 7.1 Beranda (`/`)

Urutan blok dari atas ke bawah — urutan ini disengaja mengikuti urutan pertanyaan di kepala pengunjung.

| #   | Blok                  | Isi                                                                                                               | Kriteria penerimaan                                                                                 |
| --- | --------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | Hero                  | Headline nilai jual + subheadline + harga mulai + 2 CTA ("Lihat Paket", "Chat Sekarang") + foto/video jamaah asli | LCP element = gambar hero, `priority`, format AVIF/WebP, tampil penuh tanpa scroll di layar 360×640 |
| 2   | Trust bar             | Nomor SK PPIU Kemenag, jumlah jamaah diberangkatkan, tahun berdiri, rating Google                                 | Nomor SK dapat diklik menuju halaman verifikasi Kemenag                                             |
| 3   | Paket unggulan        | 3–4 kartu paket dengan badge (Promo / Best Seller / Sisa 5 Seat)                                                  | Kartu menampilkan harga, durasi, tanggal berangkat, hotel + jarak                                   |
| 4   | Kenapa Luhas          | 4 poin pembeda, ikon + kalimat pendek                                                                             | Tidak lebih dari 15 kata per poin                                                                   |
| 5   | Simulasi cicilan mini | Slider harga + tenor → angsuran per bulan, tautan ke kalkulator penuh                                             | Hasil berubah real-time tanpa reload                                                                |
| 6   | Testimoni video       | Carousel 3–5 video pendek (format 9:16, seperti Reels)                                                            | Video lazy-load, poster image, tidak autoplay dengan suara                                          |
| 7   | Feed sosial           | Grid 6 post Instagram/TikTok terbaru                                                                              | Gagal memuat feed tidak merusak layout (graceful degradation)                                       |
| 8   | Alur pendaftaran      | 4 langkah: Konsultasi → Pilih Paket → DP → Berangkat                                                              | Visual horizontal di desktop, vertikal di mobile                                                    |
| 9   | Artikel terbaru       | 3 artikel panduan                                                                                                 | —                                                                                                   |
| 10  | FAQ ringkas           | 5 pertanyaan teratas + tautan ke FAQ penuh                                                                        | Accordion, ter-markup FAQPage schema                                                                |
| 11  | CTA penutup           | Blok kontras dengan tombol WhatsApp                                                                               | —                                                                                                   |

### 7.2 Daftar Paket (`/paket`)

**Filter (dapat digabung, tercermin di URL query agar bisa dibagikan):**

- Kategori: Hemat · Reguler · Plus Turki · Plus Dubai · Ramadhan · VIP
- Bulan keberangkatan
- Rentang harga (slider)
- Durasi: 9 hari · 12 hari · 14+ hari
- Kota keberangkatan
- Maskapai
- Bintang hotel Makkah

**Pengurutan:** Harga terendah · Keberangkatan terdekat · Paling populer

**Kartu paket wajib memuat:** nama paket, foto, harga mulai (per orang, tipe quad), durasi, tanggal keberangkatan terdekat, maskapai, hotel Makkah + jarak dalam meter, badge sisa seat, tombol "Detail" dan "Tanya via WA", checkbox "Bandingkan".

**Kriteria penerimaan:**

- Filter tidak me-reload halaman penuh; URL tetap dapat di-bookmark.
- Menampilkan skeleton saat memuat, bukan layar kosong.
- Kondisi kosong ("Tidak ada paket sesuai filter") menyertakan tombol reset dan saran paket terdekat.
- Paginasi atau infinite scroll setelah 12 kartu.

### 7.3 Detail Paket (`/paket/[slug]`)

Halaman terpenting untuk konversi dan SEO.

**Struktur:**

1. Header: nama paket, badge, harga per tipe kamar (Quad / Triple / Double) dalam tabel, tanggal berangkat, sisa seat, CTA ganda (WA + Daftar).
2. Galeri foto paket (hotel, maskapai, dokumentasi rombongan sebelumnya).
3. Ringkasan cepat: durasi, kota berangkat, maskapai, hotel Makkah (nama, bintang, jarak), hotel Madinah, pembimbing.
4. Simulasi cicilan khusus paket ini (DP + tenor → angsuran).
5. Itinerary harian (accordion per hari).
6. Fasilitas: dua kolom "Sudah termasuk" vs "Belum termasuk" — eksplisit, tanpa ambiguitas.
7. Syarat & dokumen yang harus disiapkan (paspor, vaksin meningitis, dll.).
8. Kebijakan pembayaran & pembatalan.
9. Testimoni jamaah paket serupa.
10. Paket lain yang mirip.
11. Sticky bottom bar di mobile: harga + tombol "Chat Sekarang".

**Kriteria penerimaan:**

- Sticky CTA muncul setelah scroll melewati hero, tidak menutupi konten penting.
- Pesan WhatsApp prefilled: `Assalamualaikum, saya tertarik dengan paket {nama_paket} keberangkatan {tanggal}. Mohon informasinya.`
- Structured data `Product` + `Offer` + `AggregateRating` valid di Rich Results Test.
- Brosur PDF paket dapat diunduh (event `brochure_download` terekam).

### 7.4 Banding Paket (`/paket/banding`)

Tabel berdampingan hingga 3 paket, baris: harga per tipe kamar, durasi, maskapai, hotel + jarak, fasilitas termasuk, sisa seat. Perbedaan disorot secara visual. Di mobile menjadi tabel yang dapat digeser horizontal dengan kolom nama terkunci.

### 7.5 Simulasi Cicilan (`/simulasi-cicilan`)

Input: harga paket (pilih paket atau isi manual), DP (nominal atau %), tenor (3/6/9/12 bulan). Output: angsuran per bulan, total, tanggal pelunasan (harus H-40 sebelum berangkat).

**Wajib:** disclaimer bahwa ini simulasi internal Luhas, bukan produk pembiayaan pihak ketiga, dan angka final dikonfirmasi oleh tim. Tombol "Konsultasi skema ini via WA" mengirim ringkasan simulasi ke chat.

### 7.6 Tentang Luhas (`/tentang`)

Cerita singkat, visi, legalitas (SK PPIU, NIB, akta), foto kantor asli, tim inti dengan foto dan peran, jumlah jamaah per tahun. Tanpa foto stok.

### 7.7 Galeri & Testimoni

Galeri: grid masonry, filter per keberangkatan/tahun, lightbox. Testimoni: kartu berisi nama, kota, paket yang diambil, foto, kutipan; video testimoni format vertikal. Testimoni wajib atas izin jamaah.

### 7.8 Panduan / Blog (`/panduan`)

Kategori: Persiapan · Biaya · Ibadah · Tips Perjalanan · Dokumen. Halaman artikel dengan daftar isi, estimasi baca, penulis, tanggal, CTA paket di tengah dan akhir artikel, artikel terkait.

### 7.9 FAQ (`/faq`)

Minimal 25 pertanyaan, dikelompokkan: Biaya & Pembayaran · Dokumen · Keberangkatan · Selama di Tanah Suci · Kebijakan. Accordion + pencarian dalam halaman + FAQPage schema.

### 7.10 Kontak (`/kontak`)

Alamat, peta (embed ringan yang dimuat setelah interaksi, bukan iframe otomatis), jam operasional, nomor WA per divisi, form pesan singkat.

### 7.11 Form Pendaftaran Minat (`/daftar`)

**Field:**

| Field                     | Tipe              | Wajib | Validasi                                       |
| ------------------------- | ----------------- | ----- | ---------------------------------------------- |
| Nama lengkap              | teks              | Ya    | min 3 karakter                                 |
| Nomor WhatsApp            | tel               | Ya    | format Indonesia, normalisasi ke 62xxx         |
| Email                     | email             | Tidak | format email                                   |
| Kota domisili             | teks/autocomplete | Ya    | —                                              |
| Paket yang diminati       | dropdown          | Ya    | terisi otomatis jika datang dari halaman paket |
| Perkiraan bulan berangkat | dropdown          | Ya    | —                                              |
| Jumlah jamaah             | angka             | Ya    | 1–50                                           |
| Rencana pembayaran        | radio             | Ya    | Tunai / Cicilan                                |
| Catatan                   | textarea          | Tidak | maks 500 karakter                              |
| Persetujuan privasi       | checkbox          | Ya    | harus dicentang                                |

**Kriteria penerimaan:**

- Maksimal 2 langkah (step) agar tidak terasa panjang di mobile.
- Validasi inline saat blur, bukan hanya saat submit.
- Proteksi spam: honeypot + rate limit + (opsional) Cloudflare Turnstile.
- Setelah submit: redirect ke `/terima-kasih` yang menampilkan tombol "Lanjut chat WA sekarang" dan memicu event konversi.
- Data masuk ke: (a) email tim sales, (b) Google Sheet/CRM, (c) notifikasi WA internal.
- Pesan gagal kirim harus menawarkan jalur alternatif (tombol WA langsung), tidak boleh membuat pengunjung buntu.

---

## 8. Alur Pengguna Utama

**Alur A — Dari iklan TikTok ke chat (target: < 60 detik)**
Klik iklan → landing halaman paket → melihat harga + jarak hotel → geser ke simulasi cicilan → klik sticky CTA "Chat Sekarang" → WhatsApp terbuka dengan pesan terisi → sales membalas.

**Alur B — Riset organik**
Google "biaya umroh 2027" → artikel panduan → CTA di tengah artikel → daftar paket → filter bulan → detail paket → unduh brosur → form pendaftaran → halaman terima kasih → chat.

**Alur C — Pembanding**
Daftar paket → centang 3 paket → halaman banding → pilih satu → detail → chat.

**Alur D — Koordinator grup**
Beranda → Tentang (cek legalitas) → Paket → unduh brosur → Kontak → WA divisi grup.

---

## 9. Sistem Desain & Panduan Visual

### 9.1 Arah desain

Cerah, bersih, dan ramah — terasa seperti aplikasi modern, bukan brosur travel lama. Ornamen islami dipakai sangat hemat sebagai aksen (satu pola geometri tipis), bukan latar penuh. Foto manusia nyata mendominasi; hindari ilustrasi generik dan foto stok Ka'bah beresolusi rendah.

### 9.2 Warna (token)

| Token                                  | Nilai usulan                 | Penggunaan                 |
| -------------------------------------- | ---------------------------- | -------------------------- |
| `brand-primary`                        | #0A5CAF (hijau toska modern) | CTA utama, tautan, aksen   |
| `brand-primary-dark`                   | #07407C                      | Hover, teks di atas terang |
| `brand-accent`                         | #E8A00C (kuning emas hangat) | Badge promo, sorotan harga |
| `brand-ink`                            | #0B1B3D                      | Teks utama                 |
| `brand-muted`                          | #5A6B8C                      | Teks sekunder              |
| `brand-surface`                        | #FFFFFF                      | Latar kartu                |
| `brand-bg`                             | #F4F7FC                      | Latar halaman              |
| `brand-success` / `warning` / `danger` | #16A34A / #F59E0B / #DC2626  | Status, sisa seat, error   |

Kontras teks utama terhadap latar wajib ≥ 4,5:1. Warna aksen tidak boleh menjadi satu-satunya penanda informasi (mis. "sisa seat sedikit" harus disertai teks).

### 9.3 Tipografi

- Heading: **Plus Jakarta Sans** (bobot 600/700) — modern, lokal, ramah layar.
- Body: **Inter** atau Plus Jakarta Sans 400/500.
- Skala: 12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48 px. Ukuran body minimum 16px di mobile.
- Font dimuat lewat `next/font` dengan `display: swap`, subset latin, maksimal 2 keluarga font.

### 9.4 Spacing, radius, elevasi

- Skala spacing 4px (4, 8, 12, 16, 24, 32, 48, 64, 96).
- Radius: kartu 16px, tombol 12px, chip 999px.
- Bayangan halus dua tingkat saja (`shadow-sm`, `shadow-md`); hindari bayangan tebal.

### 9.5 Breakpoint

`sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`. Desain dimulai dari 360px.

### 9.6 Komponen inti yang harus dibangun

`Button` (primary/secondary/ghost/whatsapp) · `PackageCard` · `PriceTag` · `Badge` · `FilterBar` · `Accordion` · `Tabs` · `Carousel` · `VideoTestimonialCard` · `InstallmentCalculator` · `StickyMobileCTA` · `LeadForm` · `Breadcrumb` · `EmptyState` · `Skeleton` · `Toast` · `Modal` · `Lightbox`.

### 9.7 Gerak

Transisi 150–250ms, easing `ease-out`. Hormati `prefers-reduced-motion`. Tidak ada animasi yang menunda interaksi.

---

## 10. Persyaratan Teknis

### 10.1 Stack

- **Framework:** Next.js (App Router) + TypeScript strict mode
- **Styling:** Tailwind CSS + shadcn/ui sebagai basis komponen
- **Form:** React Hook Form + Zod
- **Ikon:** lucide-react
- **Animasi:** Framer Motion (hemat, hanya untuk transisi kecil)
- **CMS:** headless CMS (Sanity / Payload / Strapi) — keputusan final di tangan engineering; syaratnya: editor non-teknis bisa menambah paket tanpa deploy
- **Hosting:** Vercel (atau setara dengan dukungan ISR + edge cache)
- **Manajemen state:** state lokal + URL query; hindari state global kecuali untuk fitur banding paket

### 10.2 Strategi rendering

- Beranda, daftar paket, detail paket, artikel: **SSG + ISR** (revalidate 300 detik) demi SEO dan kecepatan.
- Filter dan kalkulator: client-side.
- Form: server action / API route.

### 10.3 Model konten — Paket Umroh

| Field               | Tipe          | Catatan                                                                  |
| ------------------- | ------------- | ------------------------------------------------------------------------ |
| `nama`              | string        | wajib                                                                    |
| `slug`              | string        | unik, SEO-friendly                                                       |
| `kategori`          | enum          | hemat/reguler/plus-turki/plus-dubai/ramadhan/vip                         |
| `hargaMulai`        | number        | harga quad, per orang                                                    |
| `hargaPerKamar`     | object        | `{ quad, triple, double }`                                               |
| `mataUang`          | enum          | IDR (default)                                                            |
| `durasiHari`        | number        |                                                                          |
| `keberangkatan`     | array         | `{ tanggal, kuota, sisaSeat, status }`                                   |
| `kotaKeberangkatan` | array         |                                                                          |
| `maskapai`          | object        | `{ nama, logo, transit: boolean }`                                       |
| `hotelMakkah`       | object        | `{ nama, bintang, jarakMeter, foto }`                                    |
| `hotelMadinah`      | object        | idem                                                                     |
| `pembimbing`        | ref           | relasi ke koleksi Pembimbing                                             |
| `itinerary`         | array         | `{ hari, judul, deskripsi }`                                             |
| `termasuk`          | array<string> |                                                                          |
| `tidakTermasuk`     | array<string> |                                                                          |
| `syaratDokumen`     | array<string> |                                                                          |
| `dpMinimum`         | number        |                                                                          |
| `tenorCicilan`      | array<number> | mis. [3,6,9,12]                                                          |
| `badge`             | enum?         | promo/best-seller/hampir-penuh                                           |
| `galeri`            | array<image>  |                                                                          |
| `brosurPdf`         | file          |                                                                          |
| `seo`               | object        | `{ title, description, ogImage }`                                        |
| `aktif`             | boolean       | paket nonaktif tetap dapat diakses via URL dengan label "tidak tersedia" |

Koleksi lain: `Artikel`, `Testimoni`, `Pembimbing`, `FAQ`, `Galeri`, `PengaturanSitus` (nomor WA, jam operasional, banner pengumuman).

### 10.4 Integrasi

- **WhatsApp:** deep link `https://wa.me/6285135720948?text=<encoded>` dengan pesan kontekstual + parameter sumber.
- **GA4 + Google Tag Manager**
- **Meta Pixel** (Conversions API bila memungkinkan)
- **TikTok Pixel**
- **Instagram/TikTok feed** — melalui endpoint cache sisi server, bukan panggilan langsung dari browser, agar tidak memperlambat halaman.
- **Google Maps** — statis/lazy, dimuat setelah klik.
- **Notifikasi lead** — email + webhook ke Google Sheet/CRM.

### 10.5 Struktur repositori (usulan)

```
app/            route dan layout
components/     ui/ (primitif), sections/ (blok halaman)
lib/            utils, wa-link, analytics, cms client
content/        schema CMS
public/         aset statis
styles/         token tailwind
```

---

## 11. SEO

- Satu URL kanonik per paket; tanpa duplikat parameter di sitemap.
- Metadata dinamis per halaman (title ≤ 60 karakter, description ≤ 155).
- `sitemap.xml` dan `robots.txt` otomatis.
- Structured data: `TravelAgency` (global), `Product`+`Offer` (paket), `Article` (blog), `FAQPage`, `BreadcrumbList`, `VideoObject` (testimoni).
- Open Graph + Twitter Card per halaman, dengan OG image dinamis untuk paket.
- Heading hierarkis benar (satu `h1` per halaman).
- `alt` deskriptif pada seluruh gambar konten.
- Target kata kunci awal: "paket umroh [kota]", "biaya umroh [tahun]", "umroh cicilan", "umroh ramadhan [tahun]", "travel umroh resmi".

---

## 12. Performa

| Metrik                     | Target (mobile, p75) |
| -------------------------- | -------------------- |
| LCP                        | ≤ 2,5 s              |
| INP                        | ≤ 200 ms             |
| CLS                        | ≤ 0,1                |
| Lighthouse Performance     | ≥ 90                 |
| Ukuran JS awal per halaman | ≤ 180 KB gzip        |
| Bobot halaman beranda      | ≤ 1,2 MB             |

**Aturan wajib:**

- Semua gambar lewat `next/image`, format AVIF/WebP, `sizes` eksplisit, dimensi ditetapkan untuk mencegah pergeseran layout.
- Video testimoni tidak di-embed langsung — gunakan poster + pemuatan saat diklik.
- Font maksimal 2 keluarga, `display: swap`, preload font heading.
- Skrip pihak ketiga dimuat dengan strategi `afterInteractive` atau lebih lambat.
- Lighthouse CI berjalan di setiap pull request; regresi > 5 poin memblokir merge.

---

## 13. Aksesibilitas

Target **WCAG 2.1 level AA**.

- Seluruh fungsi dapat dioperasikan dengan keyboard; fokus terlihat jelas.
- Kontras ≥ 4,5:1 (teks) dan ≥ 3:1 (komponen UI).
- Label pada setiap input; pesan error terhubung via `aria-describedby`.
- Area sentuh minimal 44×44 px.
- Struktur landmark (`header`, `nav`, `main`, `footer`) dan skip link.
- Video testimoni disertai teks (caption) atau transkrip ringkas.
- Menghormati `prefers-reduced-motion`.

---

## 14. Analytics & Event Tracking

| Event               | Pemicu                        | Parameter                                     |
| ------------------- | ----------------------------- | --------------------------------------------- |
| `view_package`      | Buka halaman detail paket     | `package_slug`, `price`, `category`           |
| `wa_click`          | Klik tombol WhatsApp mana pun | `source_page`, `package_slug`, `cta_position` |
| `lead_submit`       | Form pendaftaran terkirim     | `package_slug`, `budget_plan`, `pax`          |
| `brochure_download` | Unduh brosur PDF              | `package_slug`                                |
| `calculator_use`    | Simulasi cicilan dijalankan   | `price`, `dp`, `tenor`                        |
| `filter_apply`      | Filter paket diterapkan       | `filters`                                     |
| `compare_open`      | Halaman banding dibuka        | `packages[]`                                  |
| `video_play`        | Video testimoni diputar       | `video_id`                                    |
| `scroll_depth`      | 25/50/75/100%                 | `page`                                        |

Semua tautan iklan wajib membawa UTM; parameter UTM ikut terbawa ke pesan WhatsApp agar sales tahu asal lead.

---

## 15. Keamanan, Privasi & Kepatuhan

- HTTPS wajib, HSTS aktif.
- Rate limiting pada endpoint form; honeypot + Turnstile untuk anti-spam.
- Data lead disimpan minimal seperlunya; kebijakan privasi menjelaskan tujuan penggunaan dan cara penghapusan data (selaras UU PDP).
- Checkbox persetujuan tidak boleh tercentang secara default.
- Cookie banner untuk skrip pemasaran, dengan opsi menolak.
- Kredensial CMS dan API disimpan sebagai environment variable, tidak pernah di klien.
- Nomor SK PPIU yang ditampilkan wajib akurat dan diverifikasi tim legal sebelum publikasi.

---

## 16. Dukungan Browser & Perangkat

- Chrome, Safari, Firefox, Edge — dua versi terakhir.
- Safari iOS 15+ dan Chrome Android 10+.
- **In-app browser TikTok, Instagram, dan Facebook wajib diuji** — ini kanal traffic utama dan sering menjadi sumber bug tak terduga.
- Lebar layar dari 360px hingga 1920px.

---

## 17. Rencana Rilis

| Fase                   | Cakupan                                                                     | Estimasi      |
| ---------------------- | --------------------------------------------------------------------------- | ------------- |
| **F0 — Fondasi**       | Setup proyek, design system, komponen inti, CMS schema                      | Minggu 1–2    |
| **F1 — Inti konversi** | Beranda, daftar paket, detail paket, form lead, WA integration, analytics   | Minggu 3–5    |
| **F2 — Pendukung**     | Simulasi cicilan, banding paket, tentang, galeri, testimoni, FAQ, kontak    | Minggu 6–7    |
| **F3 — Konten & SEO**  | Blog, structured data, sitemap, optimasi performa, aksesibilitas            | Minggu 8–9    |
| **F4 — QA & Rilis**    | Uji lintas perangkat, uji in-app browser, UAT tim sales, perbaikan, go-live | Minggu 10     |
| **Pasca-rilis**        | Monitoring KPI, A/B test headline & posisi CTA                              | Berkelanjutan |

---

## 18. Definisi Selesai (Definition of Done)

Sebuah halaman dinyatakan selesai bila:

1. Sesuai desain di breakpoint 360, 768, dan 1280 px.
2. Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.
3. Tidak ada error konsol dan tidak ada permintaan jaringan yang gagal.
4. Seluruh event analytics terverifikasi di GA4 DebugView.
5. Konten diambil dari CMS, bukan hardcode.
6. Kondisi loading, kosong, dan error tersedia.
7. Diuji di Safari iOS dan in-app browser Instagram/TikTok.
8. Metadata dan structured data lolos Rich Results Test.
9. Copy sudah disetujui tim marketing dan legal (khusus klaim harga & legalitas).

---

## 19. Risiko & Mitigasi

| Risiko                                    | Dampak                           | Mitigasi                                                                     |
| ----------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| Data paket telat/tidak akurat             | Lead kecewa, kredibilitas turun  | Alur approval di CMS + label "diperbarui pada" di halaman paket              |
| Harga berubah karena kurs/maskapai        | Perselisihan dengan calon jamaah | Cantumkan disclaimer "harga dapat berubah sewaktu-waktu, dikunci setelah DP" |
| Respons WA lambat                         | Lead hangus                      | Auto-reply + SLA balas ≤ 15 menit pada jam kerja, tampilkan jam operasional  |
| Traffic iklan tinggi tapi konversi rendah | Boros biaya iklan                | A/B test hero & CTA, heatmap, analisis funnel bulanan                        |
| Foto/testimoni tanpa izin jamaah          | Masalah privasi                  | Formulir izin publikasi sebelum konten tayang                                |
| Ketergantungan pada satu nomor WA         | Titik kegagalan tunggal          | Nomor cadangan + form lead sebagai jalur alternatif                          |
| Feed sosial gagal dimuat                  | Halaman rusak                    | Cache sisi server + fallback statis                                          |

---

## 20. Pertanyaan Terbuka

1. Berapa nomor WhatsApp yang akan dipakai, dan apakah dibagi per divisi (umum, grup, cicilan)? jawab: +6285135720948
2. Apakah skema cicilan dikelola internal Luhas atau bermitra dengan lembaga pembiayaan syariah? Ini menentukan disclaimer legal di kalkulator. jawab :belum ada keterangan lebih lanjut
3. Apakah domain final `luhas.co.id`? Perlu dipastikan sebelum setup SEO. jawab: untuk sementara ini gunakan itu terlebih dahulu.
4. Siapa yang akan mengelola CMS sehari-hari, dan berapa banyak akun editor yang dibutuhkan? jawab: 2 akun
5. Apakah ada identitas visual (logo, warna) yang sudah baku, atau palet di dokumen ini menjadi acuan awal? iya menjadi acuan.
6. Berapa banyak paket aktif pada saat rilis? Ini memengaruhi keputusan paginasi. Jawab: 7 paket
7. Apakah rilis 2 akan menambahkan booking online? Jika ya, model konten paket perlu disiapkan sejak sekarang agar tidak migrasi ulang. jawab: tidak, karna untuk memberikan kepercayaan dan komunikasi lebih intens.

---

## Lampiran A — Glosarium

| Istilah                | Arti                                                            |
| ---------------------- | --------------------------------------------------------------- |
| PPIU                   | Penyelenggara Perjalanan Ibadah Umrah — izin resmi dari Kemenag |
| Muthawif               | Pembimbing yang mendampingi jamaah selama ibadah                |
| Quad / Triple / Double | Jumlah orang per kamar hotel (4/3/2) — penentu harga            |
| Manasik                | Pelatihan tata cara ibadah sebelum keberangkatan                |
| Sisa seat              | Kuota keberangkatan yang masih tersedia                         |
| Landing page           | Halaman tujuan iklan                                            |
| LCP / INP / CLS        | Metrik Core Web Vitals dari Google                              |

## Lampiran B — Contoh Copy

**Headline hero:** "Umroh Tanpa Drama Biaya. Mulai Rp 27 juta, Bisa Dicicil."
**Subheadline:** "Harga lengkap dari awal. Hotel dekat, pendamping ramah, dan tim yang membalas chat-mu — bukan robot."
**CTA utama:** "Lihat Paket & Harga"
**CTA sekunder:** "Tanya Langsung via WhatsApp"
**Trust line:** "Berizin resmi Kemenag · SK PPIU No. XXXX · 1.200+ jamaah diberangkatkan"
