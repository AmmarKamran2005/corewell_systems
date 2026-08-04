import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EducationDemo } from "@/components/demo/EducationDemo";
import { HealthcareDemo } from "@/components/demo/HealthcareDemo";
import { HospitalityDemo } from "@/components/demo/HospitalityDemo";
import { RetailDemo } from "@/components/demo/RetailDemo";
import {
  demoBadge,
  demoIndustries,
  getIndustry,
  industryAccentStyle,
} from "@/lib/industries";
import { fullSystemDemos } from "@/lib/site";

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

const demoComponents: Record<
  string,
  React.ComponentType<{ exitHref: string }>
> = {
  healthcare: HealthcareDemo,
  hospitality: HospitalityDemo,
  education: EducationDemo,
  retail: RetailDemo,
};

/**
 * Sandboxed demo environments (spec Section 6): generic industry labeling,
 * seeded fake data, quick-access roles instead of credentials. All four
 * demo-backed industries are live; any future industry added with
 * available: false falls back to the honest coming-soon state below.
 */
export default function IndustryDemoPage({ params }: Props) {
  const industry = getIndustry(params.slug);
  if (!industry?.demo) notFound();

  const Demo = demoComponents[industry.slug];

  const fullSystem = fullSystemDemos[industry.slug];

  if (industry.demo.available && Demo) {
    return (
      <section className="py-8 sm:py-12" style={industryAccentStyle(industry)}>
        <Container>
          {fullSystem && (
            <div className="mb-8 rounded-2xl border border-faint/40 bg-surface p-6 sm:flex sm:items-center sm:gap-6 sm:p-8">
              <div className="min-w-0 flex-1">
                <Badge variant={demoBadge(industry).tone}>
                  {demoBadge(industry).label}
                </Badge>
                <h2 className="mt-3 text-xl font-semibold leading-snug">
                  Open the full system — {fullSystem.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  {fullSystem.blurb}
                </p>
              </div>
              <div className="mt-5 shrink-0 sm:mt-0">
                <Button href={fullSystem.url} target="_blank" rel="noopener">
                  Open {fullSystem.name}
                </Button>
              </div>
            </div>
          )}
          <Demo exitHref={`/industries/${industry.slug}`} />
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-24" style={industryAccentStyle(industry)}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant={demoBadge(industry).tone}>
            {demoBadge(industry).label}
          </Badge>
          <h1 className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
            {industry.demo.label}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-soft">
            {industry.demo.blurb}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-faint/40 bg-surface p-10 text-center sm:p-14">
          <p className="text-lg font-medium text-ink">
            This demo environment is being prepared.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-soft">
            We&apos;re packaging a sandboxed version with sample data for the
            site. Until it&apos;s here, we&apos;ll gladly walk you through the
            system in person.
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
