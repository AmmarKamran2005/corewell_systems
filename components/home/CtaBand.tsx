import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { CtaBandVideo } from "@/components/home/CtaBandVideo";

/**
 * Closing CTA band, over a muted background loop.
 *
 * The layering matters more than the video does: ink base, then the loop held
 * well below full strength, then a scrim, and only then the text. The band has
 * to read the same whether the file loads, is refused (reduced motion, narrow
 * screen) or fails outright — so nothing above the base layer carries meaning,
 * and the copy never sits directly on moving pixels.
 */
export function CtaBand() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-strong py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 opacity-[0.22]">
        <CtaBandVideo />
      </div>
      {/* Scrim: darker through the middle, where the headline sits. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-strong/70 via-ink-strong/85 to-ink-strong/70"
      />
      <Container className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Tell us the problem. We&apos;ll design the system.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
            One call, about your operation — what&apos;s slowing it down and
            what a system to fix it would look like. If we&apos;re not the
            right fit, we&apos;ll say so.
          </p>
          <div className="mt-8">
            <Button href="/book-consultation" size="lg">
              Book a Consultation
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
