import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getIndustry, industries } from "@/lib/industries";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  const title =
    industry.status === "custom"
      ? "Custom Enterprise Software"
      : `${industry.name} Management Software`;
  return { title, description: industry.oneLiner };
}

/**
 * Industry page template — spec Section 5: operational problem → how software
 * solves it → generic interactive demo (Section 6) → proof block → CTA.
 * Healthcare is the first fully-applied instance; other industries render the
 * same template from lib/industries.ts data.
 */
export default function IndustryPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const isConcept = industry.status === "concept";
  const isCustom = industry.status === "custom";

  return (
    <>
      {/* Intro — name + owner-provided one-liner as the lede */}
      <section className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            {isConcept && (
              <div className="mb-5">
                <Badge variant="neutral">
                  Concept — Available as Custom Build
                </Badge>
              </div>
            )}
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              {isCustom ? "Don't see your industry?" : industry.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              {industry.oneLiner}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/book-consultation">Book a Consultation</Button>
              {industry.demo && (
                <Button href="#demo" variant="secondary">
                  See the interactive demo
                </Button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Operational problem → how software solves it */}
      {!isCustom && (
        <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
          <Container>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">
                The operational problem
              </h2>
              <p className="mt-4 text-base leading-relaxed text-soft">
                [PLACEHOLDER: 2–3 sentences on the day-to-day operational
                problem in {industry.name.toLowerCase()} — and how a purpose-built
                system solves it. Owner to provide; do not invent claims.]
              </p>
            </div>
            {industry.modules && (
              <div className="mt-10">
                <p className="text-xs font-medium uppercase tracking-wider text-faint">
                  What the system covers
                </p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {industry.modules.map((module) => (
                    <li
                      key={module}
                      className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-ink"
                    >
                      {module}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* Generic interactive demo (spec Section 6) or honest concept state */}
      {industry.demo && (
        <section id="demo" className="scroll-mt-24 py-16 sm:py-20">
          <Container>
            <div className="rounded-2xl border border-line bg-surface p-8 sm:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="live">Interactive Demo</Badge>
              </div>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                {industry.demo.label}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-soft">
                {industry.demo.blurb}
              </p>
              {/* Phase 5 replaces this panel with the embedded demo environment. */}
              <div className="mt-8 rounded-xl border border-dashed border-faint/40 bg-canvas p-8 text-center">
                <p className="text-sm font-medium text-ink">
                  The public demo environment is being prepared.
                </p>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-soft">
                  Book a consultation and we&apos;ll walk you through the full
                  system live.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  <Button href={`/industries/${industry.slug}/demo`}>
                    Open the interactive demo
                  </Button>
                  <Button href="/book-consultation" variant="secondary">
                    Book a live walkthrough
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {isConcept && (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
              <Badge variant="neutral">Concept — Available as Custom Build</Badge>
              <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">
                Built to order, not off the shelf
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-soft">
                We haven&apos;t published a demo for this industry yet — this
                system is designed and built around your operation as a custom
                engagement.
              </p>
              <div className="mt-6">
                <Button href="/book-consultation">Book a Consultation</Button>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* Anonymized case study / proof block — lands with Phase 4 content */}
      {!isCustom && (
        <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
          <Container>
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold">Proof, not promises</h2>
              <p className="mt-4 text-base leading-relaxed text-soft">
                [PLACEHOLDER: anonymized case study block for{" "}
                {industry.name.toLowerCase()} — real, non-identifying facts
                only, described by region and type, never by name. Arrives with
                the Phase 4 case-study pipeline; if no permissioned outcome
                data exists, this section ships without outcome metrics — spec
                Sections 5 + 7.]
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* Closing CTA */}
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
