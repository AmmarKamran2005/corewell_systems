import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { solutions } from "@/lib/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Capabilities for building operational business software: custom software development, SaaS platforms, mobile apps, cloud & deployment, and AI automation.",
};

// Solutions hub — spec Section 5: framed as capabilities, not tech stack.
export default function SolutionsPage() {
  return (
    <>
      <section className="pb-12 pt-16 sm:pb-16 sm:pt-24">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Capabilities that turn problems into systems
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-soft">
              Five ways we take an operational problem and turn it into a
              working system — from ground-up custom builds to automation
              inside the tools you already run.
            </p>
          </div>
        </Container>
      </section>

      <section className="pb-20 sm:pb-28">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Card interactive className="flex h-full flex-col">
                  <h2 className="text-lg font-semibold">{solution.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-soft">
                    {solution.oneLiner}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn more
                    <span
                      aria-hidden
                      className="transition-transform duration-150 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
