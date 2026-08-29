"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent } from "@/lib/analytics";

// PRD §15: cookie banner untuk skrip pemasaran, dengan opsi menolak.
// Checkbox/consent tidak dianggap "granted" secara default.
export function ConsentBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(getConsent() === null);
  }, []);

  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Persetujuan cookie"
      className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-2xl rounded-[var(--radius-card)] border border-brand-border bg-white p-4 shadow-[var(--shadow-md)] sm:p-5"
    >
      <p className="text-sm text-brand-ink">
        Kami memakai cookie untuk mengukur performa iklan dan konten. Anda bisa menolak
        tanpa memengaruhi fungsi situs.{" "}
        <Link href="/kebijakan-privasi" className="text-brand-primary underline">
          Kebijakan privasi
        </Link>
        .
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => choose("granted")}>
          Terima
        </Button>
        <Button size="sm" variant="secondary" onClick={() => choose("denied")}>
          Tolak
        </Button>
      </div>
    </div>
  );
}
