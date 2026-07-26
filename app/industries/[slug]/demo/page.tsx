import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { demoIndustries, getIndustry } from "@/lib/industries";

type Props = { params: { slug: string } };

export const dynamicParams = false;

// Demo routes exist only for industries with a real underlying system
// (spec Section 6) — never for concept industries.
export function generateStaticParams() {
  return demoIndustries.map((industry) => ({ slug: industry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry?.demo) return {};
  return { title: industry.demo.label, description: industry.demo.blurb };
}

/**
 * "Demo coming soon" state (Phase 2). Phase 5 replaces the panel below with
 * the embedded sandboxed demo environment — seeded fake data only, generic
 * labeling, quick-access role logins, never the real production instance.
 */
export default function IndustryDemoPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry?.demo) notFound();

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="live">Interactive Demo</Badge>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
            {industry.demo.label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-soft">
            {industry.demo.blurb}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-faint/40 bg-surface p-10 text-center sm:p-14">
          <p className="text-lg font-medium text-ink">
            The public demo environment is being prepared.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-soft">
            The system behind this demo is real — we&apos;re packaging a
            sandboxed version with sample data for the site. Until it&apos;s
            live here, we&apos;ll gladly walk you through it in person.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/book-consultation">Book a live walkthrough</Button>
            <Button href={`/industries/${industry.slug}`} variant="secondary">
              Back to {industry.name}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
