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

/**
 * HOSPITALITY — two complementary shapes of software, both built:
 * the three-sided booking platform (guest, property owner, platform admin)
 * and the property's own daily operations system.
 */
const hospitality: IndustryCapabilities = {
  verticals: [
    {
      slug: "booking-platform",
      name: "Booking Platforms",
      audience: "Operators running a booking site across many properties",
      summary:
        "A three-sided platform: guests search and pay, property owners list and get paid, and you oversee the whole marketplace from one back office.",
      flow: [
        "Guest searches",
        "Selects rooms",
        "Pays securely",
        "Owner confirms",
        "Stay",
        "Verified review",
      ],
      highlights: [
        "Guests book and pay online, with the confirmation and invoice generated instantly",
        "Property owners onboard themselves — documents verified, listings published only when everything checks out",
        "Payments split automatically: funds land in the owner's own account, your platform fee is collected on the way through",
        "A platform back office over every owner, listing, booking, and payment",
      ],
    },
    {
      slug: "property-operations",
      name: "Property Operations",
      audience: "A single hotel, guest house, or resort",
      summary:
        "The daily operating system of one property — the room board, the arrivals, the housekeeping round, the folio, and the bill.",
      flow: [
        "Reservation",
        "Arrival",
        "Room assigned",
        "Housekeeping",
        "Charges",
        "Checkout",
      ],
      highlights: [
        "One live room board the front desk can trust — who is in, who is due out, what is sellable right now",
        "Housekeeping marks a room ready from the doorway and the desk can sell it the same second",
        "Charges accumulate on the guest folio through the stay, so checkout is a review rather than a reconstruction",
        "The morning report writes itself — occupancy, arrivals, departures, revenue",
      ],
    },
    {
      slug: "multi-property",
      name: "Groups & Portfolios",
      audience: "Owners and managers running several properties",
      summary:
        "Every property individually well-run, and the group finally visible in one place.",
      flow: ["Portfolio", "Property", "Performance", "Payouts"],
      highlights: [
        "One dashboard across every property instead of a phone call to each",
        "Per-property settings, rates, and availability under a single account",
        "Revenue broken down by property, by room type, and by period",
        "Payout schedules and balances visible to the owner without asking",
      ],
    },
  ],

  groups: [
    {
      title: "Reservations & availability",
      summary:
        "Inventory tracked to the night, so the same room is never sold twice.",
      items: [
        "Availability held per room per night, rather than as approximate date ranges — the foundation for a calendar you can trust",
        "Guests choose rooms and quantities with capacity validated against the party size before payment is taken",
        "Cancellation releases the nights back to inventory in the same transaction that voids the booking",
        "Bookings that expire after checkout close themselves and free the rooms automatically",
        "Reservation calendar covering arrivals, departures, and stays in progress",
      ],
    },
    {
      title: "Front desk & housekeeping",
      summary:
        "The three moving parts of a property — desk, rooms, and cleaning — agreeing with each other in real time.",
      items: [
        "Live room board with occupied, due-out, clean, dirty, and out-of-service states",
        "Check-in and check-out without re-typing details the guest already gave",
        "Housekeeping status updated from a phone in the doorway, visible instantly at reception",
        "Guest folios that accumulate room, food, laundry, and late-checkout charges as they happen",
        "Daily operational reporting produced without anyone compiling it",
      ],
    },
    {
      title: "Guest booking experience",
      summary: "A booking journey that finishes, on a phone, without help.",
      items: [
        "Search and filtering by destination, property type, price, rating, and amenities — with shareable filtered links",
        "Property pages with photo galleries, per-room detail, amenities, house rules, and location",
        "Room selection with live pricing, taxes, and a clear total before any card details are entered",
        "Card payment, then an instant confirmation with a downloadable invoice",
        "Guests manage and cancel their own bookings without contacting anyone",
      ],
    },
    {
      title: "Payments, payouts & subscriptions",
      summary:
        "Money that moves correctly on its own, and can be reconciled later.",
      items: [
        "Card payments verified against the payment provider before a booking is ever written — amount, status, and destination all checked",
        "Marketplace payouts that route guest funds directly to the property owner's own account, with the platform fee taken in transit",
        "Owner subscriptions that gate listing visibility, driven by the payment provider's events rather than a nightly job",
        "Refunds issued against the original payment, with inventory released at the same time",
        "Financial reporting read from the payment provider itself, so the ledger and the bank agree",
      ],
    },
    {
      title: "Owner onboarding & platform control",
      summary:
        "Bringing property owners on without letting anything unverified go live.",
      items: [
        "Self-service owner onboarding with identity and ownership documents captured and stored separately from public content",
        "Listing creation as a resumable step-by-step process, so a half-finished property is never lost",
        "Publication gated on several conditions at once — documents verified, subscription active, payouts connected, owner ready",
        "Platform back office over owners, guests, listings, bookings, payments, and reviews",
        "Suspension and reinstatement controls that apply across an owner's entire portfolio",
      ],
    },
    {
      title: "Reviews & trust",
      summary: "Reputation that cannot be manufactured.",
      items: [
        "Reviews tied one-to-one to a completed stay — no stay, no review",
        "Review invitations sent automatically after checkout, through a single-use link that needs no account",
        "Guests choose whether their review is public or private to the property",
        "Ratings computed and shown across search, property pages, and the owner's own dashboard",
      ],
    },
  ],

  assurances: [
    {
      title: "The platform never holds guest money",
      detail:
        "Payments route directly into each property owner's own merchant account, with the platform fee collected on the way through — so settlement, statements, and tax responsibility sit where they belong.",
    },
    {
      title: "A booking exists only if the payment did",
      detail:
        "Before any reservation is written, the payment is re-checked with the provider — status, exact amount, and destination — and the booking, its charges, and its nightly inventory are written together or not at all.",
    },
    {
      title: "Listings go live only when everything checks out",
      detail:
        "A property becomes publicly visible only when its owner's documents are verified, their subscription is active, payouts are connected, and the owner has switched it on — any one lapsing takes it back down automatically.",
    },
    {
      title: "Built for local rules, not a generic template",
      detail:
        "Short-stay accommodation is regulated differently in every market. We have built onboarding around a specific jurisdiction's licensing, tenancy, and accommodation-tax requirements rather than a checkbox.",
    },
  ],
};

export const industryCapabilities: Record<string, IndustryCapabilities> = {
  healthcare,
  hospitality,
};

export function getCapabilities(
  slug: string
): IndustryCapabilities | undefined {
  return industryCapabilities[slug];
}
