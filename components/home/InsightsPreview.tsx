import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";

/**
 * Static preview until Phase 4 wires the MDX content pipeline. Titles follow
 * the one-question-one-answer GEO/AEO pattern from spec Section 9.
 */
const articles = [
  {
    slug: "#",
    title: "[PLACEHOLDER: buyer-intent question article #1]",
    excerpt: "[PLACEHOLDER: first-paragraph direct answer excerpt.]",
  },
  {
    slug: "#",
    title: "[PLACEHOLDER: buyer-intent question article #2]",
    excerpt: "[PLACEHOLDER: first-paragraph direct answer excerpt.]",
  },
  {
    slug: "#",
    title: "[PLACEHOLDER: buyer-intent question article #3]",
    excerpt: "[PLACEHOLDER: first-paragraph direct answer excerpt.]",
  },
];

export function InsightsPreview() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Answers before the sales call
          </h2>
          <Link
            href="/insights"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            All insights →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Card key={index} interactive>
              <h3 className="text-base font-semibold leading-snug">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-soft">
                {article.excerpt}
              </p>
              <span className="mt-5 inline-block text-sm font-medium text-accent">
                Read article →
              </span>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
