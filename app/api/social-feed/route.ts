import { NextResponse } from "next/server";
import { serverEnv } from "@/lib/env";

/**
 * Feed sosial — PRD §10.4: "melalui endpoint cache sisi server, bukan panggilan
 * langsung dari browser". PRD §7.1 blok 7 / §19: kegagalan tidak merusak layout.
 *
 * Tanpa token, kembalikan fallback statis sehingga grid tetap terisi rapi.
 */
export const revalidate = 900; // cache 15 menit

interface FeedItem {
  id: string;
  platform: "instagram" | "tiktok";
  permalink: string;
  caption: string;
  thumbnailAlt: string;
}

const FALLBACK: FeedItem[] = [
  { id: "f1", platform: "instagram", permalink: "https://instagram.com/luhas.umroh", caption: "Keberangkatan reguler Maret 2027 — 40 jamaah, lengkap.", thumbnailAlt: "Rombongan jamaah Luhas di bandara sebelum berangkat" },
  { id: "f2", platform: "tiktok", permalink: "https://tiktok.com/@luhas.umroh", caption: "Rincian biaya umroh 2027, tanpa biaya tersembunyi.", thumbnailAlt: "Cuplikan video edukasi biaya umroh" },
  { id: "f3", platform: "instagram", permalink: "https://instagram.com/luhas.umroh", caption: "Tips memilih tipe kamar quad, triple, atau double.", thumbnailAlt: "Infografis perbandingan tipe kamar hotel" },
  { id: "f4", platform: "instagram", permalink: "https://instagram.com/luhas.umroh", caption: "Momen Raudhah bersama jamaah lansia.", thumbnailAlt: "Jamaah lansia dibimbing menuju Raudhah" },
  { id: "f5", platform: "tiktok", permalink: "https://tiktok.com/@luhas.umroh", caption: "Jarak hotel ke Masjidil Haram, kami ukur sendiri.", thumbnailAlt: "Video berjalan dari hotel ke Masjidil Haram" },
  { id: "f6", platform: "instagram", permalink: "https://instagram.com/luhas.umroh", caption: "Manasik bareng sebelum keberangkatan.", thumbnailAlt: "Sesi manasik umroh di kantor Luhas" },
];

export async function GET() {
  try {
    if (!serverEnv.instagramFeedToken && !serverEnv.tiktokFeedToken) {
      return NextResponse.json({ source: "fallback", items: FALLBACK });
    }
    // TODO: panggil Instagram Graph API / TikTok API di sini dengan token server.
    // Untuk sekarang kembalikan fallback agar kontrak stabil.
    return NextResponse.json({ source: "fallback", items: FALLBACK });
  } catch {
    return NextResponse.json({ source: "error", items: FALLBACK }, { status: 200 });
  }
}
