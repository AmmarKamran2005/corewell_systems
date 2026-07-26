import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { cardIndustries, enterpriseIndustry } from "@/lib/industries";

/**
 * Static industry selector grid. Phase 3 adds the inline re-theming
 * interaction (spec Section 5, Home item 2); for now each card links to its
 * industry page. The Enterprise/Custom tile is the closing invitation, not a
 * numbered card (spec Section 3).
 */
export function IndustryGrid() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Built for the way your industry operates
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            Every industry runs on different workflows. We build software
            around yours — not the other way around.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cardIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Card interactive className="h-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold">{industry.name}</h3>
                  {industry.status === "concept" && (
                    <Badge variant="neutral">
                      Concept — Available as Custom Build
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-soft">
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
          ))}

          <Link
            href={`/industries/${enterpriseIndustry.slug}`}
            className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:col-span-2 lg:col-span-3"
          >
            <div className="rounded-2xl border border-dashed border-faint/40 p-6 text-center transition-colors duration-150 group-hover:border-accent/50 sm:p-8">
              <h3 className="text-lg font-semibold">
                Don&apos;t see your industry?
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-soft">
                {enterpriseIndustry.oneLiner}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                Talk to us about a custom build
                <span
                  aria-hidden
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </div>
      </Container>
    </section>
  );
}
