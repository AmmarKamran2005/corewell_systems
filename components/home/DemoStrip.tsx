import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import {
  demoBadge,
  demoIndustries,
  industryAccentStyle,
} from "@/lib/industries";

/**
 * Generic, industry-labeled interactive demos — never named or linked real
 * products (spec Sections 1, 5, 6). Each card carries its industry's accent
 * scope, so the badge and link pick up the per-industry theme.
 */
export function DemoStrip() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Working systems you can try, not screenshots
          </h2>
          <p className="mt-4 text-base leading-relaxed text-soft">
            Two are backed by platforms of ours running in daily use. Two are
            our designs, built as working prototypes. Each one says which it
            is.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {demoIndustries.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 0.06}>
              <Link
                href={`/industries/${industry.slug}#demo`}
                className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={industryAccentStyle(industry)}
              >
                <Card interactive className="h-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base font-semibold leading-snug">
                      {industry.demo!.label}
                    </h3>
                    {(() => {
                      const badge = demoBadge(industry);
                      return industry.demo!.available ? (
                        <Badge variant={badge.tone}>{badge.label}</Badge>
                      ) : (
                        <Badge variant="neutral">Coming soon</Badge>
                      );
                    })()}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-soft">
                    {industry.demo!.blurb}
                  </p>
                  <span className="mt-5 inline-block text-sm font-medium text-accent">
                    {industry.demo!.available
                      ? "Open the demo →"
                      : "Learn more →"}
                  </span>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
