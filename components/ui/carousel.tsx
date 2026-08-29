"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  slideClassName?: string;
  ariaLabel: string;
  align?: "start" | "center";
}

// PRD §9.6 Carousel — dipakai testimoni video, galeri, paket serupa.
export function Carousel({
  children,
  className,
  slideClassName,
  ariaLabel,
  align = "start",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align, loop: false, dragFree: false });
  const [prevOk, setPrevOk] = React.useState(false);
  const [nextOk, setNextOk] = React.useState(false);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevOk(emblaApi.canScrollPrev());
    setNextOk(emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const slides = React.Children.toArray(children);

  return (
    <div className={cn("relative", className)} role="region" aria-roledescription="carousel" aria-label={ariaLabel}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((child, i) => (
            <div
              key={i}
              className={cn("min-w-0 shrink-0 grow-0", slideClassName)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${slides.length}`}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!prevOk}
          className="flex size-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink transition-colors hover:bg-brand-ink/5 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label="Sebelumnya"
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!nextOk}
          className="flex size-11 items-center justify-center rounded-full border border-brand-border bg-white text-brand-ink transition-colors hover:bg-brand-ink/5 disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          aria-label="Berikutnya"
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
