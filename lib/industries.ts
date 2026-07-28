import type { CSSProperties } from "react";

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
 * One-liners and demo copy are owner-provided and final. Problem narratives
 * are drafted in-house (owner-approved 2026-07) — they describe generic
 * industry operations and make no client/metric claims (spec Section 7).
 *
 * accent / accentStrong are RGB channel triplets that override the global
 * --color-accent tokens inside industry-scoped sections (spec Section 4
 * motion principles: industry transitions shift the accent theme). Every
 * accent passes WCAG AA against the off-white canvas and as a white-text
 * button fill.
 */

export type IndustryStatus = "demo" | "concept" | "custom";

/**
 * How far the underlying work has actually gone (spec Section 7 — never
 * present design work as running software):
 * - "production": systems of ours running in daily use.
 * - "design":     designed and prototyped by us, offered as a custom build.
 *                 The interactive demo is our own design, not a window onto
 *                 a deployed system.
 * - "concept":    no system yet; custom engagement only.
 */
export type IndustryMaturity = "production" | "design" | "concept";

export type Industry = {
  slug: string;
  name: string;
  oneLiner: string;
  status: IndustryStatus;
  maturity: IndustryMaturity;
  /** Per-industry accent theme (RGB triplets for the CSS variable layer). */
  accent: string;
  accentStrong: string;
  /** Workflow chain rendered as connected nodes (spec Section 4 motion). */
  nodes: string[];
  /** 2–3 sentence operational-problem narrative — generic, no client claims. */
  problem?: string;
  /** Generic demo labeling — never a real product name (spec Section 6). */
  demo?: {
    label: string;
    blurb: string;
    /** True once the sandboxed demo environment is built (Phase 5). */
    available: boolean;
  };
  /** Capability modules surfaced as pills on the industry page. */
  modules?: string[];
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    oneLiner:
      "Patient records, appointments, billing, and care coordination — systems built for how clinics and hospitals actually run.",
    status: "demo",
    maturity: "production",
    accent: "15 118 110", // teal #0F766E (brand default)
    accentStrong: "17 94 89",
    nodes: ["Hospital", "Doctor", "Patient", "Appointment", "Invoice"],
    problem:
      "A clinic's day is a chain of handoffs — front desk to doctor to billing — and every handoff leaks time when records live in filing cabinets, spreadsheets, and memory. Double-booked appointments, missing histories, unbilled visits: none of it is a people problem. It's a systems problem. A purpose-built platform keeps every patient, appointment, and invoice connected, so the chain doesn't break. This is the industry we have built in most deeply — clinical platforms running in daily practice, not concepts.",
    demo: {
      label: "Healthcare Management System — Interactive Demo",
      blurb:
        "Explore a full clinical workflow — patient intake, scheduling, records, and billing — in a live interactive environment.",
      available: true,
    },
    modules: [
      "Patient records & charting",
      "Appointments & scheduling",
      "AI clinical documentation",
      "Insurance & eligibility",
      "Claims & revenue cycle",
      "Patient portal & intake",
      "Kiosk check-in & consents",
      "Telehealth",
      "Payments & plans",
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    oneLiner:
      "Front desk, reservations, housekeeping, and reporting in one connected platform for hotels and resorts.",
    status: "demo",
    maturity: "production",
    accent: "180 83 9", // amber #B45309
    accentStrong: "146 64 14",
    nodes: ["Guest", "Reservation", "Check-in", "Housekeeping", "Invoice"],
    problem:
      "A hotel runs on timing: rooms turn over, guests arrive early, housekeeping works around check-outs, and the front desk holds it all together — often across a paper log, a booking site, and a radio. When those systems don't talk, guests feel it. We build both halves of this: the booking platform guests and property owners meet on, and the operating system that runs the property once they arrive.",
    demo: {
      label: "Hospitality Management System — Interactive Demo",
      blurb:
        "Walk through both sides — book a room as a guest, then run the property as front desk, housekeeping, management, or the platform operator.",
      available: true,
    },
    modules: [
      "Guest booking & payment",
      "Reservations & availability",
      "Front desk",
      "Housekeeping",
      "Guest folios & billing",
      "Owner onboarding",
      "Payouts & subscriptions",
      "Reviews",
      "Reporting",
    ],
  },
  {
    slug: "education",
    name: "Education",
    oneLiner:
      "Admissions, attendance, gradebooks, and parent communication — a school management system built around real academic workflows.",
    status: "demo",
    maturity: "design",
    accent: "67 56 202", // indigo #4338CA
    accentStrong: "55 48 163",
    nodes: ["Student", "Admission", "Attendance", "Gradebook", "Parent update"],
    problem:
      "Schools run on information that moves — admissions files, attendance registers, grade sheets, notes home — and most of it still moves by hand. Teachers re-enter the same data three times, and parents hear about problems weeks late. A system built around real academic workflows records things once and puts them in front of the people who need them. We have designed this system in full and built it as a working prototype — it is offered as a custom build, shaped to your institution.",
    demo: {
      label: "Education Management System — Design Preview",
      blurb:
        "Explore our design for admissions, attendance, and gradebooks working as one system — a prototype on sample data, not a deployed installation.",
      available: true,
    },
    modules: [
      "Admissions",
      "Attendance",
      "Gradebooks",
      "Parent communication",
    ],
  },
  {
    slug: "retail",
    name: "Retail & Shop Management",
    oneLiner:
      "Point-of-sale, inventory, and multi-location reporting that keeps a retail business running without the spreadsheet chaos.",
    status: "demo",
    maturity: "design",
    accent: "190 18 60", // rose #BE123C
    accentStrong: "159 18 57",
    nodes: ["Product", "Inventory", "Sale", "Receipt", "Report"],
    problem:
      "Retail margins die quietly: stock that ran out yesterday, a price changed in one branch but not the other, sales totals reconciled from paper at midnight. The spreadsheet holds — right up until the day it doesn't. A connected POS and inventory system counts, prices, and reports in real time, across every location. We have designed this system in full — including a distribution-scale variant covering purchasing, warehouses, and accounting — and offer it as a custom build.",
    demo: {
      label: "Retail & POS — Design Preview",
      blurb:
        "Try our point-of-sale and inventory design the way staff would use it on the floor — a prototype on sample data, not a deployed installation.",
      available: true,
    },
    modules: ["Point-of-sale", "Inventory", "Multi-location reporting"],
  },
  {
    slug: "construction-real-estate",
    name: "Construction & Real Estate",
    oneLiner:
      "Project timelines, budgets, subcontractor coordination, and property records — built for how construction and real estate teams actually work.",
    status: "concept",
    maturity: "concept",
    accent: "154 52 18", // deep orange #9A3412
    accentStrong: "124 45 18",
    nodes: ["Project", "Timeline", "Budget", "Subcontractors", "Handover"],
    problem:
      "A construction project is a moving target — timelines slip, budgets drift, and subcontractors work from whichever version of the plan they were last sent. The information exists; it's just scattered across phones, inboxes, and site offices. A purpose-built system keeps the timeline, the budget, and every crew reading from the same page.",
    modules: [
      "Project timelines",
      "Budgets",
      "Subcontractor coordination",
      "Property records",
    ],
  },
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    oneLiner:
      "Case management, document workflows, billing, and client communication for law firms and professional practices.",
    status: "concept",
    maturity: "concept",
    accent: "29 78 216", // deep blue #1D4ED8
    accentStrong: "30 64 175",
    nodes: ["Client", "Case", "Documents", "Billing", "Resolution"],
    problem:
      "A law practice bills its time — yet loses hours every week to finding documents, chasing case status, and reconstructing what was said to whom. Files multiply; deadlines don't move. A case management system keeps every matter, document, and billable hour in one place, with nothing slipping through. We have not built one yet, so we label this a custom build rather than pointing you at a demo — but the legal profession is already familiar ground, as the work below shows.",
    modules: [
      "Case management",
      "Document workflows",
      "Billing",
      "Client communication",
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise & Custom",
    oneLiner:
      "Have a workflow no off-the-shelf tool handles? We design custom systems around how your business actually operates.",
    status: "custom",
    maturity: "concept",
    accent: "15 118 110",
    accentStrong: "17 94 89",
    nodes: ["Your workflow", "Discovery", "Design", "Build", "Support"],
  },
];

/** The six numbered industry cards (everything except the closing invitation). */
export const cardIndustries = industries.filter((i) => i.status !== "custom");

/** Industries with a real underlying system behind a generic demo. */
export const demoIndustries = industries.filter((i) => i.status === "demo");

export const enterpriseIndustry = industries.find(
  (i) => i.status === "custom"
)!;

/**
 * Single source for how a demo is labelled, so the badge on the home strip,
 * the industries hub, the industry page, and the demo itself can never drift
 * apart and overstate what exists (spec Section 7).
 */
export function demoBadge(industry: Industry): {
  label: string;
  tone: "live" | "neutral";
  note: string;
} {
  if (industry.maturity === "production") {
    return {
      label: "Interactive Demo",
      tone: "live",
      note: "Backed by systems of ours running in daily use.",
    };
  }
  return {
    label: "Design Preview",
    tone: "neutral",
    note: "Our design, built as a working prototype and available as a custom build. Not a deployed installation.",
  };
}

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** Inline style object that re-themes the accent tokens for one industry. */
export function industryAccentStyle(industry: Industry) {
  return {
    "--color-accent": industry.accent,
    "--color-accent-strong": industry.accentStrong,
  } as CSSProperties;
}
