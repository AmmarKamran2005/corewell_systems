import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  cardIndustries,
  demoBadge,
  enterpriseIndustry,
  industryAccentStyle,
} from "@/lib/industries";

export const metadata: Metadata = {
  title: "Industries We Build Software For",
  description:
    "Custom operational software for healthcare, hospitality, education, retail, construction & real estate, and legal & professional services.",
};

// Industries hub — spec Section 5: six numbered cards plus the
// Enterprise/Custom closing invitation (never a numbered card).
export default function IndustriesPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Software built around how your industry runs
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              Every industry runs on different workflows. We build software
              around yours — not the other way around.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cardIndustries.map((industry, index) => (
              <Reveal key={industry.slug} delay={index * 0.06}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={industryAccentStyle(industry)}
              >
                <Card interactive className="flex h-full flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{industry.name}</h2>
                  </div>
                  <div className="mt-2">
                    {industry.status === "demo" ? (
                      (() => {
                        const badge = demoBadge(industry);
                        return (
                          <Badge variant={badge.tone}>{badge.label}</Badge>
                        );
                      })()
                    ) : (
                      <Badge variant="neutral">
                        Concept — Available as Custom Build
                      </Badge>
                    )}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">
                    {industry.oneLiner}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Explore
                    <span
                      aria-hidden
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Card>
              </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-faint/40 p-8 text-center sm:p-10">
            <h2 className="text-2xl font-semibold">
              Don&apos;t see your industry?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-soft">
              {enterpriseIndustry.oneLiner}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/book-consultation">Book a Consultation</Button>
              <Button
                href={`/industries/${enterpriseIndustry.slug}`}
                variant="secondary"
              >
                How custom builds work
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
