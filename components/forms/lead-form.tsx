"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import {
  leadSchema,
  bulanBerangkatOptions,
  type LeadInput,
} from "@/lib/lead-schema";
import { env } from "@/lib/env";
import { track, getPersistedUtm } from "@/lib/analytics";
import { waAfterLead } from "@/lib/wa-link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select, Label, FieldError, FieldHint } from "@/components/ui/field";
import { RadioGroup, RadioCard } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  pakets: { slug: string; nama: string }[];
  defaultPaket?: string;
}

const STEP1: (keyof LeadInput)[] = ["nama", "whatsapp", "email", "kota"];

export function LeadForm({ pakets, defaultPaket }: Props) {
  const router = useRouter();
  const [step, setStep] = React.useState<1 | 2>(1);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [showWaFallback, setShowWaFallback] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    mode: "onBlur", // PRD §7.11: validasi inline saat blur
    defaultValues: {
      paketSlug: defaultPaket ?? pakets[0]?.slug ?? "",
      jumlahJamaah: 2,
      rencanaPembayaran: "cicilan",
      website: "",
    },
  });

  const nama = watch("nama");
  const catatan = watch("catatan") ?? "";

  // PRD §7.11: Turnstile (opsional). Script di /daftar memanggil window.onTurnstile.
  React.useEffect(() => {
    if (!env.turnstileSiteKey) return;
    (window as unknown as { onTurnstile?: (t: string) => void }).onTurnstile = (token: string) => {
      setValue("turnstileToken", token);
    };
  }, [setValue]);

  const next = async () => {
    const ok = await trigger(STEP1);
    if (ok) setStep(2);
  };

  const onSubmit = async (values: LeadInput) => {
    setServerError(null);
    setShowWaFallback(false);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, utm: getPersistedUtm() }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        track({
          name: "lead_submit",
          params: {
            package_slug: values.paketSlug,
            budget_plan: String(values.rencanaPembayaran),
            pax: Number(values.jumlahJamaah),
          },
        });
        const q = new URLSearchParams({
          paket: values.paketSlug,
          nama: values.nama ?? "",
        });
        router.push(`/terima-kasih?${q.toString()}`);
        return;
      }
      // PRD §7.11: gagal kirim → tawarkan jalur alternatif (WA), tidak buntu
      setServerError(data.error ?? "Terjadi kesalahan. Silakan coba lagi.");
      setShowWaFallback(true);
    } catch {
      setServerError("Koneksi bermasalah. Anda tetap bisa lanjut lewat WhatsApp.");
      setShowWaFallback(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Progres 2 langkah — persis docs/design/DaftarDesktop.html */}
      <ol className="flex items-center gap-3 py-1" aria-label="Langkah formulir">
        {(
          [
            { n: 1, label: "Data Anda" },
            { n: 2, label: "Rencana Umroh" },
          ] as const
        ).map((s) => (
          <li key={s.n} className="flex flex-1 items-center gap-2.5">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold",
                step >= s.n ? "bg-brand-primary text-white" : "bg-tint-blue-bg text-brand-muted",
              )}
            >
              {s.n}
            </span>
            <span
              className={cn(
                "text-[14.5px]",
                step === s.n ? "font-extrabold text-brand-ink" : "font-semibold text-brand-muted",
              )}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ol>

      {/* Honeypot — disembunyikan dari manusia & AT */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label htmlFor="website">Website</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      <input type="hidden" {...register("turnstileToken")} />

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="nama" required>
              Nama lengkap
            </Label>
            <Input
              id="nama"
              autoComplete="name"
              aria-invalid={!!errors.nama}
              aria-describedby={errors.nama ? "err-nama" : undefined}
              {...register("nama")}
            />
            {errors.nama ? (
              <FieldError id="err-nama">{errors.nama.message}</FieldError>
            ) : (
              <FieldHint id="hint-nama">Tulis 3 kata bila paspor Anda 3 kata.</FieldHint>
            )}
          </div>

          <div>
            <Label htmlFor="whatsapp" required>
              Nomor WhatsApp
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              inputMode="tel"
              placeholder="0812xxxxxxxx"
              autoComplete="tel"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? "err-wa" : "hint-wa"}
              {...register("whatsapp")}
            />
            {errors.whatsapp ? (
              <FieldError id="err-wa">{errors.whatsapp.message}</FieldError>
            ) : (
              <FieldHint id="hint-wa">Tim kami akan menghubungi nomor ini via WhatsApp.</FieldHint>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email (opsional)</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
              {...register("email")}
            />
            <FieldError id="err-email">{errors.email?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="kota" required>
              Kota domisili
            </Label>
            <Input
              id="kota"
              autoComplete="address-level2"
              aria-invalid={!!errors.kota}
              aria-describedby={errors.kota ? "err-kota" : undefined}
              {...register("kota")}
            />
            <FieldError id="err-kota">{errors.kota?.message}</FieldError>
          </div>

          <Button type="button" onClick={next} className="w-full">
            Lanjut
            <ArrowRight className="size-4" aria-hidden />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="paketSlug" required>
              Paket yang diminati
            </Label>
            <Select
              id="paketSlug"
              aria-invalid={!!errors.paketSlug}
              aria-describedby={errors.paketSlug ? "err-paket" : undefined}
              {...register("paketSlug")}
            >
              {pakets.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.nama}
                </option>
              ))}
              <option value="belum-tahu">Belum tahu, minta rekomendasi</option>
            </Select>
            <FieldError id="err-paket">{errors.paketSlug?.message}</FieldError>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="bulanBerangkat" required>
                Perkiraan bulan berangkat
              </Label>
              <Select
                id="bulanBerangkat"
                defaultValue=""
                aria-invalid={!!errors.bulanBerangkat}
                aria-describedby={errors.bulanBerangkat ? "err-bulan" : undefined}
                {...register("bulanBerangkat")}
              >
                <option value="" disabled>
                  Pilih…
                </option>
                {bulanBerangkatOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </Select>
              <FieldError id="err-bulan">{errors.bulanBerangkat?.message}</FieldError>
            </div>

            <div>
              <Label htmlFor="jumlahJamaah" required>
                Jumlah jamaah
              </Label>
              <Input
                id="jumlahJamaah"
                type="number"
                inputMode="numeric"
                min={1}
                max={50}
                aria-invalid={!!errors.jumlahJamaah}
                aria-describedby={errors.jumlahJamaah ? "err-pax" : undefined}
                {...register("jumlahJamaah")}
              />
              <FieldError id="err-pax">{errors.jumlahJamaah?.message}</FieldError>
            </div>
          </div>

          <div>
            <Label required>Rencana pembayaran</Label>
            <RadioGroup
              defaultValue="cicilan"
              onValueChange={(v) => setValue("rencanaPembayaran", v as "tunai" | "cicilan")}
              className="grid-cols-2"
            >
              <RadioCard value="tunai" id="bayar-tunai" label="Tunai" />
              <RadioCard value="cicilan" id="bayar-cicilan" label="Bertahap" />
            </RadioGroup>
            <FieldError id="err-bayar">{errors.rencanaPembayaran?.message}</FieldError>
          </div>

          <div>
            <Label htmlFor="catatan">Catatan (opsional)</Label>
            <Textarea
              id="catatan"
              maxLength={500}
              rows={3}
              placeholder="Mis. berangkat bersama orang tua yang butuh kursi roda"
              {...register("catatan")}
            />
            <FieldHint id="hint-catatan">{catatan.length}/500 karakter</FieldHint>
          </div>

          {/* PRD §15: checkbox persetujuan tidak tercentang default */}
          <label className="flex items-start gap-2.5 text-sm">
            <Checkbox
              id="persetujuan"
              onCheckedChange={(c) =>
                setValue("persetujuanPrivasi", (c === true) as true, { shouldValidate: true })
              }
              aria-describedby={errors.persetujuanPrivasi ? "err-privasi" : undefined}
              className="mt-0.5"
            />
            <span className="text-brand-muted">
              Saya menyetujui{" "}
              <Link href="/kebijakan-privasi" className="text-brand-primary underline" target="_blank">
                kebijakan privasi
              </Link>{" "}
              dan bersedia dihubungi tim Luhas.
            </span>
          </label>
          <FieldError id="err-privasi">{errors.persetujuanPrivasi?.message}</FieldError>

          {/* Slot Turnstile — hanya bila site key dikonfigurasi */}
          {env.turnstileSiteKey && (
            <div
              className="cf-turnstile"
              data-sitekey={env.turnstileSiteKey}
              data-callback="onTurnstile"
            />
          )}

          {serverError && (
            <div className="flex gap-2 rounded-lg bg-brand-danger/10 p-3 text-sm text-brand-ink">
              <AlertTriangle className="size-4 shrink-0 text-brand-danger" aria-hidden />
              <span>{serverError}</span>
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={() => setStep(1)}>
              <ArrowLeft className="size-4" aria-hidden />
              Kembali
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting && <Loader2 className="size-4 animate-spin" aria-hidden />}
              Kirim pendaftaran
            </Button>
          </div>

          {showWaFallback && (
            <a
              href={waAfterLead(nama || "calon jamaah")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[#25D366] px-5 py-3 text-sm font-semibold text-white"
            >
              Lanjut lewat WhatsApp
            </a>
          )}
        </div>
      )}
    </form>
  );
}
