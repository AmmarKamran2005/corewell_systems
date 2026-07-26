import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * MDX content pipeline — docs/spec.md Section 12 Phase 4 and Section 2
 * (MDX in-repo; migrate to a headless CMS only if volume demands it).
 * Server-only: used by server components and generateStaticParams.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export type Faq = { q: string; a: string };

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  faqs: Faq[];
  readingMinutes: number;
};

export type Insight = InsightMeta & { body: string };

export type CaseStudyMeta = {
  slug: string;
  title: string;
  /** Anonymized descriptor, e.g. "A multi-location clinic network" (spec Section 5). */
  descriptor: string;
  region: string;
  /** Industry slug from lib/industries.ts. */
  industry: string;
  date: string;
  summary: string;
  /**
   * True while the case study runs on sample data (owner direction, Phase 4).
   * Illustrative studies MUST render a visible sample-data label — spec
   * Section 7 forbids presenting fabricated outcomes as real client results.
   */
  illustrative: boolean;
};

export type CaseStudy = CaseStudyMeta & { body: string };

function readCollection(collection: string) {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return { slug, data, content };
    });
}

function readingMinutes(body: string): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return b.date.localeCompare(a.date);
}

export function getInsights(): InsightMeta[] {
  return readCollection("insights")
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      keywords: (data.keywords ?? []) as string[],
      faqs: (data.faqs ?? []) as Faq[],
      readingMinutes: readingMinutes(content),
    }))
    .sort(byDateDesc);
}

export function getInsight(slug: string): Insight | undefined {
  const entry = readCollection("insights").find((e) => e.slug === slug);
  if (!entry) return undefined;
  return {
    slug: entry.slug,
    title: entry.data.title as string,
    description: entry.data.description as string,
    date: entry.data.date as string,
    keywords: (entry.data.keywords ?? []) as string[],
    faqs: (entry.data.faqs ?? []) as Faq[],
    readingMinutes: readingMinutes(entry.content),
    body: entry.content,
  };
}

export function getCaseStudies(): CaseStudyMeta[] {
  return readCollection("case-studies")
    .map(({ slug, data }) => ({
      slug,
      title: data.title as string,
      descriptor: data.descriptor as string,
      region: data.region as string,
      industry: data.industry as string,
      date: data.date as string,
      summary: data.summary as string,
      illustrative: Boolean(data.illustrative),
    }))
    .sort(byDateDesc);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  const entry = readCollection("case-studies").find((e) => e.slug === slug);
  if (!entry) return undefined;
  return {
    slug: entry.slug,
    title: entry.data.title as string,
    descriptor: entry.data.descriptor as string,
    region: entry.data.region as string,
    industry: entry.data.industry as string,
    date: entry.data.date as string,
    summary: entry.data.summary as string,
    illustrative: Boolean(entry.data.illustrative),
    body: entry.content,
  };
}

export function formatDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
