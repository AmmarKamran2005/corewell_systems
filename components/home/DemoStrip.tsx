import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { demoIndustries } from "@/lib/industries";

/**
 * Replaces the Phase 1 named-products strip. Capability is shown as generic,
 * industry-labeled interactive demos — never named or linked real products
 * (spec Sections 1, 5, 6). Demo embeds land in Phase 5; until then the
 * industry pages carry a "demo coming soon" state.
 */
export function DemoStrip() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Working systems you can try, not screenshots
          </h2>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {demoIndustries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}#demo`}
              className="rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Card interactive className="h-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-base font-semibold leading-snug">
                    {industry.demo!.label}
                  </h3>
                  <Badge variant="live">Interactive Demo</Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-soft">
                  {industry.demo!.blurb}
                </p>
                <span className="mt-5 inline-block text-sm font-medium text-accent">
                  Open the demo →
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
