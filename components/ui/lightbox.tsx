"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { Gambar } from "@/lib/cms/schema";
import { Figure } from "./media";

// PRD §7.7: galeri dengan lightbox.
export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: Gambar[];
  index: number | null;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;
  const current = open ? images[index] : null;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onNavigate((index! - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((index! + 1) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onNavigate]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-brand-ink/90" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-4 focus:outline-none"
          aria-label="Galeri foto"
        >
          {current && (
            <figure className="relative w-full max-w-3xl">
              <Figure
                image={current}
                sizes="(max-width: 768px) 92vw, 768px"
                className="max-h-[80vh] w-full"
                ratio="4/3"
              />
              <figcaption className="mt-2 text-center text-sm text-white/80">
                {current.alt} · {index! + 1}/{images.length}
              </figcaption>
            </figure>
          )}

          <DialogPrimitive.Close
            className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="size-6" aria-hidden />
          </DialogPrimitive.Close>

          {images.length > 1 && (
            <>
              <button
                onClick={() => onNavigate((index! - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Foto sebelumnya"
              >
                <ChevronLeft className="size-6" aria-hidden />
              </button>
              <button
                onClick={() => onNavigate((index! + 1) % images.length)}
                className="absolute right-4 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Foto berikutnya"
              >
                <ChevronRight className="size-6" aria-hidden />
              </button>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
