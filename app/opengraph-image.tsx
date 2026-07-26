import { ImageResponse } from "next/og";
import { siteUrl } from "@/lib/site";

export const runtime = "edge";
export const alt =
  "Corewell Systems — Business software that solves real operational problems";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand OG card: warm off-white canvas, the node-C logo mark, ink wordmark,
// single teal accent — the Section 4 tokens, no gradients or clutter.
// The mark is fetched from the site's own /icon.png at request time; if that
// ever fails, the card renders without it rather than erroring.
export default async function OpenGraphImage() {
  let logoSrc: string | null = null;
  try {
    const res = await fetch(`${siteUrl}/icon.png`);
    if (res.ok) {
      const buffer = await res.arrayBuffer();
      logoSrc = buffer as unknown as string; // satori accepts ArrayBuffer src
    }
  } catch {
    logoSrc = null;
  }

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
