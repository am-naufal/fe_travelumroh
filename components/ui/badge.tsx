import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// PRD §7.1/§7.3 badge: Promo / Best Seller / Sisa N Seat / Hampir Penuh
// Warna persis dari docs/design/*.html — pil solid, tanpa ring.
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-[var(--radius-chip)] px-2.5 py-1 text-xs font-bold leading-none",
  {
    variants: {
      variant: {
        promo: "bg-brand-accent text-brand-ink",
        "best-seller": "bg-brand-ink text-white",
        vip: "bg-brand-accent-vip text-brand-ink",
        "hampir-penuh": "bg-brand-danger-bg text-brand-danger-text",
        neutral: "bg-tint-neutral-bg text-brand-muted-2",
        success: "bg-brand-success/10 text-brand-success",
        info: "bg-tint-blue-bg text-brand-primary-dark",
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
  "best-seller": "Paling diminati",
  "hampir-penuh": "Hampir penuh",
};

/**
 * Badge dari nilai CMS. PRD §9.2/§13: selalu ada teks, warna bukan satu-satunya
 * penanda. `label` boleh dioverride (mis. "Sisa 5 seat" dari jumlah kursi asli)
 * agar teksnya sekonkret mockup, tanpa mengubah sumber datanya.
 */
export function PackageBadge({
  value,
  label,
}: {
  value: "promo" | "best-seller" | "hampir-penuh";
  label?: string;
}) {
  return <Badge variant={value}>{label ?? LABELS[value]}</Badge>;
}
