/** Format lokal Indonesia — PRD (Bahasa Indonesia, Rilis 1). */

const rupiahFmt = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

/** "Rp 27.000.000" */
export function formatRupiah(value: number): string {
  return rupiahFmt.format(Math.round(value));
}

/** "Rp 27 jt" — untuk ruang sempit (kartu, badge) */
export function formatRupiahShort(value: number): string {
  if (value >= 1_000_000) {
    const jt = value / 1_000_000;
    const s = Number.isInteger(jt) ? jt.toString() : jt.toFixed(1);
    return `Rp ${s} jt`;
  }
  if (value >= 1_000) return `Rp ${Math.round(value / 1_000)} rb`;
  return formatRupiah(value);
}

const dateFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateShortFmt = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function formatTanggal(iso: string): string {
  return dateFmt.format(new Date(iso));
}

export function formatTanggalShort(iso: string): string {
  return dateShortFmt.format(new Date(iso));
}

/** Jarak hotel — PRD §7.2 minta "jarak dalam meter". */
export function formatJarak(meter: number): string {
  if (meter < 1000) return `${meter} m`;
  return `${(meter / 1000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} km`;
}

export function pluralJamaah(n: number): string {
  return `${n.toLocaleString("id-ID")} jamaah`;
}

/** Selisih hari dari sekarang (dibulatkan ke bawah). */
export function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.floor(ms / 86_400_000);
}
