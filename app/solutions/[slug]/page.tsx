import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cardIndustries } from "@/lib/industries";
import { getSolution, solutions } from "@/lib/solutions";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const solution = getSolution(params.slug);
  if (!solution) return {};
  return { title: solution.name };
}

/**
 * Solutions page template — spec Section 5: problem it solves → what's
 * included → example industries → CTA, with technology detail only inside a
 * collapsed "Under the hood" section (never in headlines — spec Section 13).
 * Copy is owner-pending; structure is final.
 */
export default function SolutionPage({ params }: Props) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  return (
    <>
      <section className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {solution.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              {solution.oneLiner}
            </p>
            <div className="mt-8">
              <Button href="/book-consultation">Book a Consultation</Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                The problem it solves
              </h2>
              <p className="mt-4 text-base leading-relaxed text-soft">
                [PLACEHOLDER: 2–3 sentences on the operational problem this
                capability addresses — outcome language, no jargon.]
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                What&apos;s included
              </h2>
              <p className="mt-4 text-base leading-relaxed text-soft">
                [PLACEHOLDER: 3–5 bullet items describing what an engagement
                covers — owner to provide.]
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Industries this applies to
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {cardIndustries.map((industry) => (
              <li key={industry.slug}>
                <Link
                  href={`/industries/${industry.slug}`}
                  className="inline-block rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent/50 hover:text-accent"
                >
                  {industry.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Technical detail stays collapsed and out of headlines — spec Section 13 */}
          <details className="mt-12 rounded-2xl border border-line bg-surface p-6 open:pb-6 sm:p-8">
            <summary className="cursor-pointer text-sm font-medium text-ink">
              Under the hood — for technical buyers
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-soft">
              [PLACEHOLDER: short technical note — architecture and tooling
              summary for technical evaluators. Owner to provide or approve.]
            </p>
          </details>
        </Container>
      </section>

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Tell us the problem. We&apos;ll design the system.
          </h2>
          <div className="mt-8">
            <Button href="/book-consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
