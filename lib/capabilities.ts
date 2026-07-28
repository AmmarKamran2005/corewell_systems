/**
 * Deep capability content per industry — the "what we have actually built"
 * layer beneath the industry one-liners in lib/industries.ts.
 *
 * PROVENANCE RULE (spec Sections 1 + 7): every capability listed here is
 * evidenced in a system we have built. Nothing aspirational, nothing
 * borrowed from a competitor's feature list. Product names, client names,
 * and live URLs never appear — capability is described generically.
 *
 * Anything simulated or prototype-stage in the underlying system is either
 * omitted or explicitly marked, never presented as production capability.
 */

export type CapabilityGroup = {
  /** Short title — reads as an operational area, not a tech component. */
  title: string;
  /** One sentence on the outcome this area delivers. */
  summary: string;
  /** Concrete capabilities. Outcome-first phrasing (spec Section 13). */
  items: string[];
};

export type Vertical = {
  slug: string;
  name: string;
  /** Who this serves, in the buyer's own words. */
  audience: string;
  summary: string;
  /** The distinguishing workflow, as connected steps. */
  flow: string[];
  highlights: string[];
};

export type IndustryCapabilities = {
  /** Sub-markets served inside the industry. */
  verticals: Vertical[];
  /** Capability areas that span the whole industry. */
  groups: CapabilityGroup[];
  /** Trust/compliance facts — only what is genuinely implemented. */
  assurances: { title: string; detail: string }[];
};

/**
 * HEALTHCARE — backed by two production clinical platforms and a working
 * medical-equipment system. This is our deepest domain.
 */
