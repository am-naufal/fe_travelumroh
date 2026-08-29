# 018 — Performa & Aksesibilitas

**PRD:** §12, §13

## Performa (§12)
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-PERF-01 | Semua gambar via `next/image` (AVIF/WebP, `sizes` eksplisit, dimensi tetap) | `<Figure>`/`<AvatarFigure>` — satu-satunya jalur gambar; `next.config.ts` formats |
| AC-PERF-02 | Video testimoni: poster + load-on-click, tanpa autoplay bersuara | `VideoTestimonialCard` |
| AC-PERF-03 | Font maksimal 2 keluarga, `display: swap`, preload heading | `next/font` di layout |
| AC-PERF-04 | Skrip pihak ketiga `afterInteractive` atau lebih lambat | `Analytics`, Turnstile |
| AC-PERF-05 | LCP element = gambar hero, `priority` | `Hero` `<Figure priority>` |
| AC-PERF-06 | Lighthouse CI di setiap PR; regresi > 5 poin memblokir | `.lighthouserc.json` (config; runner CI di luar lingkungan) |
| AC-PERF-07 | Bundle awal ≤ 180 KB gzip / halaman | cek via `npm run analyze` (F4) |

## Aksesibilitas (§13) — target WCAG 2.1 AA
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-A11Y-01 | Operasi penuh keyboard, fokus terlihat | `:focus-visible` global di `globals.css` |
| AC-A11Y-02 | Kontras ≥ 4,5:1 teks / ≥ 3:1 komponen | token PRD §9.2 (dicek di audit) |
| AC-A11Y-03 | Label tiap input; error via `aria-describedby` | `Label`, `FieldError`, `aria-invalid` |
| AC-A11Y-04 | Area sentuh ≥ 44×44px | tombol `h-11`, `.tap-target` |
| AC-A11Y-05 | Landmark (`header`/`nav`/`main`/`footer`) + skip link | layout + `.skip-link` |
| AC-A11Y-06 | Video disertai caption/transkrip | `video.transkrip` |
| AC-A11Y-07 | Hormati `prefers-reduced-motion` | media query global |
| AC-A11Y-08 | Warna bukan satu-satunya penanda | badge + teks (mis. sisa seat) |

## Tasks
- [x] Fondasi performa & a11y di token, layout, komponen
- [x] `.lighthouserc.json`
- [ ] Audit Lighthouse + axe manual (F4)
