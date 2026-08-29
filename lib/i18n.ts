/**
 * Struktur i18n disiapkan, hanya Bahasa Indonesia aktif di Rilis 1 (PRD §5.2).
 * Semua teks UI statis melewati `t()` agar penambahan locale kelak tidak
 * menyisir ulang komponen.
 */
export const LOCALES = ["id"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "id";

// Kamus minimal untuk label lintas-halaman. Locale lain ditambahkan di sini.
const dict = {
  id: {
    "cta.chat": "Chat Sekarang",
    "cta.viewPackages": "Lihat Paket & Harga",
    "cta.askWa": "Tanya via WhatsApp",
    "nav.packages": "Paket",
    "nav.calculator": "Simulasi Cicilan",
    "nav.guide": "Panduan",
    "nav.testimonials": "Testimoni",
    "nav.about": "Tentang",
  },
} as const;

export function t(key: keyof (typeof dict)["id"], locale: Locale = DEFAULT_LOCALE): string {
  return dict[locale][key];
}
