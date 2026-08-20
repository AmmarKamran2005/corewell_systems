import { ImageResponse } from "next/og";
import { ogLogoDataUri } from "./og-logo";

// Edge runtime. Moving this to Node so the mark could be read from disk was
// tried and reverted: @vercel/og's Node build calls fileURLToPath on its own
// bundled assets and throws "Invalid URL" during prerender on Windows.
//
// The robustness problem this route had is fixed regardless — the mark is now
// an inlined data URI (app/og-logo.ts) instead of an HTTP fetch of the site's
// own /icon.png, which previously ran on every render, through the apex to www
// redirect, and silently produced a logo-less card whenever it failed.
export const runtime = "edge";
export const alt =
  "Corewell Systems — Business software that solves real operational problems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand OG card: warm off-white canvas, the node-C logo mark, ink wordmark,
// single teal accent — the Section 4 tokens, no gradients or clutter.
// The mark is read from the repo at build time. If it ever goes missing the
// card still renders, just without it.
export default function OpenGraphImage() {
  const logoSrc = ogLogoDataUri;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FAF9F6",
          fontFamily: "sans-serif",
        }}
      >
        {logoSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={logoSrc} alt="" width={120} height={120} />
        ) : (
          <div
            style={{
              width: "72px",
              height: "10px",
              borderRadius: "5px",
              backgroundColor: "#0F766E",
            }}
          />
        )}
        <div
          style={{
            marginTop: "36px",
            fontSize: "76px",
            fontWeight: 700,
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          Corewell Systems
        </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "34px",
            color: "#57534E",
            maxWidth: "900px",
            lineHeight: 1.35,
          }}
        >
          Business software that solves real operational problems.
        </div>
      </div>
    ),
    size
  );
}
