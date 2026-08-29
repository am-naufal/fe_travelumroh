# 007 — Banding Paket (`/paket/banding`)

**PRD:** §7.4

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-CMP-01 | Tabel berdampingan hingga 3 paket | `components/package/compare-view.tsx`, `MAX = 3` |
| AC-CMP-02 | Baris: harga per tipe kamar, durasi, maskapai, hotel + jarak, fasilitas termasuk, sisa seat | `rows[]` di compare-view |
| AC-CMP-03 | Perbedaan antar paket disorot visual | sel `bg-brand-accent/10` bila `!allSame` |
| AC-CMP-04 | Mobile: tabel geser horizontal, kolom nama/kriteria terkunci | `overflow-x-auto` + `sticky left-0` |
| AC-CMP-05 | State via Context + localStorage; masuk lewat `?paket=a,b,c` | `compare-context.tsx` + sync di compare-view |
| AC-CMP-06 | Event `compare_open` | `CompareBar.openCompare` |
| AC-CMP-07 | Bisa tambah/hapus paket di halaman banding | select "+ Tambah paket" + tombol hapus |

## Tasks
- [x] Context global (satu-satunya state global, PRD §10.1)
- [x] Tabel + highlight + sticky column + picker
