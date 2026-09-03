"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export const RadioGroup = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root ref={ref} className={cn("grid gap-2", className)} {...props} />
));
RadioGroup.displayName = "RadioGroup";

export const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn(
      "size-5 shrink-0 rounded-full border border-brand-border bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary data-[state=checked]:border-brand-primary disabled:opacity-50",
      className,
    )}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center after:block after:size-2.5 after:rounded-full after:bg-brand-primary" />
  </RadioGroupPrimitive.Item>
));
RadioGroupItem.displayName = "RadioGroupItem";

/**
 * Kartu pilihan radio dengan label — dipakai di LeadForm (Tunai/Cicilan).
 * Pil terpusat min-height 52px, sesuai docs/design/DaftarDesktop.html.
 */
export function RadioCard({
  value,
  id,
  label,
  description,
}: {
  value: string;
  id: string;
  label: string;
  description?: string;
}) {
  return (
    <label
      htmlFor={id}
      className="flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-brand-border px-3 text-center text-[15px] font-bold text-brand-muted-2 transition-colors has-[:checked]:border-brand-primary has-[:checked]:bg-tint-blue-bg has-[:checked]:text-brand-primary-dark"
    >
      <RadioGroupItem value={value} id={id} />
      <span>
        {label}
        {description && (
          <span className="block text-xs font-normal text-brand-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
