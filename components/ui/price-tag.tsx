import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";

// PRD §9.6 komponen PriceTag — sorotan harga (PRD §2 P1, C2)
interface PriceTagProps {
  value: number;
  /** Tampilkan "mulai" di depan (PRD §7.1/§7.2: "harga mulai"). */
  prefix?: boolean;
  suffix?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function PriceTag({
  value,
  prefix = true,
  suffix = "/ orang",
  size = "md",
  className,
}: PriceTagProps) {
  const sizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  } as const;
  return (
    <span className={cn("flex flex-wrap items-baseline gap-x-1.5", className)}>
      {prefix && <span className="text-xs font-medium text-brand-muted">mulai</span>}
      <span className={cn("font-heading font-bold text-brand-ink", sizes[size])}>
        {formatRupiah(value)}
      </span>
      {suffix && <span className="text-xs text-brand-muted">{suffix}</span>}
    </span>
  );
}
