import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { ConsultForm } from "@/components/consult/ConsultForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "A free call about your operation — what's slowing it down and what a system to fix it would look like. No pitch deck, no obligation.",
};

// The single global CTA target — spec Sections 5 + 10. Short form; deeper
// qualification happens on the call.
export default function BookConsultationPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <Reveal mode="mount" className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Book a Consultation
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
            One call, about your operation — what&apos;s slowing it down and
            what a system to fix it would look like. If we&apos;re not the
            right fit, we&apos;ll say so.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem]">
          <Reveal>
            <ConsultForm />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h2 className="text-base font-semibold text-ink">
                  What happens on the call
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-soft">
                  <li className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    We talk through your current workflow — where time and
                    money leak.
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    You get a rough module map of what a system would cover.
                  </li>
                  <li className="flex gap-3">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    If it makes sense, we scope properly and quote — no
                    obligation either way.
                  </li>
                </ul>
              </div>

              {/* Phase 8 wiring point: Cal.com/Calendly embed replaces this panel. */}
              <div className="rounded-2xl border border-dashed border-faint/40 p-6 text-center">
                <p className="text-sm font-medium text-ink">
                  Prefer to pick a time directly?
                </p>
                <p className="mt-2 text-xs leading-relaxed text-faint">
                  [PLACEHOLDER: Cal.com/Calendly booking embed — owner to
                  provide the booking link.]
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
