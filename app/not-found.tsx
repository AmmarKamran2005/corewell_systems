import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Without this the 404 inherits the site's default title, which reads as a
// real page in browser history and in any crawler that reaches it. No `robots`
// here — Next already emits `noindex` for not-found, and a second robots tag
// would just duplicate it.
export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <p className="text-sm font-medium text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-soft">
          The link may be old, or the page may have moved. Everything we build
          is reachable from the pages below.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/industries" variant="secondary">
            Explore Industries
          </Button>
        </div>
      </Container>
    </section>
  );
}
