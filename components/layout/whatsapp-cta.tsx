"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { track, getPersistedUtm } from "@/lib/analytics";
import { waGeneral, waPackage, waSimulation, waDivisi, waLink } from "@/lib/wa-link";

type Kind =
  | { kind?: "general" }
  | { kind: "package"; namaPaket: string; tanggal: string; packageSlug?: string }
  | { kind: "divisi"; divisi: string }
  | { kind: "custom"; text: string }
  | {
      kind: "simulasi";
      summary: { harga: string; dp: string; tenor: number; angsuran: string; namaPaket?: string };
    };

type Props = Kind & {
  children: React.ReactNode;
  /** PRD §14: cta_position untuk event wa_click. */
  ctaPosition: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "whatsapp" | "primary" | "secondary" | "ghost" | "accent";
  withIcon?: boolean;
};

// PRD §3 #3, C3, §10.4, §14 — satu-satunya komponen CTA WhatsApp.
export function WhatsAppCta(props: Props) {
  const {
    children,
    ctaPosition,
    className,
    size = "md",
    variant = "whatsapp",
    withIcon = true,
  } = props;
  const pathname = usePathname();

  const href = React.useMemo(() => {
    const utm = getPersistedUtm();
    switch (props.kind) {
      case "package":
        return waPackage(props.namaPaket, props.tanggal, utm, pathname);
      case "divisi":
        return waDivisi(props.divisi, utm);
      case "simulasi":
        return waSimulation(props.summary);
      case "custom":
        return waLink({ text: props.text, utm, sourcePath: pathname });
      default:
        return waGeneral(utm, pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, pathname]);

  const packageSlug = props.kind === "package" ? props.packageSlug : undefined;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics="wa_click"
      onClick={() =>
        track({
          name: "wa_click",
          params: { source_page: pathname, package_slug: packageSlug, cta_position: ctaPosition },
        })
      }
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {withIcon && <MessageCircle className="size-4" aria-hidden />}
      {children}
    </a>
  );
}
