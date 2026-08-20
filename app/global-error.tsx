"use client";

import { useEffect } from "react";

/**
 * Catches errors thrown in the root layout itself, where `app/error.tsx`
 * cannot reach. It replaces the root layout, so it must render its own
 * <html> and <body> — and it cannot use the design tokens, since globals.css
 * is imported by the layout that just failed. Styles are inline on purpose.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled root error", { digest: error.digest, error });
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF9F6",
          color: "#1B2430",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem", padding: "2rem", textAlign: "center" }}>
          <h1 style={{ fontSize: "1.875rem", fontWeight: 600, margin: 0 }}>
            Something went wrong
          </h1>
          <p
            style={{
              marginTop: "1rem",
              lineHeight: 1.6,
              color: "#57534E",
            }}
          >
            An unexpected error interrupted this page. It&apos;s on our side,
            not yours.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              height: "2.75rem",
              padding: "0 1.5rem",
              borderRadius: "9999px",
              border: "none",
              backgroundColor: "#0F766E",
              color: "#ffffff",
              fontSize: "0.875rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
