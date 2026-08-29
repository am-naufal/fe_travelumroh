"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { waAfterLead } from "@/lib/wa-link";
import { track } from "@/lib/analytics";

// PRD §7.11: tombol "Lanjut chat WA sekarang" + memicu event konversi.
export function ThankYouActions({
  nama,
  paketNama,
  paketSlug,
}: {
  nama?: string;
  paketNama?: string;
  paketSlug?: string;
}) {
  React.useEffect(() => {
    // Konversi terkonfirmasi di halaman ini (backup untuk lead_submit)
    track({
      name: "lead_submit",
      params: { package_slug: paketSlug, budget_plan: "confirmed", pax: 0 },
    });
  }, [paketSlug]);

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <a
        href={waAfterLead(nama || "calon jamaah", paketNama)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          track({
            name: "wa_click",
            params: { source_page: "/terima-kasih", package_slug: paketSlug, cta_position: "thankyou" },
          })
        }
        className="inline-flex h-12 items-center justify-center gap-2 rounded-[var(--radius-btn)] bg-[#25D366] px-6 text-sm font-semibold text-white"
      >
        <MessageCircle className="size-4" aria-hidden />
        Lanjut chat WA sekarang
      </a>
      <Link
        href="/paket"
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-btn)] border border-brand-border bg-white px-6 text-sm font-semibold text-brand-ink"
      >
        Lihat paket lain
      </Link>
    </div>
  );
}
