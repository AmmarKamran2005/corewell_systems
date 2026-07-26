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
          {/* Regional claim pending owner confirmation before launch — spec Section 7. */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
            We design and build custom software — from healthcare platforms to
            hospitality and retail systems — for businesses across Canada, the
            United States, Australia, and Pakistan.
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
