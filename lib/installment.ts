/**
 * Simulasi cicilan internal Luhas — PRD §7.5, §7.1 blok 5, §7.3 bagian 4.
 *
 * PRD §7.5: "angka final dikonfirmasi oleh tim" dan "ini simulasi internal
 * Luhas, bukan produk pembiayaan pihak ketiga" — tidak ada bunga/margin di sini.
 * Angsuran = (harga - DP) dibagi rata sepanjang tenor.
 *
 * PRD §7.5: tanggal pelunasan HARUS H-40 sebelum berangkat.
 */

export const PELUNASAN_HARI_SEBELUM_BERANGKAT = 40;

export interface InstallmentInput {
  harga: number;
  /** Nominal DP dalam rupiah. */
  dp: number;
  /** 3 | 6 | 9 | 12 (PRD §7.5) — bebas angka positif lain bila CMS memberi. */
  tenorBulan: number;
  /** ISO tanggal keberangkatan; opsional untuk mini-kalkulator beranda. */
  tanggalBerangkat?: string;
}

export interface InstallmentResult {
  harga: number;
  dp: number;
  sisa: number;
  tenorBulan: number;
  angsuranPerBulan: number;
  totalDibayar: number;
  /** ISO — batas pelunasan (H-40 sebelum berangkat). Null bila tanpa tanggal. */
  tanggalPelunasan: string | null;
  /** True bila tenor membuat pelunasan melewati batas H-40. */
  melewatiBatasPelunasan: boolean;
  /** Estimasi tenor maksimum agar pelunasan tetap H-40 (bila tanggal diberi). */
  tenorMaksimum: number | null;
  peringatan: string[];
}

export function hitungCicilan(input: InstallmentInput): InstallmentResult {
  const harga = Math.max(0, Math.round(input.harga));
  const dp = Math.min(harga, Math.max(0, Math.round(input.dp)));
  const tenorBulan = Math.max(1, Math.round(input.tenorBulan));
  const sisa = harga - dp;
  const angsuranPerBulan = Math.ceil(sisa / tenorBulan);
  const totalDibayar = dp + angsuranPerBulan * tenorBulan;

  const peringatan: string[] = [];
  let tanggalPelunasan: string | null = null;
  let melewatiBatasPelunasan = false;
  let tenorMaksimum: number | null = null;

  if (input.tanggalBerangkat) {
    const berangkat = new Date(input.tanggalBerangkat);
    const batas = new Date(berangkat);
    batas.setDate(batas.getDate() - PELUNASAN_HARI_SEBELUM_BERANGKAT);
    tanggalPelunasan = batas.toISOString();

    const now = new Date();
    const bulanTersedia =
      (batas.getFullYear() - now.getFullYear()) * 12 +
      (batas.getMonth() - now.getMonth());
    tenorMaksimum = Math.max(0, bulanTersedia);

    if (tenorBulan > tenorMaksimum) {
      melewatiBatasPelunasan = true;
      peringatan.push(
        `Tenor ${tenorBulan} bulan melewati batas pelunasan H-${PELUNASAN_HARI_SEBELUM_BERANGKAT} ` +
          `sebelum keberangkatan. Maksimal sekitar ${tenorMaksimum} bulan untuk tanggal ini.`,
      );
    }
  }

  if (dp === 0) peringatan.push("DP belum diisi — sebagian besar paket mensyaratkan DP minimum.");

  return {
    harga,
    dp,
    sisa,
    tenorBulan,
    angsuranPerBulan,
    totalDibayar,
    tanggalPelunasan,
    melewatiBatasPelunasan,
    tenorMaksimum,
    peringatan,
  };
}

/** PRD §7.5: DP bisa diisi sebagai persen. */
export function dpDariPersen(harga: number, persen: number): number {
  return Math.round((harga * persen) / 100);
}

export const DISCLAIMER_CICILAN =
  "Simulasi ini dikelola internal Luhas dan bukan produk pembiayaan pihak ketiga. " +
  "Angka bersifat perkiraan; nominal final dikonfirmasi oleh tim setelah konsultasi.";