const healthcare: IndustryCapabilities = {
  verticals: [
    {
      slug: "clinics",
      name: "Clinics & Medical Practices",
      audience: "Primary care, internal medicine, and specialty clinics",
      summary:
        "A complete operating system for outpatient care — front desk to clinical documentation to the money that follows the visit.",
      flow: [
        "Book",
        "Check in",
        "Consult",
        "Document",
        "Code",
        "Bill",
        "Collect",
      ],
      highlights: [
        "Guided encounter workspace that walks a provider from vitals to checkout",
        "Clinical notes dictated by voice or generated from the visit itself",
        "Insurance verified in real time before the patient is in the room",
        "Card payments and payment plans built into the visit, not bolted on",
      ],
    },
    {
      slug: "therapy",
      name: "Therapy & Rehabilitation",
      audience: "Physical, occupational, and speech therapy practices",
      summary:
        "Built for the reality therapy clinics live in: authorization limits, visit counts, and insurance that pays by the episode rather than the visit.",
      flow: [
        "Referral",
        "Episode of care",
        "Visit series",
        "Progress",
        "Authorization",
        "Claim",
      ],
      highlights: [
        "Episodes of care that track expected versus delivered visits and warn before authorizations run out",
        "Recurring visit series scheduled in one action, with conflict checking",
        "Workers' compensation, personal injury, and letter-of-protection tracked as first-class cases",
        "Attorney lien letters generated from the record with the clinician's signature",
      ],
    },
    {
      slug: "equipment",
      name: "Medical Equipment Suppliers",
      audience: "Durable and home medical equipment providers",
      summary:
        "Equipment is a delivery business and a subscription business at the same time — the system treats it as both.",
      flow: [
        "Order",
        "Coverage",
        "Dispatch",
        "Delivery",
        "Rental cycle",
        "Claim",
      ],
      highlights: [
        "Serialized units tracked from warehouse to patient, including recalls",
        "Proof-of-delivery signature captured on the doorstep",
        "One delivery automatically opens the rental cycle and prepares the claim",
        "Capped rental periods enforced by the system so you never bill past the limit",
      ],
    },
  ],

  groups: [
    {
      title: "Patient records & clinical charting",
      summary:
        "One chart per patient that every authorized person sees the same way.",
      items: [
        "Complete patient record: demographics, insurance, contacts, and history in one place",
        "Problem list, allergies, medications, immunizations, and family and social history — each with its own review workflow",
        "Nothing is ever silently deleted: every change to a clinical record requires a reason and is recorded",
        "Clinical notes from clinic-authored templates, signed electronically",
        "Corrections after signature handled properly — amendments and addenda with a defined window, full version history, and billing held until the record settles",
        "Document vault with encrypted storage for scans, referrals, and results",
      ],
    },
    {
      title: "AI clinical documentation",
      summary:
        "The note writes itself while the clinician stays with the patient.",
      items: [
        "Ambient recording of the visit, transcribed and turned into a draft note in the clinic's own template",
        "Recording built for the real world: it survives a locked phone screen, a dropped connection, or a disconnected microphone, and resumes where it left off",
        "Voice entry for structured fields, so a provider can dictate straight into the chart",
        "Diagnosis and procedure codes suggested from the note, with the reasoning shown",
        "Patient-friendly visit summaries generated automatically, written in plain language",
        "Patient identifiers are stripped before anything reaches an AI model — a compliance requirement we engineered for, not an afterthought",
      ],
    },
    {
      title: "Scheduling & clinic operations",
      summary: "The day runs from one screen and stays accurate in real time.",
      items: [
        "Multi-provider, multi-location calendar with per-site time zones",
        "Recurring appointment series with automatic conflict detection",
        "Check-in and check-out, including approval workflows when the front desk needs to correct a mistake",
        "Appointments that run long can be extended in place without breaking the rest of the day",
        "Automated appointment reminders ahead of the visit",
        "Provider schedules, time-off requests, and approvals",
        "Live updates across every open screen — no refreshing to see the truth",
      ],
    },
    {
      title: "Insurance & revenue cycle",
      summary:
        "From eligibility check to paid claim, without leaving the system.",
      items: [
        "Real-time insurance eligibility: plan, network status, copay, coinsurance, deductible met, and out-of-pocket maximum",
        "Prior authorization tracking with visit counts and expiry warnings",
        "Charge capture generated from the signed note, not re-entered",
        "Industry-standard claim forms produced and submitted electronically to the clearinghouse",
        "Payer responses and remittance advice ingested automatically — claim status and payments post themselves",
        "Accounts-receivable aging, patient ledgers, refunds, and denial tracking",
      ],
    },
    {
      title: "Patient experience",
      summary:
        "Patients arrive prepared, and stay connected after they leave.",
      items: [
        "Patient portal: upcoming visits, medications, results, documents, balances, and visit summaries",
        "Self-scheduling with live availability, so booking doesn't require a phone call",
        "Digital intake completed on the patient's own phone, on a clinic tablet, or by staff — one system, and the record shows who entered what",
        "Lobby check-in kiosk running on real hardware, with consent forms signed on the spot",
        "Secure two-way messaging between patients and their care team",
        "Video visits with a waiting room, identity verification, and background privacy",
      ],
    },
    {
      title: "Payments & collections",
      summary: "Getting paid is part of the visit, not a separate chase.",
      items: [
        "Card payments online and in the clinic, with the practice holding its own merchant account",
        "Tap-to-pay on a tablet — no separate card terminal to buy or maintain",
        "Copay reminders with a secure pay-by-link",
        "Payment plans that charge automatically on schedule",
        "Patient balances handled with real accounting behaviour: credit on account, funds reserved against plans, and overpayment confirmation",
      ],
    },
  ],

  assurances: [
    {
      title: "Encryption that doesn't break search",
      detail:
        "Sensitive patient fields are encrypted in the database, yet staff can still search by name or phone — solved with searchable-encryption indexes rather than by leaving data exposed.",
    },
    {
      title: "Every access recorded",
      detail:
        "Creates, updates, deletes, and even reads of patient data are logged with the user, the change, and the origin — retained for six years by an automated policy.",
    },
    {
      title: "Roles that mirror a real clinic",
      detail:
        "Separate permissions for clinicians, medical assistants and nurses, front desk, billers, administrators, and read-only auditors — enforced on the server, not just hidden in the interface.",
    },
    {
      title: "Isolation between organizations",
      detail:
        "Multi-clinic deployments are separated at three levels, down to database-enforced row-level security, so one organization's data cannot be reached from another even if application code were at fault.",
    },
  ],
};

export const industryCapabilities: Record<string, IndustryCapabilities> = {
  healthcare,
};

export function getCapabilities(
  slug: string
): IndustryCapabilities | undefined {
  return industryCapabilities[slug];
}
