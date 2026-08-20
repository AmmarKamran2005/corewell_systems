import type { Metadata } from "next";

/**
 * Per-page canonical URL and matching `og:url`.
 *
 * The root layout must NOT set `alternates`. App Router metadata is inherited
 * down the tree, so a canonical declared once in the layout propagates into
 * every child route — which previously made 39 of 41 built pages declare the
 * site root as their canonical, telling search engines the whole site was
 * duplicates of the homepage. Every page owns its canonical instead.
 *
 * Paths are root-relative and resolved against `metadataBase` (which derives
 * from `siteUrl` in lib/site.ts), so switching the canonical host stays a
 * one-line change in one file.
 */
export function canonical(
  path: string
): Pick<Metadata, "alternates" | "openGraph"> {
  const clean = path === "/" ? "/" : `/${path.replace(/^\/|\/$/g, "")}`;
  return {
    alternates: {
      canonical: clean,
      // The feed link rides along here rather than in the root layout, because
      // a page-level `alternates` replaces the layout's wholesale — declaring
      // it in the layout would silently drop it from every page that sets its
      // own canonical, which is all of them.
      types: { "application/rss+xml": "/insights/feed.xml" },
    },
    openGraph: { url: clean },
  };
}

/**
 * Serialise JSON-LD for injection into a <script> tag.
 *
 * `JSON.stringify` does not escape `<`, so a value containing "</script>"
 * would close the tag early and let the rest parse as HTML. Every input here
 * is currently repo-authored, so there is no live vulnerability — but the FAQ
 * graph is built from MDX frontmatter, which is exactly the path that could
 * change. `\u003c` is valid JSON and parses back to `<`, so validators see
 * identical structured data.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
