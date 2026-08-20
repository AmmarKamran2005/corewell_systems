import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { formatDate, getInsights } from "@/lib/content";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/insights"),
  title: "Insights: Straight Answers",
  description:
    "One question, one page, one clear answer: costs, features, and build-vs-buy decisions for operational business software.",
};

// Insights hub — the GEO/AEO engine (spec Section 9): every article answers
// one buyer-intent question directly.
export default function InsightsPage() {
  const insights = getInsights();

  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Straight answers about business software
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              The questions owners actually ask — costs, features, build vs.
              buy — answered directly, before any sales call.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {insights.map((insight, index) => (
              <Reveal key={insight.slug} delay={index * 0.06}>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="block h-full rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Card interactive className="flex h-full flex-col">
                    <p className="text-xs text-faint">
                      {formatDate(insight.date)} · {insight.readingMinutes} min
                      read
                    </p>
                    <h2 className="mt-3 text-lg font-semibold leading-snug">
                      {insight.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-soft">
                      {insight.description}
                    </p>
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
    </>
  );
}
