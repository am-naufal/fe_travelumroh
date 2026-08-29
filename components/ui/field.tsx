"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { required?: boolean }
>(({ className, children, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn("mb-1.5 block text-sm font-medium text-brand-ink", className)}
    {...props}
  >
    {children}
    {required && (
      <span className="text-brand-danger" aria-hidden>
        {" "}
        *
      </span>
    )}
  </LabelPrimitive.Root>
));
Label.displayName = "Label";

const baseControl =
  "w-full rounded-[10px] border border-brand-border bg-white px-3.5 py-2.5 text-base text-brand-ink placeholder:text-brand-muted/60 transition-colors focus:border-brand-primary focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-brand-primary/30 disabled:opacity-60 aria-[invalid=true]:border-brand-danger aria-[invalid=true]:focus:outline-brand-danger/30";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseControl, "min-h-[44px]", className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(baseControl, "min-h-[96px] resize-y", className)} {...props} />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(baseControl, "min-h-[44px] appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-10", className)}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%235A6B8C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
    }}
    {...props}
  />
));
Select.displayName = "Select";

/** Pesan error terhubung ke input via aria-describedby (PRD §13). */
export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-brand-danger">
      {children}
    </p>
  );
}

export function FieldHint({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-xs text-brand-muted">
      {children}
    </p>
  );
}
