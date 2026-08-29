# 008 — Simulasi Cicilan (`/simulasi-cicilan`)

**PRD:** §7.5 (juga dipakai di beranda §7.1 blok 5 dan detail paket §7.3 bagian 4)

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-CALC-01 | Input: harga (pilih paket atau manual), DP (nominal atau %), tenor 3/6/9/12 | `components/forms/installment-calculator.tsx` |
| AC-CALC-02 | Output: angsuran per bulan, total, tanggal pelunasan | `lib/installment.ts` `hitungCicilan` |
| AC-CALC-03 | Tanggal pelunasan HARUS H-40 sebelum berangkat; peringatan bila tenor melewati batas | `PELUNASAN_HARI_SEBELUM_BERANGKAT = 40`, `melewatiBatasPelunasan` |
| AC-CALC-04 | Hasil berubah real-time tanpa reload | state React, tanpa submit |
| AC-CALC-05 | Disclaimer: simulasi internal Luhas, bukan produk pembiayaan pihak ketiga, angka final dikonfirmasi tim | `DISCLAIMER_CICILAN` |
| AC-CALC-06 | Tombol "Konsultasi skema ini via WA" mengirim ringkasan simulasi | `waSimulation()` |
| AC-CALC-07 | Event `calculator_use` dengan `price`, `dp`, `tenor` | `track()` (debounce 800ms) |
| AC-CALC-08 | Tanpa bunga — sisa setelah DP dibagi rata | `angsuran = ceil(sisa / tenor)` |

## Tasks
- [x] `lib/installment.ts` dengan aturan H-40
- [x] Komponen kalkulator (varian full/mini/inline)
- [x] Halaman `/simulasi-cicilan` (008 diselesaikan di F2)
