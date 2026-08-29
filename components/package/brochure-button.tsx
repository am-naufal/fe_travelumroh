"use client";

import { Download } from "lucide-react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

// PRD §7.3: brosur PDF dapat diunduh, event brochure_download terekam.
export function BrochureButton({
  href,
  slug,
  className,
}: {
  href: string;
  slug: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      download
      onClick={() => track({ name: "brochure_download", params: { package_slug: slug } })}
      className={cn(
        "inline-flex items-center gap-2 rounded-[var(--radius-btn)] border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-primary hover:text-brand-primary",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      Unduh brosur PDF
    </a>
  );
}
