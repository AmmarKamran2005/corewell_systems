/**
 * Canonical site URL for metadata, JSON-LD, sitemap, and robots.
 * Production domain is the default; local dev overrides via
 * NEXT_PUBLIC_SITE_URL=http://localhost:3000 in .env.local (needed so the
 * OG image's self-fetch of /icon.png works in dev).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://corewellsystems.com";

export const contactEmail = "info@corewellsystems.com";
