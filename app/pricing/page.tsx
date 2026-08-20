import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { canonical } from "@/lib/seo";

/**
 * UNPUBLISHED (owner direction 2026-07): the page is complete but the
 * ranges await sign-off, so it is removed from the nav, the footer, and the
 * sitemap, and marked noindex. It stays reachable by direct link — useful
 * for sharing with a prospect — and republishing is a matter of restoring
 * the nav entries and this metadata block.
 */
export const metadata: Metadata = {
  ...canonical("/pricing"),
  title: "Pricing — Ranges by Project Complexity",
  description:
    "Custom software pricing presented honestly: three engagement tiers with typical ranges, and a tailored quote after a scoping conversation — never a checkout.",
  robots: { index: false, follow: false },
};

/**
 * Pricing as ranges/tiers tied to complexity — spec Section 5: never a fixed
 * price list, always ending in "Get a tailored quote". Ranges are indicative
 * and pending owner sign-off before launch.
 */
const tiers = [
  {
    name: "Starter System",
    tagline: "One core workflow, done right.",
    range: "$8k – $25k",
    for: "Single-location clinics, shops, schools, and practices digitizing their core daily loop.",
    included: [
      "One primary workflow (e.g. appointments + records, or POS + inventory)",
      "Role-based access for a small team",
      "Data migration from spreadsheets",
      "Training and launch support",
    ],
  },
  {
    name: "Growth Platform",
    tagline: "The operation, connected.",
    range: "$25k – $80k",
    for: "Multi-location or multi-department businesses replacing a patchwork of tools.",
    included: [
      "Multiple connected modules across the operation",
      "Multi-location support and consolidated reporting",
      "Automations: reminders, invoicing, alerts",
      "Dashboards for owners and managers",
    ],
    featured: true,
  },
  {
    name: "Enterprise Build",
    tagline: "Custom at organizational scale.",
    range: "Scoped individually",
    for: "Hospitals, groups, and platforms with integrations, compliance, and scale requirements.",
    included: [
      "Complex integrations (labs, payments, channels, claims)",
      "Compliance-grade security and audit trails",
      "Large-scale data migration",
      "SaaS/multi-tenant architecture where needed",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Honest ranges, tailored quotes
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              Custom software isn&apos;t a product with a price tag — it&apos;s
              an engagement scoped to your operation. These tiers show where
              projects typically land, so a quote never surprises you.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 0.06}>
                <Card
                  className={
                    tier.featured
                      ? "h-full border-accent/40 shadow-[0_2px_24px_rgb(15_118_110/0.08)]"
                      : "h-full"
                  }
                >
                  <h2 className="text-lg font-semibold">{tier.name}</h2>
                  <p className="mt-1 text-sm text-soft">{tier.tagline}</p>
                  <p className="mt-4 text-2xl font-semibold text-ink-strong">
                    {tier.range}
                  </p>
                  <p className="mt-1 text-xs text-faint">
                    typical range · every project quoted individually
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-soft">
                    {tier.for}
                  </p>
                  <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                    {tier.included.map((item) => (
                      <li key={item} className="flex gap-3 text-sm text-soft">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed text-faint">
              Ranges are indicative — the real number depends on modules,
              users, integrations, and data migration. After launch, hosting
              and maintenance typically run a modest fraction of the build
              cost per year, and never per-user.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Get a tailored quote
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              A short scoping conversation, then a written quote tied to your
              actual workflow — not a template.
            </p>
            <div className="mt-8">
              <Button href="/book-consultation" size="lg">
                Book a Consultation
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
