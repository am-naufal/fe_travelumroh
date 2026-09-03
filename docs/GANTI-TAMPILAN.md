# Ganti tampilan saja — CMS dan data lama tidak disentuh

Untuk kasus: **proyek Next.js yang sudah jalan, hanya lapisan tampilan yang
diganti mengikuti mockup baru.** CMS, model data, route, dan integrasi tetap
seperti sekarang.

Ini pendekatan dengan rasio hasil-terhadap-risiko paling baik. Peringkat Google
aman karena URL tidak berubah. Analytics aman karena event tidak disentuh.
Kalau ada yang rusak, yang rusak hanya tampilan — bukan data.

---

## Garis batas: apa yang boleh dan tidak boleh disentuh

Tulis ini di `CLAUDE.md` Anda supaya berlaku di setiap sesi.

**Boleh diubah:**

- `components/**` — seluruh komponen tampilan
- `app/**/page.tsx` dan `layout.tsx` — hanya bagian JSX/markup
- `styles/**`, `tailwind.config.*` — token dan tema
- `app/globals.css`

**Tidak boleh disentuh tanpa izin:**

- Klien CMS, query, dan tipe data
- Struktur route dan nama berkas di `app/` (URL tidak berubah)
- `next.config.*`, terutama `redirects()` dan `images`
- Kode analytics, pixel, dan event tracking
- Server action, API route, form handler
- `sitemap.ts`, `robots.ts`, dan objek `metadata` di setiap halaman

Kalimat yang efektif untuk Claude Code:

```
Ganti hanya lapisan tampilan. Jangan mengubah query CMS, tipe data, struktur
route, next.config, kode analytics, atau metadata SEO. Kalau sebuah komponen
baru butuh data yang belum ada, JANGAN mengubah query — laporkan ke saya.
```

Kalimat terakhir itu yang paling penting. Tanpa itu, Claude akan diam-diam
menambah field ke query CMS supaya komponennya jalan, dan Anda baru sadar
setelah tiga halaman terlanjur bergantung pada field yang tidak ada di CMS.

---

## Masalah utama: desain baru menampilkan data yang mungkin belum Anda punya

Ini inti dari pekerjaan ini, dan satu-satunya bagian yang benar-benar perlu
Anda putuskan sendiri.

Mockup dirancang dari model konten di PRD bab 11.3, yang kemungkinan lebih kaya
daripada CMS Anda sekarang. Tabel berikut memisahkan mana yang wajib ada dan
mana yang bisa disembunyikan tanpa merusak halaman.

| Data di mockup | Status | Kalau tidak ada di CMS |
|---|---|---|
| Nama, slug, harga mulai, durasi | **Wajib** | Halaman tidak bisa dibangun |
| Tanggal keberangkatan | **Wajib** | Kartu paket kehilangan alasan utamanya |
| Bintang hotel + jarak dalam meter | **Sangat dianjurkan** | Ganti jadi nama hotel saja. Ini pembeda utama Luhas di mockup — kalau hilang, kartu paket jadi generik |
| Fasilitas termasuk / tidak termasuk | **Sangat dianjurkan** | Sembunyikan blok dua kolom di halaman detail |
| Harga per tipe kamar (quad/triple/double) | Opsional | Tampilkan satu harga saja, hapus tabel |
| Sisa seat + kuota | Opsional | Sembunyikan badge urgensi |
| Badge (promo / paling diminati) | Opsional | Sembunyikan |
| Itinerary harian | Opsional | Sembunyikan accordion |
| Galeri foto | Opsional | Pakai satu foto utama |
| Brosur PDF | Opsional | Sembunyikan tombol unduh |
| Uang muka + jumlah kali bayar | Opsional | Kalkulator pakai nilai tetap dari konstanta, bukan dari CMS |

**Aturannya: komponen menyembunyikan diri saat datanya tidak ada — jangan
menampilkan "-", "N/A", atau angka karangan.** Halaman yang lebih pendek jauh
lebih baik daripada halaman yang menampilkan data palsu, apalagi untuk harga.

---

## Lapisan adapter: cara menyambung tanpa mengubah CMS

Jangan memaksa komponen baru membaca bentuk data lama, dan jangan mengubah
bentuk data lama agar cocok dengan komponen. Sisipkan satu berkas penerjemah
di antaranya.

```
Buat lib/adapters/paket.ts.

Isinya satu fungsi: toPaketView(dataDariCmsLama) yang mengembalikan bentuk
yang dibutuhkan komponen tampilan baru. Setiap field yang tidak ada di CMS
lama dikembalikan sebagai undefined — jangan diisi nilai default karangan.

Komponen tampilan hanya menerima hasil fungsi ini, tidak pernah menyentuh
tipe CMS secara langsung. Setiap blok yang datanya undefined tidak dirender
sama sekali.

Tulis unit test yang memastikan: data CMS tanpa sisaSeat, tanpa itinerary,
dan tanpa hargaPerKamar tetap menghasilkan halaman yang valid.
```

