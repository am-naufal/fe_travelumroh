# 012 — FAQ (`/faq`)

**PRD:** §7.9

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-FAQ-01 | Minimal 25 pertanyaan | `content/faq.json` (28), schema `min(25)` |
| AC-FAQ-02 | Dikelompokkan: Biaya & Pembayaran, Dokumen, Keberangkatan, Selama di Tanah Suci, Kebijakan | `grup` enum + `getFaqGrouped()` |
| AC-FAQ-03 | Accordion | `components/faq/faq-accordion.tsx` (Radix) |
| AC-FAQ-04 | Pencarian dalam halaman | filter `q` di faq-accordion (`searchable`) |
| AC-FAQ-05 | FAQPage schema | `faqLd()` di halaman + preview beranda |

## Tasks
- [x] `/faq` + preview beranda berbagi komponen accordion
- [x] 28 FAQ seed
