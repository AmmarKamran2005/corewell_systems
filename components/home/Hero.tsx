import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Engineering software that powers modern businesses.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
            [PLACEHOLDER: one-sentence subline — plain-language statement of
            who KodeSparc builds for and the operational outcome, per spec
            Section 5.]
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href="/book-consultation" size="lg">
              Book a Consultation
            </Button>
            <Button href="/industries" variant="secondary" size="lg">
              Explore Industries
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
