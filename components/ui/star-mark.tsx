/**
 * Bintang delapan-sudut emas — aksen ornamen geometris hemat (PRD §9.1),
 * dipakai berdampingan dengan wordmark "Luhas" di header/footer dan sebagai
 * penanda eyebrow section. Jalur SVG persis dari docs/design/*.html.
 */
export function StarMark({ className, size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 1.5l2.3 6.1 6.1-2.3-2.3 6.2 2.3 6.1-6.1-2.3L12 22.5l-2.3-6.2-6.1 2.3 2.3-6.1L3.6 5.3l6.1 2.3z" />
    </svg>
  );
}
