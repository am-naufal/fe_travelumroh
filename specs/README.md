# Spec-Driven Development — Website Luhas

Sumber kebenaran produk adalah `CLAUDE.md` (PRD v1.0). Folder `specs/` menerjemahkan PRD
menjadi unit kerja yang dapat dieksekusi dan diaudit.

## Alur

```
PRD (CLAUDE.md)
   └─ constitution.md         prinsip non-negotiable yang mengikat semua fitur
      └─ NNN-<fitur>/
           ├─ spec.md         APA & MENGAPA — user story + kriteria penerimaan,
           │                   tiap kriteria ditelusuri ke section PRD (mis. "PRD §7.3")
           │                   dan diberi ID (mis. AC-DETAIL-04)
           └─ tasks.md        BAGAIMANA + checklist granular; menjadi state
                              untuk melanjutkan bila pekerjaan terputus
      └─ audit/final-audit.md  matriks ketertelusuran PRD → implementasi + DoD §18
```

Aturan: tidak ada kode fitur ditulis sebelum `spec.md` fitur itu ada. Setiap PR/commit
menyebut ID kriteria yang dipenuhinya. Audit menyeluruh dijalankan satu kali di akhir
(kesepakatan dengan pemilik produk).

## Indeks fitur

| ID | Fitur | PRD |
| --- | --- | --- |
| 001 | Fondasi proyek | §10, §17 F0 |
| 002 | Design system & token | §9 |
| 003 | Model konten & adapter CMS | §10.3 |
| 004 | Beranda | §7.1 |
| 005 | Daftar paket + filter | §7.2 |
| 006 | Detail paket | §7.3 |
| 007 | Banding paket | §7.4 |
| 008 | Simulasi cicilan | §7.5 |
| 009 | Tentang + pembimbing | §7.6 |
| 010 | Galeri & testimoni | §7.7 |
| 011 | Blog / panduan | §7.8 |
| 012 | FAQ | §7.9 |
| 013 | Kontak | §7.10 |
| 014 | Form pendaftaran minat | §7.11 |
| 015 | Halaman kebijakan & S&K | §5.1, §15 |
| 016 | Infrastruktur SEO | §11 |
| 017 | Analytics & consent | §14, §15 |
| 018 | Performa & aksesibilitas | §12, §13 |

## Status implementasi

Lihat `audit/final-audit.md` untuk status terkini per section.
