/**
 * Canonical site URL for metadata, JSON-LD, sitemap and robots.
 *
 * `www`, not the apex. Production serves from www and 308-redirects the apex
 * to it, so the previous apex value meant every canonical, all 39 sitemap
 * URLs and the JSON-LD @id pointed at a redirecting host. Declared identity
 * now matches served identity.
 *
 * Everything downstream derives from this constant, so changing hosts stays a
 * one-line edit. Local dev overrides via NEXT_PUBLIC_SITE_URL in .env.local.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.corewellsystems.com";

export const contactEmail = "info@corewellsystems.com";

/**
 * Corewell Trade — the distribution ERP, till and storefront, deployed as a
 * public demonstration. Linked from the nav and from the Retail demo page.
 *
 * It is a prototype on fabricated data with no backend, so it stays a Design
 * Preview wherever it is referenced. The app labels itself as a demonstration
 * system on every screen.
 */
export const tradeDemoUrl =
  process.env.NEXT_PUBLIC_DEMO_TRADE_URL ?? "https://trade.corewellsystems.com";

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
  | { url: string; name: string; blurb: string; pageHref?: string }
  | undefined
> = {
  retail: {
    url: tradeDemoUrl,
    name: "Corewell Trade",
    blurb:
      "The complete system — trade desk, point-of-sale till and consumer storefront over one catalogue, one stock pool and one ledger, all on sample data.",
    /** The product page on this site, for a reader who wants the tour first. */
    pageHref: "/trade",
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
