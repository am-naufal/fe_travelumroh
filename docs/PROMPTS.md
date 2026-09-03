# Urutan prompt untuk Claude Code

Jalankan berurutan. Setiap tahap diselesaikan dan diperiksa dulu sebelum lanjut —
minta Claude membangun seluruh website dalam satu prompt hampir selalu
menghasilkan kode yang tidak konsisten dengan mockup.

---

### 0. Setelah membuka folder di VS Code

```
/init
```

Claude akan membaca `CLAUDE.md` yang sudah ada dan menyusun pemahaman proyek.
Kalau ia mengusulkan mengganti isi `CLAUDE.md`, tolak — berkas itu sengaja ditulis.

---

### 1. Fondasi

```
Baca CLAUDE.md dan docs/PRD.md bab 9 sampai 12.

Siapkan proyek Next.js App Router + TypeScript strict + Tailwind.
Pasang token warna dari styles/tokens.css dan tailwind.tokens.ts ke dalam
konfigurasi Tailwind. Muat Plus Jakarta Sans lewat next/font.

Lalu buat helper di lib/format.ts: formatRupiah, formatRupiahRingkas,
formatTanggal, formatRentangTanggal — semuanya memakai locale id-ID dengan
timeZone Asia/Jakarta ditulis eksplisit. Tulis unit test untuk keempatnya.

Belum usah membuat halaman apa pun.
```

---

### 2. Komponen dasar

```
Baca docs/design/BerandaMobile.html dan docs/design/BerandaDesktop.html.

Bangun komponen berikut di components/ui, ambil nilai styling PERSIS dari
markup mockup (padding, radius, ukuran font, tinggi baris) — jangan dibulatkan:
Button (varian primary, dark, gold, ghost, whatsapp), Badge, Chip, Card,
PhotoPlaceholder, SectionHead, StarMark.

Buat halaman /dev/komponen yang menampilkan semua varian berdampingan supaya
saya bisa membandingkannya dengan mockup.
```

---

### 3. Kartu paket + model data

```
Baca docs/PRD.md bab 11.3 (model konten paket).

Buat tipe TypeScript untuk Paket, lalu komponen PackageCard sesuai
docs/design/PaketMobile.html. Sediakan data contoh 7 paket di
lib/sample-data.ts — tandai jelas sebagai data sementara sampai CMS siap.

Nilai yang di mockup ditulis dalam [KURUNG SIKU] tetap sebagai placeholder.
```

---

### 4. Halaman, satu per satu

Ulangi untuk tiap layar. Jangan digabung.

```
Bangun halaman /paket sesuai docs/design/PaketMobile.html dan
docs/design/PaketDesktop.html.

Filter hanya tiga: kategori, bulan keberangkatan, rentang harga — state-nya
tercermin di URL query supaya bisa di-bookmark. Tanpa paginasi (7 paket).
Sertakan kondisi loading (skeleton) dan kondisi kosong.
```

Lanjutkan dengan urutan: `/paket/[slug]` → `/simulasi-pembayaran` → `/daftar` →
`/terima-kasih` → beranda terakhir (beranda memakai potongan dari semua halaman
lain, jadi paling efisien dibangun belakangan).

---

### 5. Formulir dan validasi

```
Bangun formulir di /daftar sesuai docs/design/DaftarMobile.html dan
DaftarDesktop.html, memakai React Hook Form + Zod.

SETIAP pesan validasi Zod wajib berbahasa Indonesia — tidak boleh ada satu pun
pesan bawaan berbahasa Inggris yang bisa muncul. Nomor WhatsApp dinormalisasi
ke format 62xxx. Setelah kirim, arahkan ke /terima-kasih.

Kalau pengiriman gagal, tampilkan jalur alternatif berupa tombol WhatsApp —
pengunjung tidak boleh buntu.
```

---

### 6. Pemeriksaan menyeluruh

```
Periksa seluruh kode terhadap CLAUDE.md dan laporkan pelanggaran, jangan
langsung diperbaiki:

1. Teks berbahasa Inggris yang terlihat pengunjung, termasuk pesan validasi
   bawaan pustaka, placeholder, dan aria-label.
2. Pemakaian kata "cicilan", "kredit", "pembiayaan", "bunga", "tenor".
3. Warna di luar token, terutama emas yang dipakai sebagai teks di atas putih.
4. Pemformatan tanggal atau angka yang tidak lewat lib/format.ts.
5. Area sentuh di bawah 44px.
6. Nilai [KURUNG SIKU] yang terlanjur diisi dengan data karangan.
```

---

### Kebiasaan yang membantu

- Setiap kali Claude menyimpang dari mockup, tunjuk berkasnya:
  *"Bandingkan dengan docs/design/DetailDesktop.html baris sekian."*
  Ia jauh lebih akurat membaca markup daripada menerima deskripsi.
- Kalau sebuah aturan terus dilanggar, tambahkan ke `CLAUDE.md`, jangan
  diulang-ulang di chat.
- Gunakan git commit per tahap. Kalau satu tahap melenceng, `git reset` lebih
  cepat daripada menegosiasikan perbaikan.
