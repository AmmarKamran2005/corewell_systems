/**
 * Frequently asked questions per industry and per solution.
 *
 * These serve three audiences at once (spec Section 9): a buyer skimming
 * for objections, a search engine looking for rich results, and an AI
 * answer engine looking for a citable question-and-answer pair. Each answer
 * therefore leads with the answer and adds detail after.
 *
 * HONESTY RULES (spec Section 7) — these questions are exactly where a site
 * is tempted to overclaim:
 * - No firm timelines. Ranges and dependencies only.
 * - No prices beyond the published tiers.
 * - Design-stage industries say so in their own answers.
 * - Nothing is claimed that isn't in a system we have built.
 */

export type Faq = { q: string; a: string };

const industryFaqs: Record<string, Faq[]> = {
  healthcare: [
    {
      q: "Can a clinic system handle our insurance billing, or only appointments?",
      a: "It handles the whole revenue cycle. The systems we have built verify a patient's coverage in real time before the visit, capture charges from the signed clinical note rather than by re-typing, produce standard claim forms, submit them electronically, and take in the payer's responses and remittances so claim status and payments post themselves.",
    },
    {
      q: "How do we move years of paper records into a new system?",
      a: "In phases, while you keep working. Migration is part of the build, not an afterthought: existing records are cleaned and imported, and we have moved live data into new storage in the background — with progress reporting — so nothing stopped while the change happened. Nobody has to key in a decade of files over a weekend.",
    },
    {
      q: "Is patient data actually safe in a custom-built system?",
      a: "It is safer than the filing cabinet and the shared spreadsheet it replaces, provided the system is built for it. In ours, sensitive fields are encrypted in the database while still remaining searchable, every create, update, delete and even read of a patient record is logged against a named user, access is separated by role and enforced on the server, and multi-organisation deployments are isolated down to the database itself.",
    },
    {
      q: "Will doctors have to type more than they do now?",
      a: "Less. Our systems include ambient documentation: the visit is recorded, transcribed, and drafted into a clinical note in the clinic's own template, which the clinician reviews and signs. Diagnosis and procedure codes are suggested from that note with the reasoning shown. Patient identifiers are removed before anything reaches an AI model.",
    },
    {
      q: "Can patients book, check in, and pay without calling the front desk?",
      a: "Yes. We have built patient portals with self-scheduling against live availability, digital intake completed on the patient's own phone or a clinic tablet, lobby check-in kiosks with consent forms signed on the spot, and card payments including tap-to-pay on a tablet rather than a separate card terminal.",
    },
  ],

  hospitality: [
    {
      q: "Do we need a booking platform or a property management system?",
      a: "They are different products and we build both. A booking platform is public-facing and three-sided: guests search and pay, property owners list and get paid, and you oversee the marketplace. A property management system is internal: the room board, arrivals, housekeeping, folios, and the daily report. A single hotel usually needs the second; an operator listing many properties needs the first.",
    },
    {
      q: "Can guests book directly with us instead of through a commission site?",
      a: "That is the point of owning the platform. We have built a complete direct-booking journey — search and filtering, property and room detail, live pricing with taxes, card payment, instant confirmation with an invoice, and self-service cancellation — so the booking and the guest relationship stay yours.",
    },
    {
      q: "How does the money reach the property owner?",
      a: "Directly. In the marketplace platform we built, guest payments route into each property owner's own merchant account, with the platform's fee taken in transit — so settlement, statements and tax responsibility sit with the owner and the platform never holds guest funds.",
    },
    {
      q: "How do you stop the same room being sold twice?",
      a: "Availability is held per room per night rather than as approximate date ranges, and a booking is only written after the payment is re-checked with the provider — status, exact amount and destination. The booking, its charges and its nightly inventory are written together or not at all. Cancelling releases those nights in the same transaction.",
    },
    {
      q: "Can one system run several properties?",
      a: "Yes. Each property carries its own rooms, rates, availability and settings under a single account, with performance visible per property and across the group, so comparing sites does not mean phoning each manager.",
    },
  ],

  education: [
    {
      q: "Is this a system you already run somewhere, or a design?",
      a: "A design, and we label it that way deliberately. We have designed a school and coaching-centre management system in full and built it as a working prototype you can explore here — but it is not a deployed installation, and we would not tell you otherwise. Building it for your institution is a custom engagement.",
    },
    {
      q: "Can one system serve both a school and a coaching centre?",
      a: "That is central to the design. A school organises around classes and sections; a coaching academy organises around batches of subject, teacher and timing. The system carries both models and changes its vocabulary and structure to match, while admissions, fees, attendance and communication stay shared.",
    },
    {
      q: "How do parents actually receive information?",
      a: "Through the channel they already use, rather than a portal they will not log into. The design covers attendance alerts, fee reminders, results and announcements pushed out as messages, with a parent view for those who want detail — because a notice that stays inside the software has not been delivered.",
    },
    {
      q: "Does it handle fee collection and defaulters?",
      a: "Yes — invoicing, partial payments, receipts, and a defaulters view with reminders are part of the design, along with reporting on what was expected, invoiced, collected and still outstanding.",
    },
  ],

  retail: [
    {
      q: "Is this a working system or a design?",
      a: "A design. We have designed point-of-sale and inventory management in full — including a distribution-scale variant covering purchasing, warehouses and accounting — and built it as a working prototype you can try here. It is not a deployed installation. Building it for your business is a custom engagement.",
    },
    {
      q: "Can it handle more than one shop?",
      a: "Yes, and that is usually the reason to move off spreadsheets. The design covers stock per branch, transfers between branches, prices set centrally and applied everywhere at once, and reporting that shows each branch separately and the business as a whole.",
    },
    {
      q: "What stops us running out of stock without noticing?",
      a: "Every sale adjusts stock as it happens rather than at a midnight count, and items falling below their reorder level surface themselves as alerts instead of waiting to be discovered by a customer.",
    },
    {
      q: "Can we start with one shop and grow into it?",
      a: "Yes. A system built around your workflow can begin with the counter and inventory and add branches, purchasing and accounting as the business needs them — which is usually cheaper than paying for a platform sized for a business you do not have yet.",
    },
  ],

  "construction-real-estate": [
    {
      q: "Do you already have a system for construction and real estate?",
      a: "No, and we would rather say so than show you a demo that does not exist. Project timelines, budgets, subcontractor coordination and property records are offered as a custom build, designed around how your firm actually runs. Everything we have shipped in other industries — scheduling, documents, approvals, billing, reporting — applies directly to this work.",
    },
    {
      q: "What does a custom build actually involve?",
      a: "Four stages. We start with your operation rather than a feature list, design the workflows and screens for your approval before anything is built, build in short cycles with working software you can review as it goes, then stay on for training, fixes and improvements after launch.",
    },
    {
      q: "How much does a custom system cost?",
      a: "It depends on how much of the operation it covers, how many people use it, and what it has to connect to. Engagements typically fall into three shapes — a focused first system, a connected multi-department platform, or an organisation-scale build — and a real number comes out of a short scoping conversation. We would sooner quote accurately than quickly.",
    },
    {
      q: "Can you start small rather than building everything at once?",
      a: "Almost always the better approach. We would start with the loop that runs most often and costs the most when it breaks, get that live and trusted, then extend. Phasing spreads the cost and reduces the risk of building something nobody adopts.",
    },
  ],

  "legal-professional-services": [
    {
      q: "Do you have a case management system we can see?",
      a: "Not yet, and we label this a custom build rather than dressing up a demo. What we do have is a platform we designed and built for the legal profession — directories, deadline tracking with a subscribable calendar feed, self-service firm portals, editorial publishing and privacy-preserving analytics — so the sector and its expectations are familiar ground.",
    },
    {
      q: "What would a practice system cover?",
      a: "Matters and their documents, deadlines that cannot be missed, time and billing, and client communication in one place — designed around how your practice actually runs. The engineering it would be built on is the same we describe on this page: scoped access, audit trails, and data that stays where it belongs.",
    },
    {
      q: "How is client confidentiality handled?",
      a: "Through the same decisions we make for clinical data: access resolved from the signed-in account rather than anything in the address bar, roles enforced on the server, sensitive fields encrypted at rest, and an audit trail recording who accessed what and when.",
    },
    {
      q: "Can it replace the tools we already pay for?",
      a: "Often, and that is worth calculating before you commit. Per-user subscriptions across several tools compound every year and with every hire, while an owned system is a one-time build plus modest maintenance that does not scale with headcount. If your workflow is standard, keep the standard tools — we will say so.",
    },
  ],
};

