import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import type { Faq } from "@/lib/faqs";

/**
 * Question-and-answer block with FAQPage structured data (spec Section 9).
 *
 * Three readers at once: a buyer hunting for the objection that stops them,
 * a search engine looking for rich results, and an AI answer engine looking
 * for a citable pair. The visible answer and the structured answer are the
 * same text — no hidden keyword copy.
 */
export function FaqSection({
  faqs,
  title = "Questions people ask",
  intro,
}: {
  faqs: Faq[];
  title?: string;
  intro?: string;
}) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[22rem_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Straight answers
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight">
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-base leading-relaxed text-soft">
                {intro}
              </p>
            )}
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              {faqs.map((faq, index) => (
                <details
                  key={faq.q}
                  className="group border-t border-line last:border-b"
                  open={index === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5">
                    <span className="font-display text-base font-semibold tracking-display text-ink-strong sm:text-lg">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-sm text-accent transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-6 text-sm leading-relaxed text-soft sm:text-base">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
