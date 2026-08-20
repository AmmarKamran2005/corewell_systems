import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { getInsights } from "@/lib/content";

/**
 * Related-reading block for industry, solution and case-study pages, which
 * previously linked to zero articles.
 *
 * It writes no copy: each card renders the article's own `title` and
 * `description` straight from its frontmatter, so there is nothing here that
 * can drift from the article it points at, and nothing invented.
 *
 * Renders nothing when no slug resolves — the Testimonials.tsx pattern.
 */
export function RelatedReading({
  slugs,
  title = "Related reading",
  limit = 3,
}: {
  slugs: string[];
  title?: string;
  limit?: number;
}) {
  const bySlug = new Map(getInsights().map((i) => [i.slug, i]));
  const articles = slugs
    .map((slug) => bySlug.get(slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
    .slice(0, limit);

  if (articles.length === 0) return null;

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <h2 className="text-2xl font-semibold sm:text-3xl">{title}</h2>
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/insights/${article.slug}`}
                className="block h-full rounded-xl border border-line bg-surface p-5 transition-shadow duration-150 hover:shadow-[0_2px_16px_rgb(27_36_48/0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <span className="font-display text-sm font-semibold text-ink-strong">
                  {article.title}
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-soft">
                  {article.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