const solutionFaqs: Record<string, Faq[]> = {
  "custom-software-development": [
    {
      q: "How is custom software different from configuring an off-the-shelf tool?",
      a: "The software adapts to your workflow instead of the other way around. Off-the-shelf tools are designed for the average business in an industry, which is a business that does not exist — so teams bridge the gaps with spreadsheets, group chats and habits only one person understands. A custom system takes that friction out of the operation instead of layering more capability over it.",
    },
    {
      q: "What happens to the data in our current tools?",
      a: "It comes with you. Data migration is part of the build: existing records are cleaned, mapped and imported, and we have moved live data into new systems while they remained in use, so the switch never stopped the business.",
    },
    {
      q: "Do we own the software when it is finished?",
      a: "Yes. The system, its data and its documented architecture are yours. The stack it runs on is mainstream and well supported, chosen so that maintaining it never depends on our availability.",
    },
    {
      q: "What happens after launch?",
      a: "Training, fixes and improvements as the business changes. Our production systems carry documented recovery procedures, staged releases with named rollback points, and change logs recording what was touched and how it was verified. Most of a system's life happens after launch, and it is budgeted for.",
    },
  ],

  "saas-platforms": [
    {
      q: "How is customer data kept separate on a shared platform?",
      a: "At three levels, with the last one enforced by the database itself. Data is separated by organisation, by site within that organisation, and by which sites each user may reach — so one customer's records stay unreachable even if application code were at fault. This is engineering we have shipped, not a configuration setting.",
    },
    {
      q: "Can each customer have their own settings and branding?",
      a: "Yes. In the platforms we have built, every organisation runs on its own subdomain with its own plan and limits, and each of its sites carries its own time zone, tax and identification details, feature toggles and even its own payment account — all from a single deployment.",
    },
    {
      q: "How does subscription billing control access?",
      a: "Automatically, driven by the payment provider's own events rather than a nightly script. We have built platforms where a lapsed payment withdraws that customer's listings across the whole platform and a successful payment restores them, with the customer's dashboard gated on every navigation.",
    },
    {
      q: "Can the platform earn a fee on transactions it processes?",
      a: "Yes. We implement per-transaction platform fees with different rates for online and in-person payments, configurable per site, while each customer keeps their own merchant account and settlement — so the platform earns without ever holding the customer's money.",
    },
  ],

  "mobile-apps": [
    {
      q: "Do we need a separate system for the mobile app?",
      a: "No — that is usually the mistake. Our mobile apps run on the same interface as the web platform, so a record created on a phone is the same record the office sees, with no syncing layer to drift out of step and no rule implemented twice.",
    },
    {
      q: "What happens when the signal drops mid-task?",
      a: "The work survives. Capture in the field fails in specific ways — the screen locks, the microphone disconnects, the network drops — so we detect each of those as it happens, upload in small pieces so nothing is lost, and resume exactly where it stopped.",
    },
    {
      q: "Can a tablet replace hardware we would otherwise buy?",
      a: "Often. We have built two purpose-built tablet applications in production: a lobby check-in station customers use themselves, and a card-reader terminal that turns an ordinary tablet into a payment device — each locked to one job and paired to a specific site.",
    },
    {
      q: "What stops an out-of-date app from corrupting our data?",
      a: "Released apps check in against a minimum supported version. A device left un-updated is told to update before it can write against an interface it no longer understands.",
    },
  ],

  "cloud-deployment": [
    {
      q: "Where will our system actually run?",
      a: "Wherever suits the workload — managed cloud platforms, cloud virtual machines, or your own servers. We have built systems whose same release runs against different database engines and different hosting providers with the connection details resolved at startup, so a hosting decision is not a rewrite.",
    },
    {
      q: "How are backups handled, and have they been tested?",
      a: "Databases back up on a schedule to storage separate from the server they came from, and the restore path is exercised on a schedule of its own. A backup nobody has ever restored is only a hope.",
    },
    {
      q: "What happens if the server restarts at 3am?",
      a: "It comes back on its own. Applications and databases rarely restart in the right order, so ours wait and retry instead of dying silently and leaving a process serving errors until someone notices in the morning.",
    },
    {
      q: "How do you deploy changes without breaking what works?",
      a: "In small increments with named rollback artifacts, with database changes applied as reviewed scripts rather than automatic migrations against live data, and a documented verification step before the next release begins.",
    },
  ],

  "ai-automation": [
    {
      q: "Is our data used to train someone else's AI model?",
      a: "No. Identifiers are stripped from text before it reaches a model, generation runs server-side under our own keys with no data used for model training, and every automated action is logged. Privacy is a design constraint in these systems, not a policy statement.",
    },
    {
      q: "What if the AI gets something wrong?",
      a: "A person approves it before it counts. Nothing generated becomes a record on its own — the output is drafted for review, and the suggestions our systems make arrive with the evidence behind them so the reviewer can check the logic in seconds instead of taking a label on trust.",
    },
    {
      q: "Where does AI actually save time?",
      a: "In work that is judgment-light but time-heavy: turning a recorded conversation into a structured document, pulling fields out of free-written text, classifying and coding, and summarising for a non-expert reader. We build it where it removes hours, not where it makes a good demo.",
    },
    {
      q: "Can we change how it writes without paying for a new release?",
      a: "Yes. The instructions driving generation live in an editable file the system reloads on change, so refining tone and structure takes minutes and never requires a deployment.",
    },
  ],
};

export function getIndustryFaqs(slug: string): Faq[] {
  return industryFaqs[slug] ?? [];
}

export function getSolutionFaqs(slug: string): Faq[] {
  return solutionFaqs[slug] ?? [];
}
