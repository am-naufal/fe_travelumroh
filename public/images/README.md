# Aset gambar & video

PRD §5.3 mensyaratkan **foto keberangkatan asli minimal 60 foto dan 5 video
testimoni** (bukan stok). Aset tersebut belum tersedia di lingkungan ini.

## Kondisi sekarang

Komponen `<Figure>` (`components/ui/media.tsx`) menampilkan **placeholder
berdimensi tetap** dengan gradien deterministik dan `alt` deskriptif. Tidak ada
permintaan gambar yang dibuat, sehingga tidak ada layout shift dan bobot halaman
tetap ringan selama pengembangan.

## Cara mengganti dengan foto asli

1. Letakkan file di `public/images/...` mengikuti path yang tertulis di
   `content/` (mis. `content/packages/*.json` → `galeri[].src`).
2. Gunakan rasio dan dimensi yang sama dengan yang tertera pada field `width`/`height`.
3. Format sumber bebas (JPG/PNG); Next.js akan mengonversi ke AVIF/WebP.
4. Set environment `NEXT_PUBLIC_USE_REAL_IMAGES=true`.
5. Jalankan `npm run build` dan cek tidak ada gambar 404.

## Daftar path yang dibutuhkan

- `hero-jamaah.jpg` (1200×900)
- `paket/*.jpg` — galeri tiap paket (1600×1000)
- `panduan/*.jpg` — gambar utama artikel (1200×675)
- `testimoni/*.jpg` (800×800) & `testimoni/*-poster.jpg` (720×1280, vertikal)
- `pembimbing/*.jpg` (800×800)
- `galeri/*.jpg` — album keberangkatan (1600×1067)
- `kantor/*.jpg` — foto kantor asli untuk halaman Tentang (PRD §7.6)

Video testimoni: `public/video/testimoni-*.mp4` (rasio 9:16, ≤ 15 MB, dengan
poster di `public/images/testimoni/*-poster.jpg`).
