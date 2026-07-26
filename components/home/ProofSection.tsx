import { Container } from "@/components/ui/Container";

/**
 * Owner-provided proof copy (Phase 2 kickoff). The regional claim (Canada /
 * United States / Australia / Pakistan) is FLAGGED — the owner must confirm
 * which regions are accurate before this ships. Do not treat as final.
 * Spec Section 7: state only what's true, don't round up.
 */
export function ProofSection() {
  return (
    <section className="border-y border-line bg-canvas-subtle py-14 sm:py-16">
      <Container>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-ink">
          Production systems designed for healthcare, hospitality, education,
          and retail operations — for businesses across Canada, the United
          States, Australia, and Pakistan.
        </p>
      </Container>
    </section>
  );
}
