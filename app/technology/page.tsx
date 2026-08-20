import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { choices, stack } from "@/lib/technology";
import { cn } from "@/lib/utils";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/technology"),
  title: "Technology: What We Build With",
  description:
    "The stack behind our systems: .NET, Node, React, SQL Server, PostgreSQL, mobile, real-time, AI and payments — with what we have shipped kept separate.",
};

const faqs = [
  {
    q: "Which stack will you use for our project?",
    a: "Whichever fits the problem, decided during design rather than before we have met you. Regulated data with heavy reporting and a long support life tends toward .NET and SQL Server. A payments-heavy platform that must ship quickly tends toward Node and PostgreSQL. If your team already maintains a stack, that carries real weight — software your people can support is worth more than software we prefer.",
  },
  {
    q: "Can you work on our existing system rather than rebuilding it?",
    a: "Often, and it is usually the cheaper answer. We take engagements on existing codebases in the frameworks listed here. A rebuild is worth proposing only when the current system genuinely blocks the business — not because it was written by someone else.",
  },
  {
    q: "Do we get the source code?",
    a: "Yes — the code, the database schema, and the documented architecture. There is no proprietary runtime and no closed data format anywhere in what we hand over, so nothing in the system needs our permission to keep running.",
  },
  {
    q: "Can the system run on our own servers instead of the cloud?",
    a: "Yes. We have deployed to managed cloud platforms, cloud virtual machines, and on-premises Windows Server — including for organisations whose data is not permitted to leave their own infrastructure. We have also built systems whose same release runs against different database engines, so hosting stays a decision rather than a rewrite.",
  },
  {
    q: "How do you handle AI without sending our data to a third party?",
    a: "Identifiers are stripped from text before it reaches a model, calls are made server-side under our own keys, no data is used for model training, and every automated action is logged. Nothing a model produces becomes a record until a person approves it.",
  },
];

const tierLabel = {
  shipped: "In production",
  works: "We work with",
} as const;

export default function TechnologyPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Technology
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              What we build with, and why
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              This page is for the technical reader — a CTO, an IT manager, or
              the developer who will be asked whether we know what we are
              doing. Everyone else can skip it: what matters elsewhere on this
              site is what the software does, not what it is written in.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-soft">
              Two labels run through the list.{" "}
              <span className="font-medium text-ink">In production</span> means
              a system of ours runs on it today.{" "}
              <span className="font-medium text-ink">We work with</span> means
              we take engagements in it, but our own published systems do not
              feature it. We would rather you knew the difference.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The stack, grouped by what it does */}
      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <div className="space-y-12">
            {stack.map((group, groupIndex) => (
              <Reveal key={group.title} delay={groupIndex * 0.04}>
                <div className="grid gap-6 lg:grid-cols-[20rem_1fr] lg:gap-12">
                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-display text-ink-strong sm:text-2xl">
                      {group.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-soft">
                      {group.summary}
                    </p>
                  </div>

                  <ul className="grid gap-3 sm:grid-cols-2">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="rounded-xl border border-line bg-surface p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-sm font-semibold tracking-display text-ink-strong">
                            {item.name}
                          </span>
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[0.65rem] font-medium",
                              item.tier === "shipped"
                                ? "bg-accent/10 text-accent-strong"
                                : "border border-line bg-canvas-subtle text-faint"
                            )}
                          >
                            {tierLabel[item.tier]}
                          </span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-soft">
                          {item.use}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* How choices get made */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              How we choose
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              The reasoning behind the list
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              A stack is a set of trade-offs, not a badge. These are ours.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {choices.map((choice, index) => (
              <Reveal key={choice.title} delay={index * 0.05}>
                <div className="h-full rounded-2xl border border-line bg-surface p-6">
                  <h3 className="text-base font-semibold text-ink-strong">
                    {choice.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-soft">
                    {choice.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection
        faqs={faqs}
        title="Technical questions, answered plainly"
        intro="What technical evaluators ask us before a build is agreed."
      />

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Bring your architect to the call
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              We would rather answer hard technical questions early than
              discover the disagreement halfway through a build.
            </p>
            <div className="mt-8">
              <Button href="/book-consultation" size="lg">
                Book a Consultation
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
