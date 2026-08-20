/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * Shipped in REPORT-ONLY first (see `headers()` below). Load every page —
 * especially /book-consultation with its Cal.com embed and one demo route —
 * check the console for violations, then switch the header name to
 * `Content-Security-Policy` to enforce. A CSP that breaks the booking embed
 * costs more than it protects.
 *
 * What each origin is for:
 *   - app.cal.com / cal.com  — the booking embed loads a script and an iframe
 *   - plausible.io           — analytics, rendered only when the env var is set
 *   - 'unsafe-inline' (style) — Tailwind and next/font inject inline styles
 *   - 'unsafe-inline' (script) — required by Next's inline bootstrap; tightening
 *     this needs a nonce, which is a separate change
 * Fonts are self-hosted by next/font, so no Google Fonts origin is needed.
 * generativelanguage.googleapis.com is called server-side only and must NOT
 * appear here.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://cal.com https://plausible.io",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self' https://app.cal.com https://cal.com https://plausible.io",
  "frame-src 'self' https://app.cal.com https://cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  // `upgrade-insecure-requests` is ignored in a report-only policy and logs a
  // console error saying so — which buries the real violations this mode
  // exists to surface. Add it back in the same commit that switches the
  // header name to the enforcing `Content-Security-Policy`.
].join("; ");

const securityHeaders = [
  // Vercel already sends max-age=63072000. `includeSubDomains` would also bind
  // trade.corewellsystems.com and any future subdomain to HTTPS-only, and
  // `preload` is effectively irreversible — both await an owner decision.
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Frame protection comes from CSP `frame-ancestors`; X-Frame-Options is kept
  // for older agents that do not honour it.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy-Report-Only", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
