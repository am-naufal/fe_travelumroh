import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// PRD §7.1/§7.3 badge: Promo / Best Seller / Sisa N Seat / Hampir Penuh
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--radius-chip)] px-2.5 py-1 text-xs font-semibold leading-none",
  {
    variants: {
      variant: {
        promo: "bg-brand-accent text-brand-ink",
        "best-seller": "bg-brand-primary text-white",
        "hampir-penuh": "bg-brand-danger/10 text-brand-danger ring-1 ring-brand-danger/20",
        neutral: "bg-brand-ink/5 text-brand-muted",
        success: "bg-brand-success/10 text-brand-success ring-1 ring-brand-success/20",
        info: "bg-brand-primary/10 text-brand-primary ring-1 ring-brand-primary/20",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

const LABELS: Record<string, string> = {
  promo: "Promo",
  "best-seller": "Best Seller",
  "hampir-penuh": "Hampir Penuh",
};

/** Badge dari nilai CMS. PRD §9.2/§13: selalu ada teks, warna bukan satu-satunya penanda. */
export function PackageBadge({ value }: { value: "promo" | "best-seller" | "hampir-penuh" }) {
  return <Badge variant={value}>{LABELS[value]}</Badge>;
}
