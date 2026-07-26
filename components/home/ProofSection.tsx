import { Container } from "@/components/ui/Container";

/**
 * Spec Sections 5 + 7: this section may only ship with real, verifiable
 * metrics. Every entry below is a placeholder — the section must not go live
 * until each one is replaced with a confirmed fact or removed.
 */
const proofPoints = [
  "[PLACEHOLDER: verifiable metric, e.g. 'Live in production since 20XX' — confirm before publishing]",
  "[PLACEHOLDER: verifiable metric, e.g. 'X active clinics using the clinical platform' — only if true]",
  "[PLACEHOLDER: verifiable metric or remove this pill]",
];

export function ProofSection() {
  return (
    <section className="border-y border-line bg-canvas-subtle py-14 sm:py-16">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {proofPoints.map((point) => (
            <span
              key={point}
              className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm text-soft"
            >
              {point}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
