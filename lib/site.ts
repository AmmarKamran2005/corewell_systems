/**
 * Canonical site URL for metadata, JSON-LD, sitemap, and robots.
 * Production domain is the default; local dev overrides via
 * NEXT_PUBLIC_SITE_URL=http://localhost:3000 in .env.local (needed so the
 * OG image's self-fetch of /icon.png works in dev).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://corewellsystems.com";

export const contactEmail = "info@corewellsystems.com";

/**
 * Official profiles. Also emitted as Organization `sameAs` in the root
 * layout, which is how search engines tie the site to these accounts.
 */
export const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/136694124",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/corewellsystems/",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61592221457412",
  },
] as const;
