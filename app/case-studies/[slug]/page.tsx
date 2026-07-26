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

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return getCaseStudies().map((study) => ({ slug: study.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  return { title: study.title, description: study.summary };
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

  return (
    <div style={industry ? industryAccentStyle(industry) : undefined}>
      <article className="pb-20 pt-16 sm:pt-24">
        <Container className="max-w-3xl">
          <Link
            href="/case-studies"
            className="text-sm font-medium text-accent hover:text-accent-strong"
          >
            ← All case studies
          </Link>

          {study.illustrative && (
            <div className="mt-6 rounded-xl border border-line bg-canvas-subtle p-4">
              <Badge variant="neutral">
                Illustrative scenario — sample data
              </Badge>
              <p className="mt-2 text-xs leading-relaxed text-faint">
                This case study is a composite scenario using sample figures to
                show how such a system works. It does not describe a named
                client engagement.
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
