"use client";

import { Carousel } from "@/components/ui/carousel";
import { VideoTestimonialCard } from "@/components/testimonial/video-testimonial-card";
import type { Testimoni } from "@/lib/cms/schema";
import { SectionHeading } from "./section-heading";

// PRD §7.1 blok 6: carousel 3–5 video pendek 9:16.
export function VideoTestimonials({ testimoni }: { testimoni: Testimoni[] }) {
  const withVideo = testimoni.filter((t) => t.video).slice(0, 5);
  if (withVideo.length === 0) return null;

  return (
    <section className="bg-white">
      <div className="container-page py-12">
        <SectionHeading
          kicker="Cerita jamaah"
          title="Mereka yang sudah berangkat bersama kami"
          link={{ href: "/testimoni", label: "Semua testimoni" }}
        />
        <Carousel
          ariaLabel="Video testimoni jamaah"
          slideClassName="w-[62%] max-w-[240px] sm:w-[240px]"
        >
          {withVideo.map((t) => (
            <VideoTestimonialCard key={t.slug} testimoni={t} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
