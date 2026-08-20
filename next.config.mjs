/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * ENFORCING as of 2026-08-20, after a report-only pass found zero violations
 * across the homepage, /book-consultation (Cal.com embed), a demo route and
 * /trade, with Plausible live. The site loads exactly three external
 * resources: Cal.com's embed script and booking iframe, Plausible, and GA4 —
 * all explicitly allowed below.
 *
 * If you add any third-party script, widget or font host, it must be added
 * here in the same commit or it will be blocked in production.
 *
 * What each origin is for:
 *   - app.cal.com / cal.com  — the booking embed loads a script and an iframe
 *   - plausible.io           — the analytics script and the event POST it sends
 *   - googletagmanager.com   — the GA4 gtag.js loader
 *   - *.google-analytics.com — where GA4 sends its collection beacons
 *     (analytics uses several hostnames and region-sharded subdomains, which
 *     is why these are wildcards rather than a single origin)
 *   - 'unsafe-inline' (style) — Tailwind and next/font inject inline styles
 *   - 'unsafe-inline' (script) — required by Next's inline bootstrap; tightening
 *     this needs a nonce, which is a separate change
 * Fonts are self-hosted by next/font, so no Google Fonts origin is needed.
 * generativelanguage.googleapis.com is called server-side only and must NOT
 * appear here.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://cal.com https://plausible.io https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  "font-src 'self' data:",
  "connect-src 'self' https://app.cal.com https://cal.com https://plausible.io https://www.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src 'self' https://app.cal.com https://cal.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
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
  { key: "Content-Security-Policy", value: csp },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
