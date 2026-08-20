import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { AppliesTo } from "@/components/solutions/AppliesTo";
import { ProofLedger } from "@/components/solutions/ProofLedger";
import { FaqSection } from "@/components/FaqSection";
import { getSolutionFaqs } from "@/lib/faqs";
import { getSolution, solutions } from "@/lib/solutions";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedReading } from "@/components/RelatedReading";
import { solutionReading } from "@/lib/related";
import { canonical, jsonLdScript } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.oneLiner,
    ...canonical(`/solutions/${params.slug}`),
  };
}

/**
 * Solution page template — spec Section 5: problem it solves → what's
 * included → evidence → example industries → CTA, with technology detail
 * only inside the collapsed "Under the hood" section (spec Section 13).
 *
 * The evidence ledger is the page's centre of gravity: this site sells to
 * buyers assessing risk, so proof outranks description.
 */
export default function SolutionPage({ params }: Props) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  const index = solutions.findIndex((s) => s.slug === solution.slug);

  // No price fields anywhere in this node — spec Section 5 forbids published
  // fixed prices. `provider` references the Organization by @id rather than
  // inlining a second copy of it.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: solution.name,
    description: solution.oneLiner,
    serviceType: solution.name,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "Worldwide",
    url: `${siteUrl}/solutions/${solution.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(serviceJsonLd) }}
      />
      <Container className="pt-8">
        <Breadcrumbs
          trail={[
            { name: "Home", href: "/" },
            { name: "Solutions", href: "/solutions" },
            { name: solution.name, href: `/solutions/${solution.slug}` },
          ]}
        />
      </Container>
      {/* Lede — oversized numeral sets an editorial, indexed tone */}
      <section className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <Reveal mode="mount">
            <div className="flex items-baseline gap-4">
              <span
                aria-hidden
                className="font-display text-sm font-semibold tabular-nums tracking-display text-accent"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-faint">
                Solutions
              </span>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              {solution.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              {solution.oneLiner}
            </p>
            <div className="mt-8">
              <Button href="/book-consultation">Book a Consultation</Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Problem + inclusions, side by side */}
      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                The problem it solves
              </h2>
              <p className="mt-4 text-base leading-relaxed text-soft">
                {solution.problem}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                What&apos;s included
              </h2>
              <ul className="mt-4 space-y-3">
                {solution.included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="text-base leading-relaxed text-soft">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Evidence ledger — the page's centre of gravity */}
      <section className="py-16 sm:py-24">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Evidence
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              What we have actually built
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              Each entry below exists in a system we designed and shipped.
              Client and product names are withheld by policy — the
              engineering is not.
            </p>
          </Reveal>
          <ProofLedger entries={solution.proof} />
        </Container>
      </section>

      {/* Where it has shipped + technical detail */}
      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Where this shows up
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-soft">
              Industries where we have delivered this capability. It applies
              well beyond them — these are the ones with systems behind them.
            </p>
            <AppliesTo slugs={solution.appliesTo} />

            {/* Technical detail stays collapsed and out of headlines */}
            <details className="mt-12 rounded-2xl border border-line bg-surface p-6 open:pb-6 sm:p-8">
              <summary className="cursor-pointer text-sm font-medium text-ink">
                Under the hood — for technical buyers
              </summary>
              <p className="mt-4 text-sm leading-relaxed text-soft">
                {solution.underTheHood}
              </p>
              <a
                href="/technology"
                className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-strong"
              >
                Full technology stack, and why we chose it →
              </a>
            </details>
          </Reveal>
        </Container>
      </section>

      <FaqSection
        faqs={getSolutionFaqs(solution.slug)}
        title={`${solution.name}, answered plainly`}
        intro="What buyers ask before committing. Short answers, no hedging."
      />

      <RelatedReading slugs={solutionReading[solution.slug] ?? []} />

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Tell us the problem. We&apos;ll design the system.
            </h2>
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
