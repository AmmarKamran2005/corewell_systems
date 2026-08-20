/**
 * Minimal in-memory sliding-window rate limiter for API routes (spec
 * Section 11: spam protection — honeypot + rate limiting minimum).
 * Per-instance only; adequate for this site's scale.
 */

const buckets = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

export function clientIp(headers: Headers): string {
  return headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

/**
 * Instance-wide daily ceiling.
 *
 * The per-IP window above is per-instance, so on a serverless platform it is
 * close to no shared limit — and the Gemini route is metered spend. This is a
 * blunt second limit that bounds the worst case per instance rather than per
 * caller, so cost cannot run away while nobody is watching.
 *
 * It is deliberately not a shared store: Vercel KV or Upstash would give a
 * true global window but adds a paid dependency, which is an owner decision.
 * A bounded ceiling beats an unbounded one in the meantime.
 */
const dailyCounters = new Map<string, { day: number; count: number }>();

export function checkDailyCeiling(key: string, maxPerDay: number): boolean {
  const day = Math.floor(Date.now() / 86_400_000);
  const current = dailyCounters.get(key);
  if (!current || current.day !== day) {
    dailyCounters.set(key, { day, count: 1 });
    return true;
  }
  if (current.count >= maxPerDay) return false;
  current.count += 1;
  return true;
}
