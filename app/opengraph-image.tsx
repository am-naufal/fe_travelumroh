import { ImageResponse } from "next/og";

// PRD §11: Open Graph image default.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Luhas — Travel Umroh Resmi, Harga Transparan & Bisa Dicicil";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a5caf, #07407c)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>Luhas</div>
        <div style={{ fontSize: 68, fontWeight: 800, marginTop: 24, lineHeight: 1.1 }}>
          Umroh tanpa drama biaya.
        </div>
        <div style={{ fontSize: 34, marginTop: 20, opacity: 0.9 }}>
          Harga transparan · Bisa dicicil · Berizin resmi Kemenag
        </div>
      </div>
    ),
    size,
  );
}
