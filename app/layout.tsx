import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { env } from "@/lib/env";
import { getSettings } from "@/lib/cms";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { Analytics } from "@/components/layout/analytics";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CompareProvider } from "@/components/package/compare-context";
import { ToastProvider } from "@/components/ui/toast";

// PRD §9.3, §12 — heading Plus Jakarta Sans, body Inter, display swap, subset latin
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
  variable: "--font-jakarta",
  preload: true, // PRD §12: preload font heading
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: "Luhas — Travel Umroh Resmi, Harga Transparan & Bisa Dicicil",
    template: "%s · Luhas",
  },
  description:
    "Umroh tanpa drama biaya. Mulai Rp 27 juta, bisa dicicil. Travel umroh berizin resmi Kemenag untuk muslim muda — harga lengkap dari awal, hotel dekat, tim yang membalas chat.",
  applicationName: "Luhas",
  formatDetection: { telephone: true },
  openGraph: { type: "website", locale: "id_ID", siteName: "Luhas" },
};

export const viewport: Viewport = {
  themeColor: "#0a5caf",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${inter.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-brand-bg text-brand-ink">
        <a href="#konten-utama" className="skip-link">
          Lewati ke konten utama
        </a>
        <Analytics />
        <ConsentBannerMount />
        <AnnouncementBarMount />
        <CompareProvider>
          <ToastProvider>
            <SiteHeaderMount />
            <main id="konten-utama" className="flex-1">
              {children}
            </main>
            <SiteFooterMount />
            <WhatsAppFabMount />
          </ToastProvider>
        </CompareProvider>
      </body>
    </html>
  );
}

/* Wrapper server-component kecil agar layout tetap sinkron sementara
   komponennya mengambil settings dari CMS. */

async function SiteHeaderMount() {
  const settings = await getSettings();
  return <SiteHeader settings={settings} />;
}

async function SiteFooterMount() {
  const settings = await getSettings();
  return <SiteFooter settings={settings} />;
}

async function WhatsAppFabMount() {
  const settings = await getSettings();
  return <WhatsAppFab jamOperasional={settings.kontak.jamOperasional} />;
}

async function AnnouncementBarMount() {
  const settings = await getSettings();
  if (!settings.banner?.aktif) return null;
  return <AnnouncementBar teks={settings.banner.teks} tautan={settings.banner.tautan} />;
}

function ConsentBannerMount() {
  return <ConsentBanner />;
}
