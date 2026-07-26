"use client";

import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-soft">
          An unexpected error interrupted this page. It&apos;s on our side,
          not yours.
        </p>
        <div className="mt-8">
          <button
            onClick={reset}
            className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            Try again
          </button>
        </div>
      </Container>
    </section>
  );
}
