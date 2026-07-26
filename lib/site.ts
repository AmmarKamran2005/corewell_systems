/**
 * Canonical site URL for metadata, JSON-LD, sitemap, and robots. Falls back
 * to localhost until the production domain is live — set
 * NEXT_PUBLIC_SITE_URL in the deployment environment.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
