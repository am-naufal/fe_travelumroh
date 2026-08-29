# 013 — Kontak (`/kontak`)

**PRD:** §7.10

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-KTK-01 | Alamat kantor | `settings.kontak.alamat` |
| AC-KTK-02 | Peta embed ringan, dimuat setelah interaksi (bukan iframe otomatis) | `components/layout/lazy-map.tsx` |
| AC-KTK-03 | Jam operasional | `settings.kontak.jamOperasional` |
| AC-KTK-04 | Nomor WA per divisi | `settings.kontak.waDivisi` + `WhatsAppCta kind="divisi"` |
| AC-KTK-05 | Form pesan singkat | `components/forms/contact-form.tsx` → menyusun pesan lalu buka WhatsApp (selaras C3) |

## Tasks
- [x] `/kontak` dengan WA per divisi, peta lazy, form singkat
