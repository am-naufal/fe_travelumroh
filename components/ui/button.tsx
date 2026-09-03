import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// PRD §9.6 varian: primary / dark / secondary / ghost / invert / whatsapp —
// nilai persis dari docs/design/*.html (.btn)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-btn)] font-bold transition-colors duration-200 ease-[var(--ease-out)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand-primary text-white hover:bg-brand-primary-dark",
        dark: "bg-brand-ink text-white hover:bg-brand-ink-2",
        secondary:
          "border-[1.5px] border-brand-primary bg-brand-surface text-brand-primary hover:bg-brand-primary/5",
        ghost: "text-brand-ink hover:bg-brand-ink/5",
        // Varian outline untuk dipakai di atas latar gelap (mis. blok CTA hero)
        invert: "border-[1.5px] border-white/45 bg-white/10 text-white hover:bg-white/15",
        whatsapp: "bg-[#25D366] text-wa-ink hover:bg-[#1fbd5a]",
        accent: "bg-brand-accent text-brand-ink hover:brightness-95",
        danger: "bg-brand-danger text-white hover:brightness-95",
      },
      size: {
        // PRD §13: area sentuh minimal 44px. Tinggi persis dari mockup: 40 / 44 / 48px.
        sm: "h-10 px-3.5 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
