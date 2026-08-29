import { ImageResponse } from "next/og";
import { getPackage } from "@/lib/cms";
import { formatRupiah } from "@/lib/format";

// PRD §11: OG image dinamis untuk paket.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Paket umroh Luhas";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paket = await getPackage(slug);
  const nama = paket?.nama ?? "Paket Umroh";
  const harga = paket ? formatRupiah(paket.hargaMulai) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0a5caf, #07407c)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700 }}>Luhas · Travel Umroh</div>
        <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{nama}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, opacity: 0.9 }}>
            {paket ? `${paket.durasiHari} hari · ${paket.hotelMakkah.jarakMeter} m dari Masjid` : ""}
          </div>
          {harga && <div style={{ fontSize: 40, fontWeight: 800 }}>mulai {harga}</div>}
        </div>
      </div>
    ),
    size,
  );
}
