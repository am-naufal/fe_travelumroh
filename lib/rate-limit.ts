/**
 * Rate limiter in-memory sederhana — PRD §7.11, §15.
 * Cukup untuk satu instance; untuk produksi multi-instance ganti dengan
 * Upstash/Redis (kontrak fungsi tetap sama).
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetAt: number;
}

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  const success = existing.count <= limit;
  return { success, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt };
}

/** Bersihkan bucket kedaluwarsa (panggil sesekali). */
export function sweepRateLimit() {
  const now = Date.now();
  for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
