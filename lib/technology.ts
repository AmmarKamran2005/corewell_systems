/**
 * Technology stack — for the technical evaluator, never for the headline
 * (spec Section 13: lead with the outcome, keep the stack available for
 * buyers who want it).
 *
 * TWO HONESTY TIERS, and the page shows the difference:
 *
 * - "shipped": we have production or fully-built systems running on this.
 *   Verified against our own codebases.
 * - "works":   the team works in this and takes engagements with it, but our
 *   published systems don't feature it. Confirmed by the owner 2026-07.
 *
 * Never promote something from "works" to "shipped" without evidence.
 */

export type Tier = "shipped" | "works";

export type Tech = {
  name: string;
  tier: Tier;
  /** What it is actually used for — never a bare noun. */
  use: string;
};

export type StackGroup = {
  title: string;
  summary: string;
  items: Tech[];
};

export const stack: StackGroup[] = [
  {
    title: "Backend & APIs",
    summary:
      "Where the business rules live. Every rule is enforced here rather than in the interface, so it holds no matter which client calls it.",
    items: [
      {
        name: "ASP.NET Core / C#",
        tier: "shipped",
        use: "Our clinical and equipment platforms — the systems carrying regulated data, audit trails, and full revenue cycles.",
      },
      {
        name: "Node.js / Express",
        tier: "shipped",
        use: "The booking-marketplace API: payments, availability, owner onboarding, and webhook processing.",
      },
      {
        name: "TypeScript",
        tier: "shipped",
        use: "Strict typing end to end on our JavaScript services and front ends — fewer runtime surprises in production.",
      },
      {
        name: "Python",
        tier: "works",
        use: "AI/ML work, data processing, and reporting pipelines where the ecosystem is strongest.",
      },
      {
        name: "PHP / Laravel",
        tier: "works",
        use: "Engagements on existing Laravel systems, and builds where the client's team already maintains PHP.",
      },
    ],
  },
  {
    title: "Web interfaces",
    summary:
      "Interfaces built for people doing a job under time pressure — a front desk at 8am, not a demo audience.",
    items: [
      {
        name: "React",
        tier: "shipped",
        use: "Operational dashboards, booking flows, and admin back offices.",
      },
      {
        name: "Next.js",
        tier: "shipped",
        use: "Server-rendered applications and marketing surfaces where search visibility and first paint matter.",
      },
      {
        name: "Blazor",
        tier: "shipped",
        use: "A .NET web platform where sharing types between server and interface removed a whole class of bugs.",
      },
      {
        name: "Razor / server-rendered .NET",
        tier: "shipped",
        use: "The clinical platforms' interface layer, paired with vanilla ES modules for fast, dependency-light screens.",
      },
      {
        name: "Angular",
        tier: "works",
        use: "Engagements where a client's existing front end or in-house team is already Angular.",
      },
      {
        name: "Tailwind CSS",
        tier: "shipped",
        use: "Design systems that stay consistent across hundreds of screens without a growing stylesheet.",
      },
    ],
  },
  {
    title: "Mobile & devices",
    summary:
      "The parts of an operation that happen away from a desk — and sometimes on hardware doing exactly one job.",
    items: [
      {
        name: "Capacitor / Ionic",
        tier: "shipped",
        use: "A companion clinical app sharing the same API as the web platform, so records never diverge.",
      },
      {
        name: "Native Android (Java/Kotlin)",
        tier: "shipped",
        use: "Two purpose-built tablet applications in production: a lobby check-in station and a card-reader terminal.",
      },
      {
        name: "React Native",
        tier: "works",
        use: "Cross-platform apps where one codebase for iOS and Android is the right trade-off.",
      },
      {
        name: "Flutter",
        tier: "works",
        use: "Cross-platform builds where the client's team or existing app is already Flutter.",
      },
    ],
  },
  {
    title: "Data",
    summary:
      "The part that outlives every interface. Modelled carefully, because a bad schema is expensive for years.",
    items: [
      {
        name: "SQL Server",
        tier: "shipped",
        use: "Clinical and equipment platforms, including row-level security enforcing organisation isolation in the database itself.",
      },
      {
        name: "PostgreSQL",
        tier: "shipped",
        use: "The booking marketplace and a platform that runs the same release against either engine.",
      },
      {
        name: "Entity Framework Core",
        tier: "shipped",
        use: "Data access with global query filters for multi-tenant scoping and interceptors that audit every write automatically.",
      },
      {
        name: "Prisma",
        tier: "shipped",
        use: "Typed database access on our Node services, with transactional writes across bookings, payments, and inventory.",
      },
      {
        name: "MongoDB",
        tier: "works",
        use: "Document-shaped workloads where a relational schema would fight the data rather than describe it.",
      },
    ],
  },
  {
    title: "Real time, AI & payments",
    summary:
      "The parts clients notice most: screens that update themselves, documents that write themselves, and money that arrives.",
    items: [
      {
        name: "SignalR / WebSockets",
        tier: "shipped",
        use: "Live schedule updates, consent notifications, and a desktop-to-tablet payment bridge — nine channels in one platform.",
      },
      {
        name: "LLM APIs (Gemini, Claude)",
        tier: "shipped",
        use: "Ambient documentation, code suggestion, and extraction — always server-side, with identifiers stripped before any call.",
      },
      {
        name: "Stripe (incl. Connect & Terminal)",
        tier: "shipped",
        use: "Card payments, marketplace payouts to third-party accounts, platform fees, subscriptions, and tap-to-pay on a tablet.",
      },
      {
        name: "EDI / clearinghouse integration",
        tier: "shipped",
        use: "Electronic insurance claims with payer acknowledgements and remittances ingested and posted automatically.",
      },
      {
        name: "Cloud object storage",
        tier: "shipped",
        use: "Encrypted documents and media with signed, expiring links rather than public URLs.",
      },
    ],
  },
  {
    title: "Running it",
    summary:
      "Deployment is not the last step of a build — it is the first day of the system's actual life.",
    items: [
      {
        name: "Docker",
        tier: "shipped",
        use: "Reproducible builds, so what passed review is what runs.",
      },
      {
        name: "Vercel / Render / managed cloud",
        tier: "shipped",
        use: "Managed hosting where the workload suits it, with preview environments per change.",
      },
      {
        name: "Windows Server / IIS",
        tier: "shipped",
        use: "On-premises and private-server deployments, including clients whose data cannot leave their own infrastructure.",
      },
      {
        name: "Scheduled backups & monitoring",
        tier: "shipped",
        use: "Encrypted backups to separate storage, health and readiness probes, and alerting — with restores exercised, not assumed.",
      },
    ],
  },
];

/** The reasoning a technical evaluator actually wants to hear. */
export const choices = [
  {
    title: "Boring technology, deliberately",
    detail:
      "We choose mainstream, well-supported tools with long support horizons and a hiring pool. A framework that is exciting this year and unmaintained in three is a liability we would be handing you, not a feature.",
  },
  {
    title: "The stack follows the problem",
    detail:
      "Regulated data with heavy reporting and a long support life goes to .NET and SQL Server. A payments marketplace that must ship fast goes to Node and PostgreSQL. We do not have one hammer and we do not pretend otherwise.",
  },
  {
    title: "One API, every client",
    detail:
      "Web, mobile, and purpose-built devices talk to the same interface, so every rule is written once and enforced on the server. Reimplementing logic per platform is how systems quietly disagree with themselves.",
  },
  {
    title: "Nothing you cannot leave",
    detail:
      "No proprietary runtime, no closed data format, no dependency on us. The code, the schema, and the documented architecture are handed over. We build for the day you might want to run it without us.",
  },
];
