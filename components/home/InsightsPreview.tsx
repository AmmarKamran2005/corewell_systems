import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, getInsights } from "@/lib/content";

/**
 * Latest three articles from the Phase 4 MDX pipeline (spec Section 5, Home
 * item 6) — pulls GEO/AEO traffic into the funnel.
 */
export function InsightsPreview() {
  const articles = getInsights().slice(0, 3);

  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Answers before the sales call
          </h2>
          <Link
            href="/insights"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            All insights →
          </Link>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.06}>
              <Link
                href={`/insights/${article.slug}`}
                className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Card interactive className="flex h-full flex-col">
                  <p className="text-xs text-faint">
                    {formatDate(article.date)} · {article.readingMinutes} min
                    read
                  </p>
                  <h3 className="mt-3 flex-1 text-base font-semibold leading-snug">
                    {article.title}
                  </h3>
                  <span className="mt-5 inline-block text-sm font-medium text-accent">
                    Read the answer →
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
