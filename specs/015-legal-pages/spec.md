# 015 — Halaman Kebijakan & Syarat

**PRD:** §5.1, §15, §18.9

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-LGL-01 | `/kebijakan-privasi` menjelaskan tujuan penggunaan & cara penghapusan data, selaras UU PDP | `app/kebijakan-privasi/page.tsx` |
| AC-LGL-02 | `/syarat-ketentuan` memuat ketentuan harga, pembayaran, pembatalan, force majeure | `app/syarat-ketentuan/page.tsx` |
| AC-LGL-03 | Checkbox persetujuan tidak tercentang default | LeadForm (014) |
| AC-LGL-04 | Cookie banner dengan opsi menolak sebelum skrip pemasaran | `components/layout/consent-banner.tsx` |
| AC-LGL-05 | Copy legal ditandai perlu tinjauan tim legal | catatan di kedua halaman + audit |

## Tasks
- [x] Kedua halaman legal (draf, perlu review legal)
