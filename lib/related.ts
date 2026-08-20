/**
 * Which insight articles belong beside which page.
 *
 * Explicit data rather than runtime inference, so it is reviewable in a diff
 * and cannot silently drift. Every entry is an existing article slug — this
 * file adds no copy of its own; `RelatedReading` renders each article's own
 * title and description from `getInsights()`.
 *
 * Built from what the content already asserts: the `keywords` arrays in each
 * article's frontmatter, the `industry` slug on each case study, and
 * `appliesTo` in lib/solutions.ts. Nothing here is a guess.
 *
 * Ordered most-relevant first; consumers take the first N.
 */

/** Articles that speak to a given industry. */
export const industryReading: Record<string, string[]> = {
  healthcare: [
    "how-much-does-custom-healthcare-software-cost",
    "what-features-does-a-clinic-management-system-need",
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  hospitality: [
    "hotel-management-software-features-that-actually-matter",
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  retail: [
    "what-is-an-online-pos-system",
    "sell-online-without-breaking-your-shop-stock",
    "wholesale-distribution-software-what-it-should-do",
    "how-much-does-a-custom-erp-system-cost",
  ],
  education: [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "construction-real-estate": [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "legal-professional-services": [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  enterprise: [
    "custom-software-vs-off-the-shelf",
    "how-much-does-a-custom-erp-system-cost",
    "what-does-owning-custom-software-actually-save-you",
  ],
};

/** Articles that speak to a given solution. */
export const solutionReading: Record<string, string[]> = {
  "custom-software-development": [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
    "how-much-does-a-custom-erp-system-cost",
  ],
  "saas-platforms": [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "mobile-apps": [
    "what-features-does-a-clinic-management-system-need",
    "what-is-an-online-pos-system",
  ],
  "cloud-deployment": [
    "what-does-owning-custom-software-actually-save-you",
    "how-much-does-a-custom-erp-system-cost",
  ],
  "ai-automation": [
    "what-features-does-a-clinic-management-system-need",
    "what-does-owning-custom-software-actually-save-you",
  ],
};

/** Articles that speak to a given case study, keyed by its industry slug. */
export const caseStudyReading: Record<string, string[]> = {
  healthcare: [
    "what-features-does-a-clinic-management-system-need",
    "how-much-does-custom-healthcare-software-cost",
  ],
  hospitality: ["hotel-management-software-features-that-actually-matter"],
  retail: [
    "what-is-an-online-pos-system",
    "sell-online-without-breaking-your-shop-stock",
  ],
};

/**
 * Article-to-article links. Each article previously ended with no route onward
 * except the global nav, so a reader who finished one had nowhere to go and a
 * crawler saw a dead end.
 *
 * Clusters follow the keyword arrays already in each article's frontmatter:
 * ERP/POS/distribution, healthcare, hospitality, and the cross-cutting
 * build-vs-buy pair.
 */
export const insightReading: Record<string, string[]> = {
  "custom-software-vs-off-the-shelf": [
    "what-does-owning-custom-software-actually-save-you",
    "odoo-alternatives-when-custom-erp-makes-sense",
    "how-much-does-a-custom-erp-system-cost",
  ],
  "what-does-owning-custom-software-actually-save-you": [
    "custom-software-vs-off-the-shelf",
    "how-much-does-a-custom-erp-system-cost",
    "how-much-does-custom-healthcare-software-cost",
  ],
  "how-much-does-a-custom-erp-system-cost": [
    "odoo-alternatives-when-custom-erp-makes-sense",
    "wholesale-distribution-software-what-it-should-do",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "odoo-alternatives-when-custom-erp-makes-sense": [
    "how-much-does-a-custom-erp-system-cost",
    "custom-software-vs-off-the-shelf",
    "wholesale-distribution-software-what-it-should-do",
  ],
  "wholesale-distribution-software-what-it-should-do": [
    "what-is-an-online-pos-system",
    "sell-online-without-breaking-your-shop-stock",
    "how-much-does-a-custom-erp-system-cost",
  ],
  "what-is-an-online-pos-system": [
    "sell-online-without-breaking-your-shop-stock",
    "wholesale-distribution-software-what-it-should-do",
    "how-much-does-a-custom-erp-system-cost",
  ],
  "sell-online-without-breaking-your-shop-stock": [
    "what-is-an-online-pos-system",
    "wholesale-distribution-software-what-it-should-do",
    "custom-software-vs-off-the-shelf",
  ],
  "how-much-does-custom-healthcare-software-cost": [
    "what-features-does-a-clinic-management-system-need",
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "what-features-does-a-clinic-management-system-need": [
    "how-much-does-custom-healthcare-software-cost",
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
  ],
  "hotel-management-software-features-that-actually-matter": [
    "custom-software-vs-off-the-shelf",
    "what-does-owning-custom-software-actually-save-you",
    "how-much-does-a-custom-erp-system-cost",
  ],
};
