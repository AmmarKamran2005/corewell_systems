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
 * Full-system demos hosted outside this site, keyed by industry slug.
 *
 * The in-page sandboxes stay the instant taste; these are the complete
 * applications for a visitor who wants to open every screen. Driven by env so
 * a demo can be deployed and switched on without a code change — an unset
 * value simply hides the link rather than shipping a dead one.
 *
 * Maturity is unchanged by linking one of these: a prototype on sample data is
 * still a Design Preview, however complete it is.
 */
export const fullSystemDemos: Record<
  string,
  { url: string; name: string; blurb: string } | undefined
> = {
  retail: {
    // Defaults to the Vercel deployment; override once a branded subdomain
    // exists, without touching this file.
    url:
      process.env.NEXT_PUBLIC_DEMO_TRADE_URL ??
      "https://corewelltrade.vercel.app",
    name: "Corewell Trade",
    blurb:
      "The complete system — trade desk, point-of-sale till and consumer storefront over one catalogue, one stock pool and one ledger. Around 120 screens, all on sample data.",
  },
};

/**
 * Cal.com scheduling. `calLink` values are the path after cal.com/ —
 * used both by the inline embed and by the plain links that stay visible
 * as a fallback if the embed script ever fails to load.
 */
export const booking = {
  handle: "corewell-systems-scv5vs",
  primary: {
    calLink: "corewell-systems-scv5vs/30min",
    label: "Consultation — 30 minutes",
    hint: "The full conversation about your operation. Pick this one if unsure.",
  },
  short: {
    calLink: "corewell-systems-scv5vs/15min",
    label: "Quick call — 15 minutes",
    hint: "A short introduction, or a single question you want answered.",
  },
} as const;

export const bookingUrl = (calLink: string) => `https://cal.com/${calLink}`;

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
