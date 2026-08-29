# 009 — Tentang Luhas & Pembimbing

**PRD:** §7.6

## `/tentang`
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-ABOUT-01 | Cerita singkat + visi | `app/tentang/page.tsx` (copy brand, disetujui marketing — PRD §18.9) |
| AC-ABOUT-02 | Legalitas: SK PPIU (klik → Kemenag), NIB, akta, badan hukum | blok legalitas dari `settings.legalitas` |
| AC-ABOUT-03 | Foto kantor asli (placeholder sampai foto tersedia) | `<Figure>` `/images/kantor/*` |
| AC-ABOUT-04 | Tim inti / pembimbing dengan foto & peran | dari koleksi Pembimbing |
| AC-ABOUT-05 | Jumlah jamaah per tahun | `settings.jamaahPerTahun` |
| AC-ABOUT-06 | Tanpa foto stok | semua via `<Figure>` placeholder terdokumentasi |
| AC-ABOUT-07 | JSON-LD `TravelAgency` | `travelAgencyLd()` |

## `/pembimbing`
| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-PMB-01 | Profil muthawif: nama, gelar, peran, bio, foto, pengalaman, sertifikasi | `app/pembimbing/page.tsx` dari koleksi |

## Tasks
- [x] `/tentang` + `/pembimbing`
- [x] Koleksi Pembimbing (3 seed)
