import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

const industries = [
  {
    slug: "healthcare",
    name: "Healthcare",
    description:
      "[PLACEHOLDER: one line on the operational problem software solves for clinics and hospitals.]",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    description:
      "[PLACEHOLDER: one line for hotels and hospitality operators.]",
  },
  {
    slug: "education",
    name: "Education",
    description:
      "[PLACEHOLDER: one line for schools and education administrators.]",
  },
  {
    slug: "retail",
    name: "Retail",
    description: "[PLACEHOLDER: one line for retail and POS operations.]",
  },
  {
    slug: "enterprise",
    name: "Enterprise & Custom",
    description:
      "[PLACEHOLDER: one line for SMEs and custom-build engagements.]",
  },
];

/**
 * Static industry selector grid. Phase 3 adds the inline re-theming
 * interaction (spec Section 5, Home item 2); for now each card links to its
 * industry page.
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
            [PLACEHOLDER: short section intro.]
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Card interactive className="h-full">
                <h3 className="text-lg font-semibold">{industry.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  {industry.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                  Explore
                  <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
