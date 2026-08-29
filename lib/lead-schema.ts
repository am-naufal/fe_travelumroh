import { z } from "zod";

/** Form pendaftaran minat — PRD §7.11 (tabel field). */

export const bulanBerangkatOptions = [
  "Belum tahu",
  "1–3 bulan lagi",
  "4–6 bulan lagi",
  "7–12 bulan lagi",
  "Lebih dari 1 tahun",
] as const;

export const rencanaPembayaran = ["tunai", "cicilan"] as const;

/** Normalisasi nomor Indonesia ke format 62xxxxxxxxxx. */
export function normalizeWa(input: string): string {
  const digits = input.replace(/[^\d]/g, "");
  if (digits.startsWith("62")) return digits;
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("8")) return `62${digits}`;
  return digits;
}

export const leadSchema = z.object({
  nama: z.string().trim().min(3, "Nama minimal 3 karakter"),
  whatsapp: z
    .string()
    .trim()
    .min(8, "Nomor WhatsApp tidak valid")
    .transform(normalizeWa)
    .refine((v) => /^62\d{8,13}$/.test(v), "Gunakan format nomor Indonesia, mis. 0812xxxx"),
  email: z
    .union([z.literal(""), z.email("Format email tidak valid")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  kota: z.string().trim().min(2, "Isi kota domisili Anda"),
  paketSlug: z.string().min(1, "Pilih paket yang diminati"),
  bulanBerangkat: z.enum(bulanBerangkatOptions, { message: "Pilih perkiraan bulan berangkat" }),
  jumlahJamaah: z.coerce
    .number()
    .int("Jumlah jamaah harus bilangan bulat")
    .min(1, "Minimal 1 jamaah")
    .max(50, "Maksimal 50 jamaah — untuk grup lebih besar hubungi kami langsung"),
  rencanaPembayaran: z.enum(rencanaPembayaran, { message: "Pilih rencana pembayaran" }),
  catatan: z.string().trim().max(500, "Maksimal 500 karakter").optional(),
  persetujuanPrivasi: z.literal(true, {
    message: "Anda harus menyetujui kebijakan privasi",
  }),
  // Anti-spam (PRD §7.11): honeypot + token Turnstile
  website: z.string().max(0).optional(), // honeypot — harus kosong
  turnstileToken: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type LeadData = z.output<typeof leadSchema>;
