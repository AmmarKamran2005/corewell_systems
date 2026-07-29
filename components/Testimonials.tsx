import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { testimonials } from "@/lib/testimonials";

/**
 * Client quotes. Renders nothing until real, permissioned testimonials
 * exist in lib/testimonials.ts — the site is never worse for the wait, and
 * there is no placeholder that could accidentally ship (spec Section 7).
 */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-line py-16 sm:py-20">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-accent">
            In their words
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            From the people who use it daily
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.quote} delay={index * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-surface p-6">
                <blockquote className="flex-1">
                  <p className="text-base leading-relaxed text-ink">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-sm font-medium text-ink-strong">
                    {testimonial.attribution}
                  </p>
                  {testimonial.context && (
                    <p className="mt-0.5 text-xs text-faint">
                      {testimonial.context}
                    </p>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
