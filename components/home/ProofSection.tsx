import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Proof band.
 *
 * The site's buyer is assessing risk, so the strongest thing this section
 * can do is hand over evidence the visitor can check without talking to
 * anyone — every line below links to the place it can be verified, and the
 * last one invites them to open a working system on the spot.
 *
 * Composition is deliberately asymmetric: a settled statement on the left,
 * a checkable list on the right, so the eye reads the claim and then the
 * receipts. Same ledger language as the solution pages, tightened.
 *
 * The maturity split — production in healthcare and hospitality, design work
 * in education and retail — reflects what actually exists (spec Section 7).
 * Regional claims were removed by owner direction 2026-07: the positioning
 * is universal, and a geography claim is one more thing to defend.
 */
const evidence = [
  {
    claim:
      "AI clinical documentation running in production — a recorded visit becomes a drafted note.",
    href: "/solutions/ai-automation",
    cue: "How we build it",
  },
  {
    claim:
      "Insurance claims filed electronically, with payer responses posting back on their own.",
    href: "/industries/healthcare",
    cue: "See the workflow",
  },
  {
    claim:
      "Payments built into the system, including tap-to-pay with no card terminal to buy.",
    href: "/solutions/saas-platforms",
    cue: "See the architecture",
  },
  {
    claim:
      "Four working systems you can open right now — no signup, no sales call.",
    href: "/industries",
    cue: "Open one",
  },
];

export function ProofSection() {
  return (
    <section className="border-y border-line bg-canvas-subtle py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Proof
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Don&apos;t take our word for it. Open it.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-soft">
              Systems of ours run clinics and properties every working day.
              Others — education, retail — exist as designs we have built and
              can put to work.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-soft">
              Every claim on this site points at something you can check. No
              client names, no invented numbers — that is a policy, not an
              omission.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ol>
              {evidence.map((item, index) => (
                <li key={item.href} className="group relative border-t border-line last:border-b">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"
                  />
                  <Link
                    href={item.href}
                    className="block py-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <div className="grid grid-cols-[2.25rem_1fr] gap-x-4">
                      <span
                        aria-hidden
                        className="font-display text-xs font-semibold tabular-nums tracking-display text-faint/70 transition-colors duration-300 group-hover:text-accent sm:pt-0.5"
                      >
                        <span className="mt-2 block h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                      <div>
                        <p className="text-sm leading-relaxed text-ink sm:text-base">
                          {item.claim}
                        </p>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-accent">
                          {item.cue}
                          <span
                            aria-hidden
                            className="transition-transform duration-200 group-hover:translate-x-0.5"
                          >
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
