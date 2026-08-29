import { cn } from "@/lib/utils";

/**
 * Pola geometri islami tipis sebagai aksen — PRD §9.1
 * ("satu pola geometri tipis, bukan latar penuh").
 */
export function IslamicPattern({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full text-white/10", className)}
      aria-hidden
      focusable="false"
    >
      <defs>
        <pattern id="luhas-geom" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M24 2l9.5 9.5L44 24l-10.5 12.5L24 46l-9.5-9.5L4 24l10.5-12.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#luhas-geom)" />
    </svg>
  );
}
