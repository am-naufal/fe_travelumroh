"use client";

import * as React from "react";
import { CheckCircle2, AlertTriangle, X, Info } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";
interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast harus di dalam <ToastProvider>");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);

  const toast = React.useCallback((message: string, variant: ToastVariant = "info") => {
    const id = Date.now() + Math.random();
    setItems((prev) => [...prev, { id, message, variant }]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismiss = (id: number) => setItems((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4"
        role="region"
        aria-live="polite"
        aria-label="Notifikasi"
      >
        {items.map((t) => {
          const Icon =
            t.variant === "success" ? CheckCircle2 : t.variant === "error" ? AlertTriangle : Info;
          return (
            <div
              key={t.id}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-2.5 rounded-xl border bg-white p-3.5 text-sm shadow-[var(--shadow-md)]",
                t.variant === "success" && "border-brand-success/30",
                t.variant === "error" && "border-brand-danger/30",
                t.variant === "info" && "border-brand-border",
              )}
            >
              <Icon
                className={cn(
                  "mt-0.5 size-5 shrink-0",
                  t.variant === "success" && "text-brand-success",
                  t.variant === "error" && "text-brand-danger",
                  t.variant === "info" && "text-brand-primary",
                )}
                aria-hidden
              />
              <p className="flex-1 text-brand-ink">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 text-brand-muted hover:text-brand-ink"
                aria-label="Tutup notifikasi"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
