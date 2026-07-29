import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Corewell Systems is a software design and engineering company building operational systems for healthcare, hospitality, education, and retail businesses.",
};

/**
 * Company voice only — no founder name, no personal bio, no "meet the team"
 * (spec Sections 1 + 5). Lede is owner-provided (Phase 2 kickoff); the
 * "how we think" narrative and principles were drafted in-house under the
 * owner's standing licence and describe how engagements actually run.
 * Regional claims removed by owner direction 2026-07.
 */
const principles = [
  {
    title: "The operation comes first",
    detail:
      "We spend the first days understanding how work actually moves through your business — not gathering a feature list. Most software fails by solving the wrong problem beautifully.",
  },
  {
    title: "Boring technology, on purpose",
    detail:
      "We build on mainstream, well-supported foundations and hand over documented architecture. A system you cannot maintain without us is a liability we refuse to sell.",
  },
  {
    title: "We say no when it's the right answer",
    detail:
      "If an off-the-shelf tool genuinely fits your workflow, we will tell you and lose the project. A build that should not have happened helps nobody.",
  },
  {
    title: "Nothing we claim is decorative",
    detail:
      "This site labels which systems are running in production and which are designs we have prototyped. Where we lack proof, we say so — including on the pages where a demo would be easier.",
  },
  {
    title: "Launch is the middle, not the end",
    detail:
      "Systems change because businesses change. Training, fixes, improvements, and a documented recovery path matter more over five years than anything in the first release.",
  },
  {
    title: "Your data stays yours",
    detail:
      "The system, its records, and its architecture belong to you. We build for the possibility that one day you will want to run it without us.",
  },
];
export default function AboutPage() {
  return (
    <>
      <section className="pb-14 pt-16 sm:pb-20 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              About Corewell Systems
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-soft">
              Corewell Systems is a software design and engineering company
              building operational systems for healthcare, hospitality,
              education, and retail businesses. We design software around how
              teams actually work — not the other way around.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-canvas-subtle py-14 sm:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink">
            Systems of ours run clinics and properties every working day.
            Others — education, retail — exist as designs we have built and can
            put to work.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              How we think about software
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-soft">
              <p>
                Corewell Systems exists because of a gap we kept running into:
                the businesses that most need good software are the ones the
                software industry serves worst. A clinic, a hotel, a shop —
                each runs on a workflow refined over years, and each is offered
                the same generic product built for an average business that
                does not exist. So they adapt. They keep a spreadsheet beside
                the system, a notebook beside the spreadsheet, and one person
                who remembers how it all fits together.
              </p>
              <p>
                We think that is backwards. Software should be shaped to the
                operation, not the other way around — and that is not a
                luxury reserved for large companies. It is mostly a question of
                whether anyone bothered to understand the operation before they
                started building.
              </p>
              <p>
                So we start there. Before any design, we walk the workflow with
                the people who actually run it: where time leaks, where the
                same information gets entered twice, where money quietly goes
                uncollected. What we build after that tends to look
                unremarkable — which is the point. Good operational software is
                not impressive. It is invisible, and the day feels shorter.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-base font-semibold text-ink-strong">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-soft">
                    {principle.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <Button href="/book-consultation">Book a Consultation</Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
