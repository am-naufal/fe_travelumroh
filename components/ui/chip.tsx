import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Chip filter/pilihan — PRD §9.6. Nilai persis dari docs/design/*.html
 * (.chip): pil penuh, padding 7px 13px, font 13px/600.
 */
export const Chip = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }
>(({ className, selected = false, type = "button", ...props }, ref) => (
  <button
    ref={ref}
    type={type}
    aria-pressed={selected}
    className={cn(
      "inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-[var(--radius-chip)] px-[13px] py-[7px] text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary",
      selected
        ? "border border-brand-primary bg-brand-primary text-white"
        : "border border-brand-border bg-white text-brand-muted-2 hover:border-brand-primary/40",
      className,
    )}
    {...props}
  />
));
Chip.displayName = "Chip";
