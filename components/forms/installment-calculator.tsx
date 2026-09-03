"use client";

import * as React from "react";
import { Info, AlertTriangle, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label, Input, Select } from "@/components/ui/field";
import { StarMark } from "@/components/ui/star-mark";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { hitungCicilan, dpDariPersen, DISCLAIMER_CICILAN } from "@/lib/installment";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// docs/design/SimulasiDesktop.html — "Cara kerjanya"
const CARA_KERJA = [
  "Kursi dikunci setelah uang muka masuk — harga tidak berubah lagi.",
  "Sisanya dibagi rata sesuai jumlah kali bayar.",
  "Pelunasan paling lambat 40 hari sebelum berangkat.",
];

interface PaketOption {
  slug: string;
  nama: string;
  harga: number;
  dpMinimum: number;
  tenor: number[];
  tanggalTerdekat: string | null;
}

interface Props {
  /** Daftar paket untuk dropdown; kosong = input harga manual saja. */
  pakets?: PaketOption[];
  /** Kunci ke satu paket (dipakai di halaman detail). */
  lockedPaket?: PaketOption;
  variant?: "full" | "mini" | "inline";
}

const HARGA_MIN = 15_000_000;
const HARGA_MAX = 120_000_000;

export function InstallmentCalculator({ pakets = [], lockedPaket, variant = "full" }: Props) {
  const options = lockedPaket ? [lockedPaket] : pakets;
  const [slug, setSlug] = React.useState<string>(lockedPaket?.slug ?? options[0]?.slug ?? "manual");
  const selected = options.find((p) => p.slug === slug);

  const [harga, setHarga] = React.useState<number>(selected?.harga ?? 30_000_000);
  const [dpMode, setDpMode] = React.useState<"nominal" | "persen">("persen");
  const [dpNominal, setDpNominal] = React.useState<number>(selected?.dpMinimum ?? 6_000_000);
  const [dpPersen, setDpPersen] = React.useState<number>(20);
  const [tenor, setTenor] = React.useState<number>(6);

  // Sinkron saat paket berganti
  React.useEffect(() => {
    if (selected) {
      setHarga(selected.harga);
      setDpNominal(selected.dpMinimum);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const dp = dpMode === "persen" ? dpDariPersen(harga, dpPersen) : dpNominal;
  const result = hitungCicilan({
    harga,
    dp,
    tenorBulan: tenor,
    tanggalBerangkat: selected?.tanggalTerdekat ?? undefined,
  });

  // PRD §14: event calculator_use (debounce)
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      track({ name: "calculator_use", params: { price: harga, dp, tenor } });
    }, 800);
    return () => window.clearTimeout(id);
  }, [harga, dp, tenor]);

  const tenorOptions = selected?.tenor ?? [3, 6, 9, 12];
  const isFull = variant === "full";

  const waCta = (
    <WhatsAppCta
      kind="simulasi"
      summary={{
        harga: formatRupiah(harga),
        dp: formatRupiah(dp),
        tenor,
        angsuran: formatRupiah(result.angsuranPerBulan),
        namaPaket: selected?.nama,
      }}
      ctaPosition={`calculator-${variant}`}
      size={isFull ? "lg" : "md"}
      className="w-full"
    >
      {isFull ? "Konsultasi Skema Ini via WhatsApp" : "Konsultasi skema ini via WhatsApp"}
    </WhatsAppCta>
  );

  const peringatanBox = result.peringatan.length > 0 && (
    <div className="flex gap-2 rounded-lg bg-brand-warning/10 p-3 text-xs text-brand-ink">
      <AlertTriangle className="size-4 shrink-0 text-brand-warning" aria-hidden />
      <ul className="space-y-1">
        {result.peringatan.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );

  const inputsFields = (
    <>
      {options.length > 0 && !lockedPaket && (
        <div>
          <Label htmlFor="calc-paket">Pilih paket</Label>
          <Select id="calc-paket" value={slug} onChange={(e) => setSlug(e.target.value)}>
            {options.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.nama} — {formatRupiah(p.harga)}
              </option>
            ))}
            <option value="manual">Isi harga manual</option>
          </Select>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between">
          <Label htmlFor="calc-harga" className="mb-0">
            Harga paket
          </Label>
          <span className="font-heading font-bold text-brand-ink">{formatRupiah(harga)}</span>
        </div>
        <Slider
          className="mt-2"
          min={HARGA_MIN}
          max={HARGA_MAX}
          step={500_000}
          value={[harga]}
          onValueChange={([v]) => {
            setSlug("manual");
            setHarga(v);
          }}
          aria-label="Harga paket"
        />
        <input
          id="calc-harga"
          type="number"
          className="sr-only"
          value={harga}
          onChange={(e) => setHarga(Number(e.target.value))}
          aria-hidden
          tabIndex={-1}
        />
      </div>

      <div className={cn("grid gap-3", !isFull && "sm:grid-cols-2")}>
        <div>
          <Label htmlFor="calc-dp">Uang muka (DP)</Label>
          <div className="flex gap-2">
            <Select
              aria-label="Jenis DP"
              value={dpMode}
              onChange={(e) => setDpMode(e.target.value as "nominal" | "persen")}
              className="w-28 shrink-0"
            >
              <option value="persen">Persen</option>
              <option value="nominal">Nominal</option>
            </Select>
            {dpMode === "persen" ? (
              <Select
                id="calc-dp"
                value={dpPersen}
                onChange={(e) => setDpPersen(Number(e.target.value))}
              >
                {[10, 15, 20, 25, 30, 40, 50].map((p) => (
                  <option key={p} value={p}>
                    {p}%
                  </option>
                ))}
              </Select>
            ) : (
              <Input
                id="calc-dp"
                type="number"
                min={0}
                step={500_000}
                value={dpNominal}
                onChange={(e) => setDpNominal(Number(e.target.value))}
              />
            )}
          </div>
          <p className="mt-1 text-xs text-brand-muted">= {formatRupiah(dp)}</p>
        </div>

        <div>
          <Label htmlFor="calc-tenor">Jumlah kali bayar</Label>
          {isFull ? (
            <div className="flex gap-2.5">
              {tenorOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTenor(t)}
                  aria-pressed={tenor === t}
                  className={cn(
                    "flex min-h-[52px] flex-1 items-center justify-center rounded-xl border-[1.5px] text-base font-extrabold transition-colors",
                    tenor === t
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-brand-border bg-white text-brand-muted-2",
                  )}
                >
                  {t}×
                </button>
              ))}
            </div>
          ) : (
            <Select
              id="calc-tenor"
              value={tenor}
              onChange={(e) => setTenor(Number(e.target.value))}
            >
              {tenorOptions.map((t) => (
                <option key={t} value={t}>
                  {t} bulan
                </option>
              ))}
            </Select>
          )}
        </div>
      </div>
    </>
  );

  if (!isFull) {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-brand-border bg-white p-4 sm:p-6",
          variant === "mini" && "p-4",
        )}
      >
        <div className="grid gap-4">{inputsFields}</div>

        <dl className="mt-5 grid gap-2 rounded-xl bg-brand-bg p-4 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-brand-muted">Angsuran per bulan</dt>
            <dd className="font-heading text-xl font-bold text-brand-primary">
              {formatRupiah(result.angsuranPerBulan)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-brand-muted">Sisa setelah DP</dt>
            <dd className="font-medium">{formatRupiah(result.sisa)}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-brand-muted">Total dibayar</dt>
            <dd className="font-medium">{formatRupiah(result.totalDibayar)}</dd>
          </div>
          {result.tanggalPelunasan && (
            <div className="flex items-center justify-between">
              <dt className="text-brand-muted">Batas pelunasan (H-40)</dt>
              <dd className="font-medium">{formatTanggal(result.tanggalPelunasan)}</dd>
            </div>
          )}
        </dl>

        {peringatanBox && <div className="mt-3">{peringatanBox}</div>}

        <p className="mt-3 flex gap-2 text-xs text-brand-muted">
          <Info className="size-4 shrink-0" aria-hidden />
          {DISCLAIMER_CICILAN}
        </p>

        <div className="mt-4">{waCta}</div>
      </div>
    );
  }

  // variant "full" — dua kolom persis docs/design/SimulasiDesktop.html
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_460px] lg:items-start">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-[22px] rounded-[var(--radius-card)] border border-brand-border bg-white p-6 shadow-[var(--shadow-sm)] sm:p-7">
          {inputsFields}
        </div>
        <div className="flex items-start gap-[11px] rounded-[14px] border border-[#F2D9A6] bg-tint-gold-bg p-4">
          <Info className="mt-px size-[18px] shrink-0 text-tint-gold-text" aria-hidden />
          <p className="text-[13.5px] leading-relaxed text-[#5A3E06]">{DISCLAIMER_CICILAN}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden rounded-[18px] bg-brand-ink p-8">
          <StarMark
            size={170}
            className="pointer-events-none absolute -right-[46px] -bottom-[46px] text-brand-accent opacity-[0.22]"
          />
          <div className="relative">
            <p className="mb-2.5 text-[13px] font-bold tracking-[0.08em] text-brand-accent uppercase">
              Perkiraan pembayaran Anda
            </p>
            <p className="text-[42px] leading-[1.1] font-extrabold tracking-[-0.03em] text-white">
              {formatRupiah(result.angsuranPerBulan)}
            </p>
            <p className="mt-1.5 text-base text-white/72">per bulan, selama {tenor} bulan</p>
            <div className="my-[22px] h-px bg-white/14" />
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-[12.5px] font-semibold text-white/60">Harga paket</p>
                <p className="mt-[3px] text-[16.5px] font-extrabold whitespace-nowrap text-white">
                  {formatRupiah(harga)}
                </p>
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-white/60">Uang muka</p>
                <p className="mt-[3px] text-[16.5px] font-extrabold whitespace-nowrap text-white">
                  {formatRupiah(dp)}
                </p>
              </div>
              <div>
                <p className="text-[12.5px] font-semibold text-white/60">Pelunasan terakhir</p>
                <p className="mt-[3px] text-[16.5px] font-extrabold whitespace-nowrap text-white">
                  {result.tanggalPelunasan ? formatTanggal(result.tanggalPelunasan) : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {peringatanBox}
        {waCta}

        <div className="flex flex-col gap-3.5 rounded-[var(--radius-card)] border border-brand-border bg-white p-6">
          <p className="font-heading text-[17px] font-extrabold text-brand-ink">Cara kerjanya</p>
          {CARA_KERJA.map((teks) => (
            <div key={teks} className="flex items-start gap-[11px]">
              <span className="mt-px flex size-[26px] shrink-0 items-center justify-center rounded-full bg-tint-blue-bg">
                <Check className="size-[15px] text-brand-primary" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-base leading-relaxed text-brand-muted-2">{teks}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
