/**
 * Model konten — PRD §10.3.
 * Zod adalah kontrak: data seed di /content divalidasi terhadap schema ini
 * saat build/dev. Bila kelak pindah ke Sanity/Payload, schema CMS harus
 * menghasilkan bentuk yang sama.
 */
import { z } from "zod";

/* ── Primitif bersama ─────────────────────────────────────────────────── */

export const gambarSchema = z.object({
  src: z.string(),
  alt: z.string().min(3, "alt wajib deskriptif — PRD §11"),
  width: z.number().int().positive().default(1200),
  height: z.number().int().positive().default(800),
});
export type Gambar = z.infer<typeof gambarSchema>;

// Batas panjang meta (title ≤ 60, desc ≤ 155, PRD §11) ditegakkan saat
// membangun Metadata lewat `clampText` di lib/seo.ts, bukan di sini —
// editor CMS boleh menulis lebih panjang lalu dipotong rapi.
export const seoSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  ogImage: z.string().optional(),
});

/* ── Paket Umroh — PRD §10.3 ──────────────────────────────────────────── */

export const kategoriPaket = [
  "hemat",
  "reguler",
  "plus-turki",
  "plus-dubai",
  "ramadhan",
  "vip",
] as const;
export const kategoriPaketSchema = z.enum(kategoriPaket);
export type KategoriPaket = (typeof kategoriPaket)[number];

export const badgePaketSchema = z.enum(["promo", "best-seller", "hampir-penuh"]);

export const statusKeberangkatan = ["tersedia", "hampir-penuh", "tutup"] as const;

export const keberangkatanSchema = z.object({
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "format YYYY-MM-DD"),
  kuota: z.number().int().positive(),
  sisaSeat: z.number().int().nonnegative(),
  status: z.enum(statusKeberangkatan).default("tersedia"),
});
export type Keberangkatan = z.infer<typeof keberangkatanSchema>;

export const hotelSchema = z.object({
  nama: z.string(),
  bintang: z.number().int().min(1).max(5),
  jarakMeter: z.number().int().nonnegative(),
  foto: gambarSchema.optional(),
});

export const maskapaiSchema = z.object({
  nama: z.string(),
  logo: z.string().optional(),
  transit: z.boolean().default(false),
});

export const itineraryHariSchema = z.object({
  hari: z.number().int().positive(),
  judul: z.string(),
  deskripsi: z.string(),
});

export const paketSchema = z
  .object({
    nama: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug SEO-friendly"),
    kategori: kategoriPaketSchema,
    hargaMulai: z.number().int().positive(), // harga quad per orang
    hargaPerKamar: z.object({
      quad: z.number().int().positive(),
      triple: z.number().int().positive(),
      double: z.number().int().positive(),
    }),
    mataUang: z.literal("IDR").default("IDR"),
    durasiHari: z.number().int().positive(),
    keberangkatan: z.array(keberangkatanSchema).min(1),
    kotaKeberangkatan: z.array(z.string()).min(1),
    maskapai: maskapaiSchema,
    hotelMakkah: hotelSchema,
    hotelMadinah: hotelSchema,
    pembimbingSlug: z.string().optional(), // relasi ke koleksi Pembimbing
    itinerary: z.array(itineraryHariSchema).min(1),
    termasuk: z.array(z.string()).min(1),
    tidakTermasuk: z.array(z.string()).min(1),
    syaratDokumen: z.array(z.string()).min(1),
    dpMinimum: z.number().int().positive(),
    tenorCicilan: z.array(z.number().int().positive()).min(1).default([3, 6, 9, 12]),
    badge: badgePaketSchema.optional(),
    galeri: z.array(gambarSchema).min(1),
    brosurPdf: z.string().optional(),
    ringkasan: z.string().min(1), // deskripsi singkat untuk kartu & hero
    kebijakanPembayaran: z.string().min(1),
    seo: seoSchema,
    aktif: z.boolean().default(true),
    diperbaruiPada: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // PRD §19: label "diperbarui pada"
    unggulan: z.boolean().default(false), // tampil di beranda blok 3
  })
  .strict();
export type Paket = z.infer<typeof paketSchema>;

/* ── Pembimbing / Muthawif — PRD §7.6, §10.3 ─────────────────────────── */

export const pembimbingSchema = z
  .object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    nama: z.string(),
    gelar: z.string().optional(),
    peran: z.string(), // mis. "Pembimbing Ibadah", "Muthawif"
    bio: z.string(),
    foto: gambarSchema,
    pengalamanTahun: z.number().int().nonnegative(),
    sertifikasi: z.array(z.string()).default([]),
  })
  .strict();
