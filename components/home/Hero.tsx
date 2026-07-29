import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroSystem } from "@/components/home/HeroSystem";

export function Hero() {
  return (
    <section className="pb-20 pt-16 sm:pb-28 sm:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <h1 className="max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Engineering software that powers modern businesses.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-soft">
              We design and build custom software — from clinical platforms to
              hospitality and retail systems — for businesses whose operations
              have outgrown the tools running them.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/book-consultation" size="lg">
                Book a Consultation
              </Button>
              <Button href="/industries" variant="secondary" size="lg">
                Try a live system
              </Button>
            </div>
            <p className="mt-5 text-sm text-faint">
              Four working systems you can open right now — no signup.
            </p>
          </div>

          {/* Proof before the fold: a fragment of real software, moving */}
          <div className="lg:pl-4">
            <HeroSystem />
          </div>
        </div>
      </Container>
    </section>
  );
}
