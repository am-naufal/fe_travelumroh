# Migrasi dari proyek Next.js yang sudah ada

Dokumen ini untuk kasus: **sudah ada website Luhas berbasis Next.js/React, dan
akan dibangun ulang mengikuti mockup baru.**

---

## Baca ini dulu sebelum menghapus apa pun

Anda memilih bangun ulang total. Untuk proyek yang sudah Next.js, itu keputusan
yang perlu disadari konsekuensinya — bukan karena salah, tapi karena yang mahal
di sebuah website biasanya **bukan tampilannya**.

Yang biasanya sudah benar dan mahal dibuat ulang:

- integrasi CMS dan bentuk datanya
- struktur URL yang sudah diindeks Google
- pipeline gambar, konfigurasi domain, environment variable
- event analytics dan pixel yang sudah terpasang benar
- redirect lama, `robots.txt`, `sitemap.xml`
- form handler, endpoint email/webhook, proteksi spam

Bangun ulang total **tetap pilihan yang tepat** bila: kode lama tidak punya tes
dan tidak bisa dipahami, memakai Pages Router yang ingin ditinggalkan, styling-nya
berantakan (CSS global bertabrakan, banyak `!important`), atau dependensinya
sudah usang jauh. Kalau alasan Anda salah satu dari itu, lanjutkan — tapi
lakukan **inventarisasi dulu**, jangan mulai dari `rm -rf`.

Kalau ternyata setelah inventarisasi kode lamanya masih sehat, pertimbangkan
ulang: mengganti lapisan tampilan di proyek Next.js yang rapi biasanya memakan
sepertiga waktu dibanding membangun ulang, dan tidak mempertaruhkan peringkat
Google.

---

## Tahap 0 — Inventarisasi (jangan dilewati)

Buka proyek **lama** di VS Code, jalankan Claude Code, lalu:

```
Petakan proyek ini dan tulis hasilnya ke docs/INVENTARIS.md. Jangan mengubah
kode apa pun.

Yang saya butuhkan:
1. Daftar semua route beserta jenis rendering-nya (SSG/SSR/ISR/client).
2. Semua sumber data: CMS, API, database — beserta berkas klien dan skema/tipe.
3. Semua environment variable yang dipakai dan untuk apa.
4. Semua integrasi pihak ketiga: analytics, pixel, form handler, email, webhook.
5. Redirect dan rewrite yang sudah ada di next.config.
6. Berkas utilitas yang tidak berkaitan dengan tampilan (format, validasi,
   helper) — kandidat untuk dipertahankan.
7. Bagian kode yang menurut Anda paling berisiko hilang saat redesign.
```

Setelah itu, kumpulkan **daftar URL yang punya trafik** dari Google Search
Console (Performance → Pages, ekspor 12 bulan terakhir) dan dari `sitemap.xml`
lama. Simpan sebagai `docs/url-lama.csv`. Ini bahan wajib untuk tahap 4.

---

## Tahap 1 — Kerangka kerja yang aman

Jangan menimpa repo lama. Pola yang paling tidak berisiko:

```bash
git checkout -b redesign-2027
git tag sebelum-redesign        # titik balik kalau perlu mundur
```

Lalu salin isi paket handoff ini ke akar repo. Kalau sudah ada `CLAUDE.md`,
**gabungkan** — jangan ditimpa; aturan lama mungkin masih berlaku.

Situs lama tetap jalan dari branch `main` sampai penggantian dilakukan.

---

## Tahap 2 — Pindahkan yang layak dipertahankan

Sebelum menulis UI baru, angkat dulu lapisan non-tampilan dari kode lama.

```
Baca docs/INVENTARIS.md.

Pindahkan ke struktur baru HANYA lapisan non-tampilan: klien CMS, tipe data,
helper non-UI, konfigurasi environment, dan konfigurasi analytics. Jangan bawa
satu pun komponen tampilan atau CSS lama — tampilan akan dibangun ulang dari
docs/design/.

Untuk setiap berkas yang dipindahkan, sesuaikan dengan aturan di CLAUDE.md:
- pemformatan angka/tanggal harus lewat lib/format.ts dengan timeZone eksplisit
- pesan validasi berbahasa Indonesia
Laporkan berkas mana yang Anda putuskan TIDAK dibawa, beserta alasannya.
```

