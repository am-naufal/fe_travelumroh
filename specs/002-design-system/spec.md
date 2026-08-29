# 002 — Design System & Token

**PRD:** §9 (Sistem Desain & Panduan Visual)

## Kriteria penerimaan

| ID | Kriteria | PRD |
| --- | --- | --- |
| AC-DS-01 | Token warna brand tersedia (`primary`, `primary-dark`, `accent`, `ink`, `muted`, `surface`, `bg`, `success/warning/danger`) | §9.2 |
| AC-DS-02 | Kontras teks utama ↔ latar ≥ 4,5:1 | §9.2, §13 |
| AC-DS-03 | Skala tipografi 12–48px; body ≥ 16px di mobile; heading Plus Jakarta Sans, body Inter | §9.3 |
| AC-DS-04 | Skala spacing kelipatan 4px | §9.4 |
| AC-DS-05 | Radius: kartu 16px, tombol 12px, chip 999px | §9.4 |
| AC-DS-06 | Dua tingkat bayangan saja (`shadow-sm`, `shadow-md`) | §9.4 |
| AC-DS-07 | Breakpoint sm640/md768/lg1024/xl1280/2xl1536 (default Tailwind) | §9.5 |
| AC-DS-08 | Komponen inti §9.6 dibangun (Button, PackageCard, PriceTag, Badge, FilterBar, Accordion, Tabs, Carousel, VideoTestimonialCard, InstallmentCalculator, StickyMobileCTA, LeadForm, Breadcrumb, EmptyState, Skeleton, Toast, Modal, Lightbox) | §9.6 |
| AC-DS-09 | Transisi 150–250ms ease-out; hormati `prefers-reduced-motion`; animasi tidak menunda interaksi | §9.7 |
| AC-DS-10 | Varian Button: primary / secondary / ghost / whatsapp | §9.6 |
| AC-DS-11 | Warna aksen bukan satu-satunya penanda (mis. "sisa seat" selalu ada teks) | §9.2, §13 |

## Catatan / penyimpangan
- PRD §9.2 memberi label "hijau toska modern" pada `#0A5CAF`, padahal hex tersebut biru.
  Implementasi memakai nilai hex (kontras aman). **Perlu konfirmasi tim desain** apakah
  yang dimaksud warna biru itu atau hijau toska betulan. Dicatat di audit.
- Ikon: lucide-react. Ornamen islami: satu pola geometri tipis sebagai aksen (SVG ringan).

## Tasks
- [x] Token `@theme` + variabel CSS di `globals.css`
- [x] Util `cn()` (clsx + tailwind-merge)
- [x] Primitives: Button, Badge, PriceTag, Input, Textarea, Select, Checkbox, RadioGroup,
      Label, Slider, Accordion, Tabs, Dialog/Modal, Tooltip, Skeleton, Toast, Carousel,
      Lightbox, EmptyState, Breadcrumb
- [x] Pola geometri islami (`components/ui/pattern.tsx`)
- [x] Uji kontras token (dicatat di audit)
