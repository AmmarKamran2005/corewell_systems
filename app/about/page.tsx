import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description:
    "Corewell Systems is a software design and engineering company building operational systems for healthcare, hospitality, education, and retail businesses.",
};

/**
 * Company voice only — no founder name, no personal bio, no "meet the team"
 * (spec Sections 1 + 5). Body copy is owner-provided (Phase 2 kickoff).
 * The regional claim is flagged pending owner confirmation — spec Section 7.
 */
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
              education, and retail businesses. We work with organizations
              across Canada, the United States, Australia, and Pakistan,
              designing software around how teams actually work — not the
              other way around.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-canvas-subtle py-14 sm:py-16">
        <Container>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink">
            Production systems designed for healthcare, hospitality, education,
            and retail operations — for businesses across Canada, the United
            States, Australia, and Pakistan.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold sm:text-3xl">
              How we think about software
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              [PLACEHOLDER: 2–3 short paragraphs — why the company exists, how
              it works, what it believes about operational software. Company
              voice only; owner to provide. Spec Section 5 (About).]
            </p>
          </div>
          <div className="mt-10">
            <Button href="/book-consultation">Book a Consultation</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
