/**
 * Pembuat deep link WhatsApp — PRD §10.4, §3 #3, C3.
 * Satu-satunya tempat nomor & format pesan WA dibangun.
 *
 * PRD §14: parameter UTM wajib ikut terbawa ke pesan WhatsApp agar sales
 * tahu asal lead.
 */
import { env } from "./env";

export const WA_NUMBER = env.waNumber; // 6285135720948 (PRD §20 #1)

type UtmParams = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string>
>;

export interface WaMessageInput {
  /** Isi pesan utama (tanpa jejak sumber — itu ditambahkan otomatis). */
  text: string;
  /** UTM dari URL saat ini; akan dilampirkan sebagai baris "— dikirim dari ...". */
  utm?: UtmParams;
  /** Halaman sumber untuk konteks sales, mis. "/paket/umroh-hemat-9h". */
  sourcePath?: string;
}

function utmSuffix(utm?: UtmParams, sourcePath?: string): string {
  const parts: string[] = [];
  if (sourcePath) parts.push(`Halaman: ${sourcePath}`);
  if (utm) {
    const entries = Object.entries(utm).filter(([, v]) => Boolean(v));
    for (const [k, v] of entries) parts.push(`${k}=${v}`);
  }
  if (parts.length === 0) return "";
  return `\n\n— ${parts.join(" · ")}`;
}

/** URL wa.me lengkap dengan pesan ter-encode. */
export function waLink(input: WaMessageInput): string {
  const body = `${input.text}${utmSuffix(input.utm, input.sourcePath)}`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(body)}`;
}

/* ── Template pesan per konteks ─────────────────────────────────────────── */

export function waGeneral(utm?: UtmParams, sourcePath?: string): string {
  return waLink({
    text: "Assalamualaikum, saya ingin bertanya tentang paket umroh Luhas. Mohon informasinya.",
    utm,
    sourcePath,
  });
}

/** PRD §7.3: "Assalamualaikum, saya tertarik dengan paket {nama} keberangkatan {tanggal}. Mohon informasinya." */
export function waPackage(
  namaPaket: string,
  tanggal: string,
  utm?: UtmParams,
  sourcePath?: string,
): string {
  return waLink({
    text: `Assalamualaikum, saya tertarik dengan paket ${namaPaket} keberangkatan ${tanggal}. Mohon informasinya.`,
    utm,
    sourcePath,
  });
}

/** PRD §7.5: kirim ringkasan simulasi cicilan ke chat. */
export function waSimulation(summary: {
  harga: string;
  dp: string;
  tenor: number;
  angsuran: string;
  namaPaket?: string;
}): string {
  const paket = summary.namaPaket ? ` untuk paket ${summary.namaPaket}` : "";
  return waLink({
    text:
      `Assalamualaikum, saya sudah mencoba simulasi cicilan${paket}:\n` +
      `- Harga: ${summary.harga}\n` +
      `- DP: ${summary.dp}\n` +
      `- Tenor: ${summary.tenor} bulan\n` +
      `- Estimasi angsuran: ${summary.angsuran}/bulan\n\n` +
      `Mohon dibantu konfirmasi skema ini.`,
  });
}

/** PRD §7.10: WA per divisi. */
export function waDivisi(divisi: string, utm?: UtmParams): string {
  return waLink({
    text: `Assalamualaikum, saya ingin menghubungi divisi ${divisi} Luhas.`,
    utm,
  });
}

/** PRD §7.11: setelah lead terkirim, lanjut chat. */
export function waAfterLead(nama: string, namaPaket?: string): string {
  const paket = namaPaket ? ` Saya tertarik paket ${namaPaket}.` : "";
  return waLink({
    text: `Assalamualaikum, saya ${nama}, baru saja mengisi formulir pendaftaran di website.${paket} Mohon ditindaklanjuti.`,
  });
}
