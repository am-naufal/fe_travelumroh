# 014 — Form Pendaftaran Minat (`/daftar`, `/terima-kasih`, `/api/lead`)

**PRD:** §7.11, §8, §14, §15

## Field & validasi (PRD §7.11 tabel)
Semua di `lib/lead-schema.ts` (Zod, dipakai klien & server):
nama (min 3) · whatsapp (wajib, normalisasi ke 62xxx) · email (opsional, format) ·
kota (wajib) · paketSlug (wajib, prefill dari `?paket=`) · bulanBerangkat (wajib) ·
jumlahJamaah (1–50) · rencanaPembayaran (tunai/cicilan) · catatan (≤ 500) ·
persetujuanPrivasi (wajib true, tidak default-checked).

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-LEAD-01 | Maksimal 2 langkah | `components/forms/lead-form.tsx` `step` 1/2 |
| AC-LEAD-02 | Validasi inline saat blur | RHF `mode: "onBlur"` |
| AC-LEAD-03 | Proteksi spam: honeypot + rate limit + Turnstile (opsional) | honeypot `website`, `lib/rate-limit.ts`, slot Turnstile |
| AC-LEAD-04 | Prefill paket dari halaman paket | `defaultPaket` prop dari `?paket=` |
| AC-LEAD-05 | Setelah submit → redirect `/terima-kasih` + tombol "Lanjut chat WA" + event konversi | `router.push` + `ThankYouActions` |
| AC-LEAD-06 | Data ke: (a) email tim, (b) Sheet/CRM, (c) notifikasi WA internal | `/api/lead` `deliver()` (env-driven) |
| AC-LEAD-07 | Gagal kirim → tombol WA langsung, tidak buntu | `showWaFallback` + `waAfterLead()` |
| AC-LEAD-08 | Error terhubung ke input via `aria-describedby` | `FieldError` + `aria-invalid` |
| AC-LEAD-09 | Event `lead_submit` dengan `package_slug`, `budget_plan`, `pax` | `track()` di `onSubmit` |
| AC-LEAD-10 | Nomor WA dinormalisasi ke `62xxx` | `normalizeWa()` |

## Tasks
- [x] Schema Zod bersama
- [x] Form 2 langkah + a11y + honeypot + turnstile wiring
- [x] API route: rate limit, honeypot, turnstile verify, multi-channel deliver, fallback
- [x] Halaman terima kasih + konversi
