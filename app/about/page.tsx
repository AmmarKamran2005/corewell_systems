import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { canonical } from "@/lib/seo";

/**
 * Identity FAQs. The first one exists because a large US health system with a
 * near-identical name owns the "corewell" entity in search results and AI
 * answers. A direct, factual answer here is what a search or answer engine
 * can actually quote — and it is a real question visitors arrive with.
 */
const identityFaqs = [
  {
    q: "Is Corewell Systems related to Corewell Health?",
    a: "No. Corewell Systems is an independent custom software development company with no affiliation, ownership link, or partnership with Corewell Health, or with any hospital system, health network, or healthcare provider. The similarity in name is coincidental. We build software — including software used by clinics — but we do not deliver medical care and we are not part of any health system.",
  },
  {
    q: "What does Corewell Systems actually do?",
    a: "We design and build custom operational software: the system a business runs on. That means clinic and practice management platforms, hotel and booking systems, school management systems, and retail point-of-sale and inventory software. We are a software engineering company, not a web design agency and not a healthcare provider.",
  },
  {
    q: "How large is the team?",
    a: "Deliberately small. We are a boutique engineering firm, which means the people who design your system are the people who build it — there is no account manager sitting between you and the work, and nothing gets handed to a junior team after the contract is signed. If a project genuinely needs a hundred developers, we will tell you to look elsewhere.",
  },
  {
    q: "Where are you based, and do you work internationally?",
    a: "We work remotely with businesses wherever they are. Engagements are not limited by geography — discovery, design reviews, delivery, and support all happen online, with the same process regardless of location.",
  },
  {
    q: "Who owns the software you build?",
    a: "You do. The code, the database schema, and the documented architecture are handed over at the end of the engagement. The technology underneath is mainstream and widely staffed, so another firm could pick the system up if you ever wanted one to.",
  },
];

export const metadata: Metadata = {
  ...canonical("/about"),
  title: "About Corewell Systems",
  description:
    "An independent custom software development company, not affiliated with any hospital system or healthcare provider. We build software for business operations.",
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
      "We spend the first days watching how work moves through your business, before anyone writes a feature list. Software can be well built and still be aimed at the wrong problem.",
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

      <FaqSection
        faqs={identityFaqs}
        title="Who we are, plainly"
        intro="The questions people arrive with — including the one about the name."
      />

      <section className="border-t border-line bg-canvas-subtle py-14 sm:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-faint">
            Corewell Systems is an independent software engineering company. It
            is not affiliated with Corewell Health or with any hospital system,
            health network, or healthcare provider.
          </p>
        </Container>
      </section>
    </>
  );
}
