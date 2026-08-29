# 010 — Galeri & Testimoni

**PRD:** §7.7

## `/galeri`
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-GAL-01 | Grid masonry | `components/gallery/gallery-view.tsx` (CSS columns) |
| AC-GAL-02 | Filter per keberangkatan/tahun | tombol tahun + select album |
| AC-GAL-03 | Lightbox | `components/ui/lightbox.tsx` (keyboard ←/→) |

## `/testimoni`
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-TST-01 | Kartu: nama, kota, paket, foto, kutipan | `components/testimonial/testimonial-card.tsx` |
| AC-TST-02 | Video testimoni format vertikal (9:16), poster + load-on-click, tanpa autoplay bersuara | `video-testimonial-card.tsx` |
| AC-TST-03 | Testimoni wajib atas izin jamaah | schema `izinPublikasi: z.literal(true)` |
| AC-TST-04 | JSON-LD `VideoObject` | `videoLd()` di `app/testimoni/page.tsx` |
| AC-TST-05 | Caption/transkrip video (PRD §13) | field `video.transkrip` + `<details>` |
| AC-TST-06 | Event `video_play` | `track()` di card |

## Tasks
- [x] `/galeri` + `/testimoni`
- [x] Komponen kartu teks & video
