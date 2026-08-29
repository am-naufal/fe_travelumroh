# 017 — Analytics & Consent

**PRD:** §14, §15, §10.4

## Event (PRD §14) — semua di `lib/analytics.ts`
| Event | Pemicu | Komponen |
| --- | --- | --- |
| `view_package` | buka detail paket | `ViewPackageTracker` |
| `wa_click` | klik tombol WA mana pun (`source_page`, `package_slug`, `cta_position`) | `WhatsAppCta`, `WhatsAppFab`, dll. |
| `lead_submit` | form terkirim (`package_slug`, `budget_plan`, `pax`) | `LeadForm`, `ThankYouActions` |
| `brochure_download` | unduh brosur | `BrochureButton` |
| `calculator_use` | simulasi dijalankan (`price`, `dp`, `tenor`) | `InstallmentCalculator` |
| `filter_apply` | filter diterapkan | `PackageExplorer` |
| `compare_open` | halaman banding dibuka | `CompareBar` |
| `video_play` | video testimoni diputar | `VideoTestimonialCard` |
| `scroll_depth` | 25/50/75/100% | `Analytics` |

| ID | Kriteria | Implementasi |
| --- | --- | --- |
| AC-AN-01 | GA4 + GTM + Meta Pixel + TikTok Pixel via `next/script` `afterInteractive` | `components/layout/analytics.tsx` |
| AC-AN-02 | Skrip & event hanya jalan setelah consent "granted" | `getConsent()` gate; `ConsentBanner` |
| AC-AN-03 | UTM disimpan (kunjungan pertama) & ikut ke pesan WhatsApp | `persistUtm`/`getPersistedUtm` + `wa-link.ts` utmSuffix |
| AC-AN-04 | Mode debug: event tampil di konsol tanpa dikirim | `NEXT_PUBLIC_ANALYTICS_DEBUG=1` |
| AC-AN-05 | ID kosong → tidak me-render skrip | guard `env.*Id` |

## Tasks
- [x] `lib/analytics.ts` + loader skrip + consent gate + UTM passthrough
- [ ] Verifikasi tiap event di DebugView / konsol (F4)
