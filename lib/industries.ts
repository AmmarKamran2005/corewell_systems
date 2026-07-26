/**
 * Single source of truth for industries — docs/spec.md Sections 3, 5, 6.
 *
 * status meanings (spec Sections 6–7):
 * - "demo":    a real underlying system exists; public site shows a generic,
 *              industry-labeled interactive demo (embed lands in Phase 5).
 * - "concept": no real system yet — must carry the visible
 *              "Concept — Available as Custom Build" label. Never fake a demo.
 * - "custom":  the Enterprise/Custom catch-all invitation, not a numbered card.
 *
 * All copy here was provided by the owner (Phase 2 kickoff, spec Section 15)
 * and is final unless they say otherwise. Do not add products, clients, or
 * metrics here — spec Section 7.
 */

export type IndustryStatus = "demo" | "concept" | "custom";

export type Industry = {
  slug: string;
  name: string;
  oneLiner: string;
  status: IndustryStatus;
  /** Generic demo labeling — never a real product name (spec Section 6). */
  demo?: {
    label: string;
    blurb: string;
  };
  /** Capability modules named in owner-provided copy only. */
  modules?: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    oneLiner:
      "Patient records, appointments, billing, and care coordination — systems built for how clinics and hospitals actually run.",
    status: "demo",
    demo: {
      label: "Healthcare Management System — Interactive Demo",
      blurb:
        "Explore a full clinical workflow — patient intake, scheduling, records, and billing — in a live interactive environment.",
    },
    modules: [
      "Patient intake & records",
      "Appointments & scheduling",
      "Billing",
      "Care coordination",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    oneLiner:
      "Front desk, reservations, housekeeping, and reporting in one connected platform for hotels and resorts.",
    status: "demo",
    demo: {
      label: "Hospitality Management System — Interactive Demo",
      blurb:
        "Walk through a hotel's daily operations — bookings, check-in/out, housekeeping, and reporting.",
    },
  },
  {
    slug: "education",
    name: "Education",
    oneLiner:
      "Admissions, attendance, gradebooks, and parent communication — a school management system built around real academic workflows.",
    status: "demo",
    demo: {
      label: "Education Management System — Interactive Demo",
      blurb:
        "See how admissions, attendance, and gradebooks work together in one system.",
    },
  },
  {
    slug: "retail",
    name: "Retail & Shop Management",
    oneLiner:
      "Point-of-sale, inventory, and multi-location reporting that keeps a retail business running without the spreadsheet chaos.",
    status: "demo",
    demo: {
      label: "Retail & POS — Interactive Demo",
      blurb:
        "Try a point-of-sale and inventory system the way your staff would use it on the floor.",
    },
  },
  {
    slug: "construction-real-estate",
    name: "Construction & Real Estate",
    oneLiner:
      "Project timelines, budgets, subcontractor coordination, and property records — built for how construction and real estate teams actually work.",
    status: "concept",
  },
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    oneLiner:
      "Case management, document workflows, billing, and client communication for law firms and professional practices.",
    status: "concept",
  },
  {
    slug: "enterprise",
    name: "Enterprise & Custom",
    oneLiner:
      "Have a workflow no off-the-shelf tool handles? We design custom systems around how your business actually operates.",
    status: "custom",
  },
];

/** The six numbered industry cards (everything except the closing invitation). */
export const cardIndustries = industries.filter((i) => i.status !== "custom");

/** Industries with a real underlying system behind a generic demo. */
export const demoIndustries = industries.filter((i) => i.status === "demo");

export const enterpriseIndustry = industries.find(
  (i) => i.status === "custom"
)!;

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
