import Link from "next/link";
import { siteUrl } from "@/lib/site";
import { jsonLdScript } from "@/lib/seo";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail + BreadcrumbList schema.
 *
 * Two jobs: it gives every detail page the navigational context Google expects
 * on an interior URL, and it is free contextual internal linking on every page
 * — which is the cheapest partial fix for the site's link-density gap.
 *
 * The last crumb is the current page: rendered unlinked with aria-current, and
 * still included in the schema so the trail resolves to a full path.
 */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
          {trail.map((crumb, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-soft">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="font-medium text-accent hover:text-accent-strong"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
