import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  // PRD §12 — semua gambar AVIF/WebP
  images: {
    formats: ["image/avif", "image/webp"],
    // PRD §12: beberapa tingkat kualitas untuk balancing bobot vs ketajaman
    qualities: [50, 60, 75, 90],
    // In-app browser TikTok/IG kerap perangkat lama — batasi ukuran perangkat
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Struktur i18n disiapkan, hanya `id` aktif (PRD §5.2)
  // (multi-bahasa penuh menyusul; lihat lib/i18n.ts)
  poweredByHeader: false,
  // PRD §15 — header keamanan dasar (HSTS diatur di edge/hosting)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(
  nextConfig,
);
