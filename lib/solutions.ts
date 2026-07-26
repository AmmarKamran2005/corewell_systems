/**
 * Solutions catalog — docs/spec.md Section 3 (IA) and Section 5.
 * Framed as capabilities, not tech stack (Section 13: outcome language,
 * technical detail only in the collapsed "Under the hood" section).
 * Copy drafted in-house with owner approval (2026-07) — describes what
 * engagements include; makes no client, metric, or delivery-date claims.
 */

export type Solution = {
  slug: string;
  name: string;
  oneLiner: string;
  /** The operational problem this capability addresses. */
  problem: string;
  /** What an engagement covers. */
  included: string[];
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
    underTheHood:
      "Modern TypeScript stack (Next.js/React front end, Node or serverless APIs), relational data modeling on PostgreSQL, role-based access control, automated backups, and CI/CD pipelines. Architecture is documented and handed over — no lock-in.",
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
    underTheHood:
      "Multi-tenant PostgreSQL design (row-level security or schema-per-tenant, as the workload demands), payment-provider billing integration, background job queues, structured logging and observability, and infrastructure as code.",
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
    underTheHood:
      "React Native or Flutter clients sharing your existing API, offline caching with conflict resolution, and secure token-based authentication.",
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
    underTheHood:
      "Vercel, AWS, or Azure depending on the workload; infrastructure as code; TLS everywhere; least-privilege access management; encrypted backups with restore drills; uptime monitoring with alerting.",
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
    underTheHood:
      "Server-side LLM integration (Anthropic's Claude), retrieval over your own data where needed, guardrails and audit logs on every automated action, and no customer data used for model training.",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
