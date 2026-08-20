import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { solutions } from "@/lib/solutions";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/solutions"),
  title: "Solutions",
  description:
    "Capabilities for building operational business software: custom software development, SaaS platforms, mobile apps, cloud & deployment, and AI automation.",
};

/**
 * Solutions hub — spec Section 5: framed as capabilities, not tech stack.
 * Presented as a numbered index rather than a card grid, matching the
 * editorial treatment of the solution pages themselves.
 */
export default function SolutionsPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <Reveal mode="mount" className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Solutions
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Capabilities that turn problems into systems
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              Five ways we take an operational problem and turn it into a
              working system — from ground-up custom builds to automation
              inside the tools you already run.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <ol>
            {solutions.map((solution, index) => (
              <Reveal key={solution.slug} delay={index * 0.05}>
                <li className="group border-t border-line last:border-b">
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="relative block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full"
                    />
                    <div className="grid gap-x-6 gap-y-3 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:py-10">
                      <span
                        aria-hidden
                        className="font-display text-sm font-semibold tabular-nums tracking-display text-faint/70 transition-colors duration-300 group-hover:text-accent sm:text-base"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="max-w-2xl">
                        <h2 className="font-display text-xl font-semibold tracking-display text-ink-strong transition-colors duration-200 group-hover:text-accent sm:text-2xl">
                          {solution.name}
                        </h2>
                        <p className="mt-2.5 text-sm leading-relaxed text-soft sm:text-base">
                          {solution.oneLiner}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="hidden text-sm font-medium text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 sm:block"
                      >
                        Read →
                      </span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
