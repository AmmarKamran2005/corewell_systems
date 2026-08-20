import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { BookingEmbed } from "@/components/consult/BookingEmbed";
import { ConsultForm } from "@/components/consult/ConsultForm";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/book-consultation"),
  title: "Book a Consultation",
  description:
    "A free call about your operation — what's slowing it down and what a system to fix it would look like. Pick a time directly, no pitch deck, no obligation.",
};

const expectations = [
  "We talk through your current workflow — where time and money leak.",
  "You get a rough module map of what a system would cover.",
  "If it makes sense, we scope properly and quote — no obligation either way.",
];

// The single global CTA target — spec Sections 5 + 10. Two paths, both
// short: pick a time on the calendar, or send the details and we reply.
export default function BookConsultationPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
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

          <Reveal delay={0.08} className="mt-10">
            {/* Stacked list with an accent tick — a third layout family, so
                /about, /how-we-work and this page no longer share one. */}
            <ul className="divide-y divide-line border-y border-line">
              {expectations.map((item) => (
                <li key={item} className="flex gap-4 py-5">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <p className="text-sm leading-relaxed text-soft">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* Primary path — pick a time */}
      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Pick a time
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              Choose a slot that suits you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              The calendar is live — pick a time and it&apos;s booked. No
              back-and-forth email.
            </p>
          </Reveal>
          <div className="mt-8">
            <BookingEmbed />
          </div>
        </Container>
      </section>

      {/* Secondary path — write first */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-wider text-accent">
                Or write first
              </p>
              <h2 className="mt-3 text-3xl font-semibold">
                Prefer to explain before you book?
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-soft">
                Send the details and we&apos;ll reply within one business day
                — usually with a time and a first read on your problem.
              </p>
              <div className="mt-8 max-w-xl">
                <ConsultForm />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <h3 className="text-base font-semibold text-ink">
                  Before the call, if you like
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">
                  Open one of the interactive systems and click around. Most
                  people arrive with better questions after five minutes in a
                  working demo than after any brochure.
                </p>
                <a
                  href="/industries"
                  className="mt-4 inline-block text-sm font-medium text-accent hover:text-accent-strong"
                >
                  Open a demo →
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
