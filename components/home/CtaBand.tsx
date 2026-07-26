import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand() {
  return (
    <section className="bg-ink-strong py-16 sm:py-20">
      <Container className="text-center">
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
          Tell us the problem. We&apos;ll design the system.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
          [PLACEHOLDER: one supporting sentence — what happens on the call, no
          hype.]
        </p>
        <div className="mt-8">
          <Button href="/book-consultation" size="lg">
            Book a Consultation
          </Button>
        </div>
      </Container>
    </section>
  );
}
