/**
 * Solutions catalog — docs/spec.md Section 3 (IA) and Section 5.
 * Framed as capabilities, not tech stack (Section 13: outcome language,
 * technical detail only in the collapsed "Under the hood" section).
 *
 * PROVENANCE RULE (spec Sections 1 + 7): every `proof` entry describes
 * something that exists in a system we have designed and built. Product
 * names, client names, and live URLs never appear. Where an underlying
 * system is prototype-stage, its capability is described as design work or
 * omitted — never presented as running software.
 */

export type Solution = {
  slug: string;
  name: string;
  oneLiner: string;
  /** The operational problem this capability addresses. */
  problem: string;
  /** What an engagement covers. */
  included: string[];
  /** Evidence ledger — real things built, stated flatly. */
  proof: { title: string; detail: string }[];
  /** Industry slugs where this capability has shipped. */
  appliesTo: string[];
  /** Collapsed technical note for technical buyers — never in headlines. */
  underTheHood: string;
};

export const solutions: Solution[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    oneLiner:
      "When off-the-shelf tools force your team to work around the software, we build the system that works around your team.",
    problem:
      "Most businesses don't have a software problem — they have a workflow problem no off-the-shelf product quite fits. So teams bridge the gaps with spreadsheets, group chats, and habits only one person understands. We design and build systems around the workflow you already run: the software adapts, not the operation.",
    included: [
      "Workflow discovery and system design",
      "A custom web application, built and deployed",
      "Data migration from spreadsheets and legacy tools",
      "Training for your team",
      "Post-launch support and improvements",
    ],
    proof: [
      {
        title: "Whole operations, not single modules",
        detail:
          "The platforms we build cover an organisation end to end — scheduling, records, documentation, compliance, billing, and payment collection in one system, rather than a tool that solves one step and hands off the rest.",
      },
      {
        title: "Systems people use all day, every day",
        detail:
          "Software that staff depend on hour by hour is built differently from software they visit occasionally. Ours handles the awkward reality: appointments that run long, corrections after a record is signed, and the approval steps a business needs when someone makes a mistake.",
      },
      {
        title: "Legacy data brought across, not abandoned",
        detail:
          "We have migrated live records into new systems while they remained in use — including converting existing data into encrypted storage in the background, with progress reporting, so the switch never stopped the business.",
      },
      {
        title: "Maintained through real incidents",
        detail:
          "Our production systems have documented recovery procedures, staged release processes with named rollback points, and change logs that record what was touched and how it was verified. Building it is the first half of the job.",
      },
    ],
    appliesTo: ["healthcare", "hospitality", "retail", "education"],
    underTheHood:
      "Modern TypeScript and .NET stacks, relational data modeling on PostgreSQL or SQL Server, role-based access control enforced server-side, automated backups, and staged release pipelines. Architecture is documented and handed over — no lock-in.",
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platforms",
    oneLiner:
      "Product-grade platforms that serve many customers from one codebase — accounts, billing, and updates included.",
    problem:
      "Turning a working system into a platform others can subscribe to is a different engineering problem: many organizations on one codebase, each with its own users, data, and settings. We build multi-tenant platforms that stay fast, private, and updatable as the customer list grows.",
    included: [
      "Multi-tenant architecture with strict data isolation",
      "Subscription and billing integration",
      "Admin and customer-facing dashboards",
      "Usage analytics and reporting",
      "Scalable cloud deployment",
    ],
    proof: [
      {
        title: "Isolation enforced three levels deep",
        detail:
          "Customer data is separated by organisation, by site within that organisation, and by which sites each user may reach — with the final boundary enforced by the database itself, so one customer's records stay unreachable even if application code were at fault.",
      },
      {
        title: "Every customer configured independently",
        detail:
          "Each organisation runs on its own subdomain with its own plan and limits, and each of its sites carries its own time zone, tax and facility identifiers, feature toggles, and even its own payment account — from a single deployment.",
      },
      {
        title: "Billing that actually controls access",
        detail:
          "We have built subscription billing where a lapsed payment automatically withdraws the customer's listings across the platform and a successful payment restores them — driven by the payment provider's own events, not a nightly script.",
      },
      {
        title: "Platform revenue built into the transaction",
        detail:
          "For platforms that process payments on behalf of their customers, we implement per-transaction platform fees with different rates for online and in-person payments, configurable per site, while each customer keeps their own merchant account and settlement.",
      },
      {
        title: "One API, many clients",
        detail:
          "The same interface serves the web application, a companion mobile app, and purpose-built tablet devices — so every rule is enforced once, on the server, rather than reimplemented per client.",
      },
    ],
    appliesTo: ["healthcare", "hospitality"],
    underTheHood:
      "Multi-tenant PostgreSQL and SQL Server designs using row-level security and request-scoped tenant context, subscription and marketplace billing with idempotent webhook reconciliation, background job processing, structured logging, and infrastructure as code.",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    oneLiner:
      "The parts of your operation that happen away from a desk — put in your team's and customers' pockets.",
    problem:
      "Some work never sits at a desk: staff on rounds, crews between floors, customers booking from the couch. If your system only lives in a browser at reception, everyone else is working blind. We build mobile apps that extend your operational system to wherever the work actually happens.",
    included: [
      "iOS and Android from one codebase",
      "Offline-first data sync where the work demands it",
      "Push notifications tied to real operational events",
      "App store submission and release management",
      "The same backend as your web system — one source of truth",
    ],
    proof: [
      {
        title: "Companion apps that share the web system's brain",
        detail:
          "We have shipped mobile apps that run on the same interface as the web platform — so a record created on a phone in a treatment room is the same record the front desk sees, with no syncing layer to drift out of step.",
      },
      {
        title: "Purpose-built devices, not just phone apps",
        detail:
          "Two native tablet applications in production: a lobby check-in station patients use themselves, and a card-reader terminal that turns an ordinary tablet into a payment device — each locked to one job and paired to a specific site.",
      },
      {
        title: "Capture that survives the real world",
        detail:
          "Recording in the field fails in specific ways: the screen locks, the microphone disconnects, the signal drops. Our capture keeps the screen awake, detects each of those failures as it happens, uploads in small pieces so nothing is lost, and resumes exactly where it stopped.",
      },
      {
        title: "Old versions can't break your data",
        detail:
          "Released apps check in against a minimum supported version, so a phone left un-updated for six months is told to update rather than allowed to write against an interface it no longer understands.",
      },
      {
        title: "Devices that talk to each other live",
        detail:
          "A charge started on a desktop appears instantly on the tablet in the patient's hand, and the result lands back on the desktop — devices coordinated in real time rather than each polling for changes.",
      },
    ],
    appliesTo: ["healthcare", "retail"],
    underTheHood:
      "Cross-platform clients over the existing API, native Android where hardware access demands it, real-time coordination over persistent connections, push delivery through Firebase, chunked upload with resume, and server-enforced version gating.",
  },
  {
    slug: "cloud-deployment",
    name: "Cloud & Deployment",
    oneLiner:
      "Reliable, secure hosting for the systems your business depends on — backed up, monitored, and boring in the best way.",
    problem:
      "A system your business runs on can't live on someone's laptop or a forgotten server under a desk. It has to survive a power cut, a bad deploy, and a growing team hitting it all at once. We deploy and run systems on cloud infrastructure with backups, monitoring, and security handled — so uptime becomes something you stop thinking about.",
    included: [
      "Cloud environment setup and migration",
      "Automated backups with tested recovery",
      "Monitoring and alerting",
      "Security hardening and access control",
      "Ongoing maintenance and updates",
    ],
    proof: [
      {
        title: "Backups that go somewhere else",
        detail:
          "Databases back up on a schedule to cloud storage separate from the server they came from, with a restore path that has been exercised rather than assumed.",
      },
      {
        title: "Health checks that say what is wrong",
        detail:
          "Our deployments expose a liveness check and a readiness check that actually reaches the database — and when it fails, it reports the reason instead of a bare error code.",
      },
      {
        title: "Startup that tolerates a bad boot order",
        detail:
          "When a server restarts, the application and the database rarely come back in the right order. Ours waits and retries rather than dying silently and leaving a running process serving errors.",
      },
      {
        title: "Portable by construction",
        detail:
          "We have built systems whose same release runs against different database engines and different hosting providers, with the connection details resolved at startup — so a hosting decision is not a rewrite.",
      },
      {
        title: "Releases that can be undone",
        detail:
          "Changes ship in small increments with named rollback artifacts, database changes applied as reviewed scripts rather than automatic migrations against live data, and a documented verification step before the next release begins.",
      },
    ],
    appliesTo: ["healthcare", "hospitality", "education", "retail"],
    underTheHood:
      "Vercel, Render, cloud VMs, or on-premises IIS depending on the workload; cloud object storage with signed URLs and versioning; TLS termination with forwarded-header handling; rate limiting and hardened security headers; scheduled encrypted backups; readiness and liveness probes.",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    oneLiner:
      "The repetitive reading, writing, and routing work inside your operation — done by software, checked by your team.",
    problem:
      "Every operation has work that's judgment-light but time-heavy: summarizing intake forms, drafting routine replies, routing requests, keying data out of documents. That work is now automatable — reliably, inside your own system, with your team reviewing the output. We build AI into operational software where it saves real hours, not where it makes good demos.",
    included: [
      "Automation assessment on your real workflows",
      "AI features built into your existing system",
      "Document and data extraction pipelines",
      "Human review and approval flows",
      "Measurement of the hours actually saved",
    ],
    proof: [
      {
        title: "A conversation becomes a finished document",
        detail:
          "We have AI documentation running in production: a professional records a meeting, and the system transcribes it and drafts a structured document in that organisation's own template — reviewed and approved by a person before it counts.",
      },
      {
        title: "Identifiers removed before the model sees anything",
        detail:
          "Names, dates of birth, record numbers, phone numbers, and email addresses are stripped from text before it reaches an AI model, and re-associated afterwards. Privacy is a design constraint in these systems, not a policy statement.",
      },
      {
        title: "Suggestions that show their reasoning",
        detail:
          "The classification and coding our systems propose always arrives with the evidence behind it, so the person approving can check the logic in seconds instead of trusting a label.",
      },
      {
        title: "Structured records pulled out of prose",
        detail:
          "Free-written documents are read and turned into structured data — goals, plans, referring parties, projected schedules — populating fields a person would otherwise re-key from something they just wrote.",
      },
      {
        title: "Prompts tuned without a redeploy",
        detail:
          "The instructions driving generation live in an editable file the system reloads on change, so refining how output reads takes minutes and never requires a release.",
      },
      {
        title: "Built to fail safely",
        detail:
          "Generation runs as tracked background work with progress, retry, and partial-failure recovery — a failed piece is reprocessed from stored source rather than losing the whole job — and an assistant grounded in the product's own documentation answers staff questions in plain language.",
      },
    ],
    appliesTo: ["healthcare"],
    underTheHood:
      "Server-side model integration with no keys exposed to the client, identifier scrubbing ahead of every call, asynchronous job processing with progress reporting and per-unit retry, editable prompt sources loaded at runtime, human approval gates on anything that becomes a record, and audit logging of automated actions.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
