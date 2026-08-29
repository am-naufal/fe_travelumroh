# Website Luhas — Tour & Travel Umroh

Company profile + katalog paket + lead generation untuk **luhas.co.id**.
Dibangun mengikuti PRD di [`CLAUDE.md`](./CLAUDE.md) dengan metode
Spec-Driven Development — lihat [`specs/`](./specs/README.md).

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript strict**
- **Tailwind CSS v4** — token desain di `app/globals.css` (`@theme`)
- Komponen bergaya **shadcn/ui**, ditulis tangan di atas **Radix primitives**
- **React Hook Form + Zod**, **lucide-react**, **motion**, **embla-carousel**
- Konten: berkas lokal di `content/` dibaca lewat adapter Zod di `lib/cms/`

## Menjalankan

```bash
npm install
cp .env.example .env.local   # opsional — situs jalan tanpa isi
npm run dev                  # http://localhost:3000
```

Perintah lain:

| Perintah | Fungsi |
| --- | --- |
| `npm run build` | Build produksi (SSG + ISR) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run analyze` | Build + bundle analyzer |
| `npm run validate:content` | Validasi seluruh `content/` terhadap schema |
| `npm run validate:jsonld` | Validasi struktur JSON-LD |

## Struktur

```
app/            route & layout (App Router)
components/
  ui/           primitif desain (Button, Accordion, …)
  layout/       Header, Footer, WhatsApp CTA, consent, analytics
  sections/     blok halaman (Hero, TrustBar, …)
  package/ forms/ faq/ testimonial/ article/  komponen per domain
lib/
  cms/          adapter konten + schema Zod
  wa-link.ts analytics.ts installment.ts seo.ts jsonld.ts format.ts
content/        paket, artikel, testimoni, pembimbing, FAQ, galeri, settings
specs/          spec-driven development: constitution + per-fitur + audit
```

## Batas lingkungan (bukan bug)

Beberapa hal butuh aset/kredensial nyata dan sengaja dibuat non-aktif secara default:

- **Foto & video**: semua aset visual adalah placeholder berdimensi tetap dengan
  `alt` deskriptif. Ganti file di `public/images/` lalu set
  `NEXT_PUBLIC_USE_REAL_IMAGES=true`. Lihat `public/images/README.md`.
- **CMS**: memakai berkas lokal `content/`. Jalur upgrade ke Sanity/Payload
  didokumentasikan di `lib/cms/index.ts`.
- **Analytics / Meta Pixel / TikTok Pixel / GTM**: kode lengkap, aktif hanya bila
  ID diisi di `.env.local` **dan** pengunjung menyetujui cookie.
- **Lead webhook / notifikasi WA internal / Turnstile**: aktif bila env diisi;
  bila gagal, form selalu menawarkan tombol WhatsApp langsung.
- **Feed sosial**: diambil lewat `/api/social-feed` (cache server). Tanpa token
  mengembalikan fallback statis.

## Deploy

Siap untuk Vercel (ISR + edge cache). Set environment variable dari `.env.example`
di dashboard. Aktifkan HSTS di level platform (PRD §15).