export type Pembimbing = z.infer<typeof pembimbingSchema>;

/* ── Testimoni — PRD §7.7, §10.3 ─────────────────────────────────────── */

export const testimoniSchema = z
  .object({
    slug: z.string(),
    nama: z.string(),
    kota: z.string(),
    paketSlug: z.string().optional(),
    kutipan: z.string(),
    foto: gambarSchema.optional(),
    rating: z.number().int().min(1).max(5).default(5),
    tahun: z.number().int(),
    izinPublikasi: z.literal(true), // PRD §7.7, §19: wajib atas izin jamaah
    video: z
      .object({
        src: z.string(),
        poster: gambarSchema, // PRD §7.1 blok 6: poster image, lazy
        durasiDetik: z.number().int().positive().optional(),
        transkrip: z.string().optional(), // PRD §13: caption/transkrip
      })
      .optional(),
  })
  .strict();
export type Testimoni = z.infer<typeof testimoniSchema>;

/* ── FAQ — PRD §7.9, §10.3 ───────────────────────────────────────────── */

export const grupFaq = [
  "Biaya & Pembayaran",
  "Dokumen",
  "Keberangkatan",
  "Selama di Tanah Suci",
  "Kebijakan",
] as const;

export const faqItemSchema = z.object({
  pertanyaan: z.string(),
  jawaban: z.string(),
  grup: z.enum(grupFaq),
  unggulan: z.boolean().default(false), // 5 teratas untuk beranda (PRD §7.1 blok 10)
});
export type FaqItem = z.infer<typeof faqItemSchema>;

export const faqFileSchema = z.array(faqItemSchema).min(25, "PRD §7.9: minimal 25 pertanyaan");

/* ── Galeri — PRD §7.7, §10.3 ────────────────────────────────────────── */

export const albumGaleriSchema = z
  .object({
    slug: z.string(),
    judul: z.string(),
    keberangkatan: z.string(), // mis. "Umroh Reguler Maret 2027"
    tahun: z.number().int(),
    foto: z.array(gambarSchema).min(1),
  })
  .strict();
export type AlbumGaleri = z.infer<typeof albumGaleriSchema>;

/* ── Artikel / Panduan — PRD §7.8, §10.3 ─────────────────────────────── */

export const kategoriArtikel = [
  "Persiapan",
  "Biaya",
  "Ibadah",
  "Tips Perjalanan",
  "Dokumen",
] as const;

export const artikelFrontmatterSchema = z.object({
  judul: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  ringkasan: z.string(),
  kategori: z.enum(kategoriArtikel),
  penulis: z.string(),
  tanggal: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gambar: z.string(),
  gambarAlt: z.string().min(3),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});
export type ArtikelFrontmatter = z.infer<typeof artikelFrontmatterSchema>;

export interface Artikel extends ArtikelFrontmatter {
  body: string;
  menitBaca: number;
}

/* ── Pengaturan Situs — PRD §10.3, §7.10, §7.1 blok 2 ────────────────── */

export const pengaturanSitusSchema = z
  .object({
    namaLegal: z.string(),
    deskripsiSingkat: z.string(),
    tahunBerdiri: z.number().int(),
    jumlahJamaah: z.number().int(), // total diberangkatkan (trust bar)
    jamaahPerTahun: z.number().int(),
    ratingGoogle: z.object({ nilai: z.number(), jumlah: z.number().int() }),
    legalitas: z.object({
      skPpiu: z.string(), // Nomor SK PPIU Kemenag — PRD §7.2 trust bar
      urlVerifikasiKemenag: z.string(),
      nib: z.string(),
      akta: z.string(),
    }),
    kontak: z.object({
      waUtama: z.string(),
      waDivisi: z.array(z.object({ divisi: z.string(), nomor: z.string() })),
      email: z.string().email(),
      telepon: z.string(),
      alamat: z.object({
        jalan: z.string(),
        kota: z.string(),
        provinsi: z.string(),
        kodePos: z.string(),
      }),
      jamOperasional: z.array(z.object({ hari: z.string(), jam: z.string() })),
      slaBalasMenit: z.number().int(), // PRD §19: SLA balas ≤ 15 menit
    }),
    sosial: z.object({
      instagram: z.string().optional(),
      tiktok: z.string().optional(),
      youtube: z.string().optional(),
      facebook: z.string().optional(),
    }),
    banner: z
      .object({
        aktif: z.boolean(),
        teks: z.string(),
        tautan: z.string().optional(),
      })
      .optional(),
  })
  .strict();
export type PengaturanSitus = z.infer<typeof pengaturanSitusSchema>;
