import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { contactEmail } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/terms"),
  title: "Terms of Use",
  description:
    "What this site is, what the demos and the assistant are, and what is and is not a commitment.",
};

/**
 * Terms of use.
 *
 * The load-bearing parts are the demo and assistant sections: the demos run on
 * invented sample data and the assistant must never read as a quote. Both
 * restate rules the site already enforces in code (spec Sections 6, 7 and 13)
 * — if the maturity labels ever change, this page changes with them.
 */

const LAST_UPDATED = "20 August 2026";

const sections = [
  {
    heading: "What this site is",
    body: [
      "This is the website of Corewell Systems. It describes what we do, publishes articles, and lets you open working demonstrations of software we have designed and built.",
      "Using the site means you are happy with what is on this page.",
    ],
  },
  {
    heading: "The demonstrations",
    body: [
      "Every demo on this site runs on sample data. The customers, patients, bookings and orders in them are invented. They exist so you can judge how a system behaves, not to represent any real business or person.",
      "Each demo carries a label describing what stands behind it. Those labels are accurate and we keep them accurate.",
    ],
  },
  {
    heading: "The assistant",
    body: [
      "The assistant gives general guidance about software and about what we do. It is not a quote, not a contract, and not professional advice.",
      "Nothing it says commits us to a price, a timeline or a scope. For anything binding, talk to us directly.",
    ],
  },
  {
    heading: "Articles and figures",
    body: [
      "Our articles are general information, not advice for your particular situation. Any cost figures are indicative and vary with what you are actually building.",
      "Where we cite something from outside, we name the source.",
    ],
  },
  {
    heading: "Our content",
    body: [
      "The words, design and code of this site are ours. You are welcome to read it, quote it and link to it with attribution. Please do not republish it wholesale.",
    ],
  },
  {
    heading: "Availability",
    body: [
      "We work to keep this site accurate and available, but we provide it as it is. We cannot promise it will never be offline or never contain a mistake.",
      "If you spot something wrong, tell us and we will fix it.",
    ],
  },
  {
    heading: "Links out",
    body: [
      "Some pages link to other websites or embed tools from other companies, such as our booking calendar. We do not control those and are not responsible for them.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We will update this page if the site changes in a way that affects any of the above, and change the date at the top.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="pb-10 pt-16 sm:pt-24">
        <Container className="max-w-3xl">
          <Reveal mode="mount">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Terms of use
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              What this site is, what the demos and the assistant are, and what
              counts as a commitment from us. Short, because it should be.
            </p>
            <p className="mt-4 text-sm text-faint">
              Last updated {LAST_UPDATED}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="max-w-3xl">
          <dl className="divide-y divide-line border-y border-line">
            {sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.03}>
                <div className="grid gap-3 py-8 lg:grid-cols-[14rem_1fr] lg:gap-x-10">
                  <dt className="text-base font-semibold text-ink-strong">
                    {section.heading}
                  </dt>
                  <dd className="space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10">
            <p className="text-sm leading-relaxed text-soft">
              Anything here you want to check:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-accent hover:underline"
              >
                {contactEmail}
              </a>
              . How we handle your information is covered in our{" "}
              <Link
                href="/privacy"
                className="font-medium text-accent hover:underline"
              >
                privacy policy
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
