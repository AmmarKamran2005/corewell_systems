"use client";

import { useEffect } from "react";

import { Container } from "@/components/ui/Container";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Without this the error is swallowed entirely — nothing logged, nothing
  // reportable. console.error surfaces in Vercel's function logs, and the
  // digest is what makes a production error traceable back to a stack.
  useEffect(() => {
    console.error("Unhandled page error", { digest: error.digest, error });
  }, [error]);

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
          <button type="button"
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
