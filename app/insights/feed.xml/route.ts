import { getInsights } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/**
 * RSS 2.0 feed for the insights articles.
 *
 * Feed readers and aggregators are a third-party discovery surface the site
 * otherwise has none of, and it costs one route. Company voice only — no
 * author elements, per CONTEXT.md §2 rule 1.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const insights = getInsights();
  const updated = insights[0]?.updated ?? insights[0]?.date;

  const items = insights
    .map((insight) => {
      const url = `${siteUrl}/insights/${insight.slug}`;
      return `    <item>
      <title>${escapeXml(insight.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(insight.description)}</description>
      <pubDate>${new Date(insight.updated ?? insight.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Corewell Systems — Insights</title>
    <link>${siteUrl}/insights</link>
    <description>Straight answers about business software: costs, features, and build-vs-buy decisions for operational systems.</description>
    <language>en</language>
    ${updated ? `<lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>` : ""}
    <atom:link href="${siteUrl}/insights/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
