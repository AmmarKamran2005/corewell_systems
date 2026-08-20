import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { FaqSection } from "@/components/FaqSection";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/how-we-work"),
  title: "How We Work: Process and Standards",
  description:
    "How an engagement runs: discovery, design you approve before we build, short build cycles, and what happens after launch — releases, backups, support.",
};

/**
 * The trust page.
 *
 * Buyers of custom software are not afraid of the build — they are afraid
 * of what happens after the invoice: an abandoned system, a developer who
 * disappears, data nobody can get out. Everything here describes practices
 * that exist in systems we run today (spec Section 7), which is why it can
 * be specific where competitors are vague.
 */

const stages = [
  {
    name: "Discover",
    duration: "Days, not months",
    summary:
      "We start with your operation, not a feature list — because most software fails by solving the wrong problem beautifully.",
    detail: [
      "We walk your actual workflow with the people who run it, step by step",
      "We find where time leaks, where information is re-entered, and where money goes uncollected",
      "You get a written map of the problem before anyone talks about building",
      "If the honest answer is an off-the-shelf tool, we say so — that conversation costs you nothing",
    ],
  },
  {
    name: "Design",
    duration: "Approved before code",
    summary:
      "You see how the system will work — screens and flows in plain language — while changes still cost minutes instead of weeks.",
    detail: [
      "Screens and workflows designed against your real cases, not generic examples",
      "Roles decided early: who sees what, who can approve, who must never be able to",
      "Data model and integrations agreed before they become expensive to change",
      "Nothing gets built until you have looked at it and said yes",
    ],
  },
  {
    name: "Build",
    duration: "Reviewable throughout",
    summary:
      "Working software in short cycles that you can open and use — never a reveal at the end.",
    detail: [
      "Short cycles ending in something real you can click, not a status report",
      "Your existing data migrated as part of the build, not left as a problem for later",
      "Access rules enforced on the server, so they hold no matter which device is used",
      "Every change recorded with what it touched and how it was verified",
    ],
  },
  {
    name: "Support",
    duration: "Ongoing",
    summary:
      "The half of the job most vendors treat as optional. Systems change because businesses change.",
    detail: [
      "Training for your team, on your data, in your language",
      "Fixes, improvements, and new modules as the operation evolves",
      "Documented recovery procedures for when something goes wrong at an inconvenient hour",
      "The system, its data, and its documented architecture belong to you",
    ],
  },
];

const standards = [
  {
    title: "Releases you can undo",
    detail:
      "Changes ship in small increments with named rollback points, and database changes are applied as reviewed scripts rather than automatic migrations run against live data. A release that cannot be reversed is a gamble, not a deployment.",
  },
  {
    title: "Backups that live somewhere else",
    detail:
      "Databases back up on a schedule to storage separate from the server they came from, with a restore path that has been exercised rather than assumed. A backup nobody has restored is a hope.",
  },
  {
    title: "Health checks that say what broke",
    detail:
      "Our deployments expose checks that actually reach the database and report the reason when they fail — and start-up waits and retries rather than dying quietly when the database is slower to come back than the application.",
  },
  {
    title: "An audit trail by default",
    detail:
      "In systems holding sensitive records, creates, updates, deletes, and even reads are logged against a named user with what changed and where it came from — retained by policy rather than by memory.",
  },
  {
    title: "Access enforced on the server",
    detail:
      "Roles are checked where the data lives, not hidden in the interface, so a rule holds whether the request comes from the web app, a phone, or a tablet in a lobby. Nothing is protected by simply not showing a button.",
  },
  {
    title: "Tested by someone other than us",
    detail:
      "A production system of ours has been penetration-tested by an external security consultant. Every finding was fixed and the remediation recorded against a date — not filed. We would rather hear about a weakness from an auditor than from an incident.",
  },
];

const afterLaunch = [
  {
    q: "Who fixes it at 9pm on a Friday?",
    a: "We do, and we have written procedures for the failures we have already seen — including recovering work that was mid-flight when something upstream failed. Incidents are documented afterwards so the same problem cannot cost the same hours twice.",
  },
  {
    q: "What if we want to move on from you?",
    a: "You take the system with you. The code, the data, and the documented architecture are yours. The stack it runs on is mainstream and widely staffed, which is a deliberate choice: lock-in is a business model we decided not to have.",
  },
  {
    q: "What does it cost to keep running?",
    a: "Hosting, backups, monitoring, and maintenance — typically a modest fraction of the build cost per year, and importantly not priced per user. Unlike a subscription, your costs do not rise every time you hire someone or open a location.",
  },
  {
    q: "What happens when the business changes?",
    a: "The system changes with it. New modules, new roles, new reports — added to what exists rather than bolted alongside it. This is the advantage of owning the software instead of renting a shape someone else chose.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              How we work
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              The build is the easy part
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soft">
              Anyone can write software. The question worth asking a vendor is
              what happens in the two years after launch — when the business
              changes, a server restarts at 3am, and the person who built it
              has moved on. Here is how we answer that.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* The four stages, expanded */}
      <section className="border-t border-line bg-canvas-subtle py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-semibold">An engagement, end to end</h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              Four stages. No jargon, no ceremony you pay for.
            </p>
          </Reveal>

          <ol className="mt-10">
            {stages.map((stage, index) => (
              <Reveal key={stage.name} delay={index * 0.05}>
                <li className="group relative border-t border-line last:border-b">
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"
                  />
                  <div className="grid gap-x-8 gap-y-4 py-8 lg:grid-cols-[4rem_20rem_1fr]">
                    <span
                      aria-hidden
                      className="mt-2 block h-0.5 w-8 rounded-full bg-faint/50 transition-colors duration-300 group-hover:bg-accent"
                    />
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-display text-ink-strong">
                        {stage.name}
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-accent">
                        {stage.duration}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-soft">
                        {stage.summary}
                      </p>
                    </div>
                    <ul className="space-y-2.5">
                      {stage.detail.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          />
                          <span className="text-sm leading-relaxed text-soft">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engineering standards */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Standards
            </p>
            <h2 className="mt-3 text-3xl font-semibold">
              True of every system we ship
            </h2>
            <p className="mt-4 text-base leading-relaxed text-soft">
              These are not aspirations. They are practices in systems running
              today, and they are the reason those systems are still running.
            </p>
          </Reveal>

          {/* Rule-led rows on a wide measure — deliberately a different family
              from the divided list on /about and the stacked list on
              /book-consultation. */}
          <dl className="mt-10 divide-y divide-line border-y border-line">
            {standards.map((standard, index) => (
              <Reveal key={standard.title} delay={index * 0.04}>
                <div className="grid gap-2 py-6 lg:grid-cols-[18rem_1fr] lg:gap-x-10">
                  <dt className="text-base font-semibold text-ink-strong">
                    {standard.title}
                  </dt>
                  <dd className="text-sm leading-relaxed text-soft">
                    {standard.detail}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* After launch */}
      <FaqSection
        faqs={afterLaunch}
        title="After launch"
        intro="The questions worth asking any software vendor before you sign — and our answers, in advance."
      />

      <section className="bg-ink-strong py-16 sm:py-20">
        <Container className="text-center">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
              Ask us the hard questions on the call
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Bring the ones that worry you most. If we are not the right fit,
              you will know inside half an hour — and it will not have cost you
              anything.
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
