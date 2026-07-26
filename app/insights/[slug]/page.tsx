import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { formatDate, getInsight, getInsights } from "@/lib/content";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights().map((insight) => ({ slug: insight.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const insight = getInsight(params.slug);
  if (!insight) return {};
  return {
    title: insight.title,
    description: insight.description,
    keywords: insight.keywords,
  };
}

const prose = [
  "prose prose-neutral max-w-none",
  "prose-headings:font-display prose-headings:tracking-display prose-headings:text-ink-strong",
  "prose-p:text-soft prose-li:text-soft prose-strong:text-ink",
  "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
  "prose-hr:border-line prose-blockquote:text-soft",
].join(" ");

/**
 * Article template — spec Section 9 GEO/AEO pattern: the H1 is the question,
 * the first paragraph answers it directly, and the FAQ block ships with
 * JSON-LD FAQPage schema for rich-result eligibility.
 */
export default function InsightArticlePage({ params }: Props) {
  const insight = getInsight(params.slug);
  if (!insight) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: insight.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article className="pb-20 pt-16 sm:pt-24">
        <Container className="max-w-3xl">
          <Link
            href="/insights"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            ← All insights
          </Link>
          <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl lg:text-[2.75rem]">
            {insight.title}
          </h1>
          <p className="mt-4 text-sm text-faint">
            {formatDate(insight.date)} · {insight.readingMinutes} min read
          </p>

          <div className={`mt-10 ${prose}`}>
            <MDXRemote
              source={insight.body}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {insight.faqs.length > 0 && (
            <section className="mt-14 border-t border-line pt-10">
              <h2 className="font-display text-2xl font-semibold tracking-display text-ink-strong">
                Frequently asked questions
              </h2>
              <div className="mt-6 space-y-3">
                {insight.faqs.map((faq) => (
                  <details
                    key={faq.q}
                    className="rounded-xl border border-line bg-surface p-5"
                  >
                    <summary className="cursor-pointer text-sm font-medium text-ink">
                      {faq.q}
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-soft">
                      {faq.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </Container>
      </article>

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Have this question about your own operation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            One call, about your operation — what&apos;s slowing it down and
            what a system to fix it would look like. If we&apos;re not the
            right fit, we&apos;ll say so.
          </p>
          <div className="mt-8">
            <Button href="/book-consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