Titik yang sering terlewat: **model konten CMS lama kemungkinan tidak sama
dengan model di PRD bab 11.3.** Minta Claude membandingkan keduanya secara
eksplisit dan membuat daftar selisih field, sebelum ada kode yang ditulis.

```
Bandingkan skema paket di CMS lama dengan model konten di docs/PRD.md bab 11.3.
Buat tabel: field lama → field baru → perlu migrasi data / field baru / field
yang ditinggalkan. Tulis ke docs/SELISIH-CMS.md.
```

---

## Tahap 3 — Bangun tampilan baru

Ikuti `docs/PROMPTS.md` dari tahap 1, dengan satu tambahan di setiap prompt:

> Data diambil dari klien CMS yang sudah dipindahkan, bukan dari sample-data.

---

## Tahap 4 — Peta redirect (bagian yang paling sering dilupakan)

Kalau struktur URL berubah — misalnya dari `/paket-umroh/hemat` menjadi
`/paket/umroh-hemat-9-hari` — dan tidak ada redirect, peringkat Google yang
sudah terbentuk hilang, dan hilangnya tidak langsung terlihat. Biasanya baru
terasa dua sampai tiga bulan kemudian, saat trafik organik sudah turun.

```
Baca docs/url-lama.csv dan struktur route baru.

Buat peta redirect 301 dari setiap URL lama ke padanan terdekatnya di struktur
baru. Tulis sebagai redirects() di next.config.

Aturan:
- Satu URL lama → satu URL baru. Jangan mengarahkan banyak URL ke beranda;
  itu dibaca Google sebagai soft 404.
- URL yang benar-benar tidak punya padanan, tandai di komentar supaya saya
  putuskan sendiri.
- Jangan membuat rantai redirect (A→B→C). Semua langsung ke tujuan akhir.

Lalu tulis skrip pengujian yang memanggil setiap URL lama dan memastikan
statusnya 301 ke tujuan yang benar.
```

Pertahankan juga URL `sitemap.xml` dan `robots.txt` di lokasi yang sama.

---

## Tahap 5 — Uji paritas sebelum mengganti

Sebelum branch redesign menggantikan `main`:

```
Bandingkan situs baru dengan docs/INVENTARIS.md dan laporkan yang hilang:

1. Route lama yang tidak punya padanan dan tidak punya redirect.
2. Event analytics yang ada di kode lama tapi belum ada di kode baru.
3. Environment variable yang dipakai kode lama tapi belum terpakai.
4. Integrasi pihak ketiga yang belum terpasang kembali.
5. Metadata dan structured data yang ada di halaman lama tapi hilang di baru.

Laporkan saja, jangan diperbaiki dulu.
```

---

## Checklist sebelum go-live

- [ ] Semua redirect 301 diuji dan tidak ada rantai
- [ ] `sitemap.xml` dan `robots.txt` di URL yang sama, isi diperbarui
- [ ] Semua event GA4 terverifikasi di DebugView, bukan sekadar ada di kode
- [ ] Meta Pixel dan TikTok Pixel menembak dan terlihat di Events Manager
- [ ] Nomor WhatsApp diambil dari CMS dan pesan prefilled benar di ponsel asli
- [ ] Formulir terkirim ke email, spreadsheet/CRM, dan notifikasi internal
- [ ] Diuji di Safari iOS dan in-app browser Instagram/TikTok
- [ ] Lighthouse mobile ≥ 90 di beranda, daftar paket, dan detail paket
- [ ] Halaman 404 dan 500 berbahasa Indonesia dan punya jalan keluar
- [ ] Tag `sebelum-redesign` masih ada, dan Anda tahu cara mundur ke sana
- [ ] Search Console: sitemap baru disubmit, pantau Coverage 2 minggu pertama

---

## Setelah go-live

Pantau selama dua minggu: trafik organik per halaman di Search Console,
jumlah `wa_click` dan `lead_submit` di GA4, dan error 404 di log. Penurunan
lead lebih dari 20% dibanding periode yang sama sebelumnya adalah sinyal ada
yang putus — biasanya tombol WhatsApp atau form handler, bukan desainnya.
