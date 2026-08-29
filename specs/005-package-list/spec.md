# 005 — Daftar Paket (`/paket`)

**PRD:** §7.2

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-LIST-01 | Filter: kategori, bulan berangkat, rentang harga (slider), durasi (9/12/14+), kota, maskapai, bintang hotel Makkah — dapat digabung | `components/package/package-explorer.tsx` |
| AC-LIST-02 | Filter tercermin di URL query, bookmarkable, tanpa full reload | `router.replace(..., {scroll:false})` + `useSearchParams` |
| AC-LIST-03 | Pengurutan: harga terendah, keberangkatan terdekat, paling populer | idem |
| AC-LIST-04 | Kartu memuat: nama, foto, harga quad, durasi, tanggal terdekat, maskapai, hotel Makkah + jarak meter, badge sisa seat, tombol Detail + Tanya WA, checkbox Bandingkan | `PackageCard` |
| AC-LIST-05 | Skeleton saat memuat (bukan layar kosong) | `PackageCardSkeleton`, gate `hydrated` |
| AC-LIST-06 | Empty state: "Tidak ada paket sesuai filter" + tombol reset + saran | `EmptyState` di explorer |
| AC-LIST-07 | Paginasi setelah 12 kartu | `PER_PAGE = 12` |
| AC-LIST-08 | Event `filter_apply` | `track()` di `setParams` |
| AC-LIST-09 | Badge "sisa seat" selalu ada teks (bukan hanya warna) | `PackageCard` seatLabel |

## Catatan
Filtering client-side (hanya 7 paket aktif). URL query = sumber kebenaran filter.

## Tasks
- [x] FilterBar desktop sidebar + mobile sheet
- [x] URL sync + sorting + pagination + empty/skeleton
- [x] CompareBar terintegrasi