Manfaatnya muncul nanti: kalau suatu saat CMS ditambah field, Anda cukup
mengubah satu berkas ini, tanpa menyentuh komponen mana pun.

---

## Urutan pengerjaan

Kerjakan dari yang paling kecil risikonya ke yang paling besar.

**1. Token dan tipografi.** Pasang `styles/tokens.css` dan `tailwind.tokens.ts`,
muat Plus Jakarta Sans. Belum mengganti komponen apa pun. Situs akan terlihat
aneh sebentar — itu wajar, warna lama masih dipakai komponen lama.

**2. Komponen dasar.** Tombol, badge, kartu, chip, input — sesuai
`docs/design/`. Ganti definisinya, bukan pemakaiannya. Kalau nama prop-nya
dipertahankan, seluruh situs ikut berubah tanpa menyentuh halaman.

**3. Header dan footer.** Muncul di semua halaman, jadi hasilnya langsung
terasa menyeluruh.

**4. Kartu paket.** Komponen yang paling menentukan kesan situs, dan dipakai di
beranda maupun daftar paket sekaligus.

**5. Halaman, satu per satu.** Urutan yang saya sarankan: daftar paket → detail
paket → formulir → simulasi → beranda terakhir. Beranda memakai potongan dari
semua halaman lain, jadi paling murah dikerjakan belakangan.

Commit per langkah. Kalau satu langkah melenceng, `git reset` lebih cepat
daripada menegosiasikan perbaikan.

---

## Prompt per halaman

```
Ganti tampilan app/paket/page.tsx mengikuti docs/design/PaketMobile.html dan
docs/design/PaketDesktop.html.

Batasan:
- Query CMS dan tipe data TIDAK berubah. Pakai lib/adapters/paket.ts.
- URL dan nama route TIDAK berubah.
- Objek metadata dan structured data yang sudah ada dipertahankan apa adanya.
- Event analytics yang sudah ada tetap menembak dari elemen yang setara.
- Blok yang datanya tidak tersedia disembunyikan, bukan diisi placeholder.

Ambil nilai styling PERSIS dari markup mockup — padding, radius, ukuran font,
tinggi baris. Jangan dibulatkan ke kelipatan 4 atau 8 px.

Setelah selesai, laporkan blok mana saja yang Anda sembunyikan dan karena field
apa.
```

Laporan di baris terakhir itu yang akan menjadi daftar belanja Anda ke CMS
nanti — kalau memang mau ditambah.

---

## Pemeriksaan setelah semua halaman selesai

```
Bandingkan dengan kondisi sebelum redesign (git diff terhadap tag
sebelum-redesign) dan laporkan, jangan diperbaiki:

1. Query CMS atau tipe data yang berubah — seharusnya tidak ada satu pun.
2. Route atau nama berkas di app/ yang berubah — seharusnya tidak ada.
3. Objek metadata atau structured data yang hilang atau berubah isinya.
4. Event analytics yang hilang atau berpindah elemen.
5. Teks Inggris yang terlihat pengunjung, termasuk pesan validasi bawaan.
6. Warna di luar token, terutama emas dipakai sebagai teks di atas putih.
```

---

## Checklist sebelum digabung ke main

- [ ] `git diff --stat` terhadap tag lama: perubahan hanya di `components/`,
      `styles/`, dan bagian JSX halaman
- [ ] Tidak ada perubahan di klien CMS, `next.config`, `sitemap`, `robots`
- [ ] Semua URL lama masih membuka halaman yang sama
- [ ] Event GA4 masih menembak — cek di DebugView, bukan cuma di kode
- [ ] Tombol WhatsApp diuji di ponsel asli, pesan prefilled benar
- [ ] Formulir benar-benar terkirim ke tujuan yang sama seperti sebelumnya
- [ ] Diuji di Safari iOS dan in-app browser Instagram/TikTok
- [ ] Lighthouse mobile tidak turun dibanding sebelum redesign
- [ ] Daftar blok yang disembunyikan sudah Anda baca dan setujui

---

## Kalau nanti ingin melengkapi CMS

Setelah tampilan baru jalan, Anda punya daftar konkret field yang benar-benar
dibutuhkan — bukan daftar keinginan. Tambahkan bertahap, sesuai urutan dampak:

1. Jarak hotel dalam meter dan bintangnya — ini yang paling terasa di kartu paket
2. Fasilitas termasuk / tidak termasuk
3. Sisa seat
4. Harga per tipe kamar

Setiap kali satu field ditambah, yang perlu diubah hanya
`lib/adapters/paket.ts` — komponen tampilan tidak perlu disentuh lagi.
