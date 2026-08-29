import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { serverEnv } from "@/lib/env";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { getPackage } from "@/lib/cms";

/**
 * Penerima lead — PRD §7.11.
 * Data diteruskan ke: (a) log/email tim sales, (b) webhook Google Sheet/CRM,
 * (c) notifikasi WA internal. Semua opsional lewat env; kegagalan tidak
 * membuat pengunjung buntu — front-end menyediakan tombol WA langsung.
 */

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  if (!serverEnv.turnstileSecret) return true; // tidak dikonfigurasi → lewati
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ secret: serverEnv.turnstileSecret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}

async function deliver(payload: Record<string, unknown>): Promise<{ delivered: string[]; failed: string[] }> {
  const delivered: string[] = [];
  const failed: string[] = [];

  // (b) Webhook ke Google Sheet / CRM
  if (serverEnv.leadWebhookUrl) {
    try {
      const r = await fetch(serverEnv.leadWebhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      r.ok ? delivered.push("webhook") : failed.push("webhook");
    } catch {
      failed.push("webhook");
    }
  }

  // (a) Email tim sales & (c) Notifikasi WA internal — di lingkungan ini
  // hanya dicatat. Ganti dengan penyedia email/WA API saat tersedia.
  if (serverEnv.leadNotifyEmail) {
    console.info(`[lead] (email → ${serverEnv.leadNotifyEmail})`, payload);
    delivered.push("email-log");
  }
  if (serverEnv.leadInternalWa) {
    console.info(`[lead] (WA internal → ${serverEnv.leadInternalWa})`, payload);
    delivered.push("wa-log");
  }
  if (delivered.length === 0 && failed.length === 0) {
    console.info("[lead] diterima (tanpa integrasi aktif):", payload);
    delivered.push("console-log");
  }

  return { delivered, failed };
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);

  // PRD §15: rate limiting pada endpoint form
  const rl = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!rl.success) {
    return NextResponse.json(
      { ok: false, error: "Terlalu banyak percobaan. Coba lagi dalam satu menit." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Permintaan tidak valid." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Data tidak lengkap.", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const data = parsed.data;

  // Honeypot (PRD §7.11) — bot mengisi field tersembunyi
  if (data.website) {
    return NextResponse.json({ ok: true }); // pura-pura sukses, buang diam-diam
  }

  const turnstileOk = await verifyTurnstile(data.turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { ok: false, error: "Verifikasi anti-spam gagal. Muat ulang halaman dan coba lagi." },
      { status: 400 },
    );
  }

  const paket = await getPackage(data.paketSlug);
  const payload = {
    diterimaPada: new Date().toISOString(),
    nama: data.nama,
    whatsapp: data.whatsapp,
    email: data.email ?? null,
    kota: data.kota,
    paketSlug: data.paketSlug,
    paketNama: paket?.nama ?? data.paketSlug,
    bulanBerangkat: data.bulanBerangkat,
    jumlahJamaah: data.jumlahJamaah,
    rencanaPembayaran: data.rencanaPembayaran,
    catatan: data.catatan ?? null,
    utm: data.utm ?? {},
    ip,
  };

  const { failed } = await deliver(payload);

  // PRD §7.11: bila SEMUA jalur pengiriman gagal, beri tahu agar front-end
  // mengarahkan ke WA. Bila sebagian berhasil, tetap sukses.
  if (failed.length > 0 && failed.length >= 1 && serverEnv.leadWebhookUrl && !serverEnv.leadNotifyEmail && !serverEnv.leadInternalWa) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengirim. Silakan lanjut via WhatsApp.", fallback: true },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, paketNama: paket?.nama ?? null });
}
