"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";

// PRD §19 / C8: kegagalan tidak membuat pengunjung buntu — selalu ada jalur WA.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <h1 className="font-heading text-2xl font-bold text-brand-ink">Ada yang tidak beres</h1>
      <p className="mt-2 max-w-sm text-sm text-brand-muted">
        Maaf, halaman ini gagal dimuat. Anda tetap bisa menghubungi tim kami langsung via
        WhatsApp.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Coba lagi</Button>
        <WhatsAppCta ctaPosition="error-page" variant="secondary">
          Chat via WhatsApp
        </WhatsAppCta>
      </div>
    </div>
  );
}
