import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getCaseStudies } from "@/lib/content";
import { getIndustry, industryAccentStyle } from "@/lib/industries";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/case-studies"),
  title: "Case Studies",
  description:
    "Anonymized case studies of operational software for clinics, hotels, and retail chains — the problem, the system, and what changed.",
};

/**
 * Case studies hub — anonymized by design: descriptors and regions, never
 * client names or live links (spec Section 5). Studies running on sample
 * data carry a visible "Illustrative scenario" label (spec Section 7).
 */
export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              The problem, the system, and what changed
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              Case studies are anonymized by design — described by operation
              and scale, never by name. Scenarios currently shown use sample
              data and are labeled accordingly.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {caseStudies.map((study, index) => {
              const industry = getIndustry(study.industry);
              return (
                <Reveal key={study.slug} delay={index * 0.06}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    style={industry ? industryAccentStyle(industry) : undefined}
                  >
                    <Card interactive className="flex h-full flex-col">
                      <div className="flex flex-wrap gap-2">
                        {study.illustrative && (
                          <Badge variant="neutral">
                            Illustrative scenario — sample data
                          </Badge>
                        )}
                      </div>
                      <h2 className="mt-4 text-lg font-semibold leading-snug">
                        {study.title}
                      </h2>
                      <p className="mt-1 text-sm text-faint">
                        {study.descriptor} · {study.region}
                      </p>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">
                        {study.summary}
                      </p>
                      <span className="mt-5 inline-block text-sm font-medium text-accent">
                        Read the case study →
                      </span>
                    </Card>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
