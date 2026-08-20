import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { getIndustry, industryAccentStyle } from "@/lib/industries";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedReading } from "@/components/RelatedReading";
import { caseStudyReading } from "@/lib/related";
import { canonical, jsonLdScript } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.summary,
    ...canonical(`/case-studies/${params.slug}`),
    openGraph: {
      type: "article",
      title: study.title,
      description: study.summary,
      publishedTime: study.date,
      modifiedTime: study.updated ?? study.date,
      url: `/case-studies/${params.slug}`,
    },
  };
}

const prose = [
  "prose prose-neutral max-w-none",
  "prose-headings:font-display prose-headings:tracking-display prose-headings:text-ink-strong",
  "prose-p:text-soft prose-li:text-soft prose-strong:text-ink",
  "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
  "prose-hr:border-line prose-em:text-soft",
].join(" ");

/**
 * Case study template — spec Section 5: business problem → solution → key
 * features → architecture (collapsed) → outcome. Anonymized descriptors
 * only; sample-data scenarios carry the visible illustrative label
 * (spec Section 7 — never present fabricated outcomes as real results).
 */
export default function CaseStudyPage({ params }: Props) {
  const study = getCaseStudy(params.slug);
  if (!study) notFound();

  const industry = getIndustry(study.industry);

  /**
   * Article is the honest type for an illustrative study: these are written
   * explanations, not verified reports. Deliberately NOT Review, and not any
   * CreativeWork flavour implying a measured client result (spec Section 7).
   */
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title.slice(0, 110),
    description: study.summary,
    datePublished: study.date,
    dateModified: study.updated ?? study.date,
    author: { "@id": `${siteUrl}/#organization` },
    publisher: { "@id": `${siteUrl}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/case-studies/${study.slug}`,
    },
    inLanguage: "en",
  };

  return (
    <div style={industry ? industryAccentStyle(industry) : undefined}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(articleJsonLd) }}
      />
      <article className="pb-20 pt-16 sm:pt-24">
        <Container className="max-w-3xl">
          <Breadcrumbs
            trail={[
              { name: "Home", href: "/" },
              { name: "Case Studies", href: "/case-studies" },
              { name: study.descriptor, href: `/case-studies/${study.slug}` },
            ]}
          />

          {study.illustrative && (
            <div className="mt-6 rounded-xl border border-line bg-canvas-subtle p-4">
              <Badge variant="neutral">
                Illustrative scenario — sample data
              </Badge>
              <p className="mt-2 text-xs leading-relaxed text-faint">
                This case study is a composite scenario, written to show how
                such a system works. It does not describe a named client
                engagement, and no outcome here is measured from one.
              </p>
            </div>
          )}

          <h1 className="mt-6 text-3xl font-semibold leading-tight sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-3 text-sm text-faint">
            {study.descriptor} · {study.region}
          </p>
          {industry && (
            <p className="mt-4">
              <Link
                href={`/industries/${industry.slug}`}
                className="inline-block rounded-full border border-line bg-surface px-4 py-1.5 text-xs font-medium text-accent transition-colors hover:border-accent/50"
              >
                {industry.name} →
              </Link>
            </p>
          )}

          <div className={`mt-10 ${prose}`}>
            <MDXRemote
              source={study.body}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </Container>
      </article>

      <RelatedReading slugs={caseStudyReading[study.industry] ?? []} />

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Facing the same problem in your operation?
          </h2>
          <div className="mt-8">
            <Button href="/book-consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
