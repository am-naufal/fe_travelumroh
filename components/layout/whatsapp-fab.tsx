"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { track, getPersistedUtm } from "@/lib/analytics";
import { waGeneral } from "@/lib/wa-link";

// PRD §1/§3 #3: CTA WhatsApp lengket. Disembunyikan bila StickyMobileCTA
// halaman detail sedang aktif (mereka set body[data-sticky-cta="on"]).
export function WhatsAppFab({
  jamOperasional,
}: {
  jamOperasional: { hari: string; jam: string }[];
}) {
  const pathname = usePathname();
  const [href, setHref] = React.useState(() => waGeneral());

  React.useEffect(() => {
    setHref(waGeneral(getPersistedUtm(), pathname));
  }, [pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track({
          name: "wa_click",
          params: { source_page: pathname, cta_position: "fab" },
        })
      }
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-md)] transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary data-[hidden=true]:hidden"
      data-wa-fab
      aria-label={`Chat WhatsApp — jam operasional ${jamOperasional[0]?.jam ?? ""}`}
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="hidden sm:inline">Chat Sekarang</span>
    </a>
  );
}
