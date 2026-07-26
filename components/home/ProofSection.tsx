import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Owner-provided proof copy. Regional claim (Canada / United States /
 * Australia / Pakistan) confirmed by the owner 2026-07 — spec Section 7.
 */
export function ProofSection() {
  return (
    <section className="border-y border-line bg-canvas-subtle py-14 sm:py-16">
      <Container>
        <Reveal>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink">
            Production systems designed for healthcare, hospitality, education,
            and retail operations — for businesses across Canada, the United
            States, Australia, and Pakistan.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
