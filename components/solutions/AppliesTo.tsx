import Link from "next/link";
import { getIndustry, industryAccentStyle } from "@/lib/industries";

/**
 * Industry cross-links for a solution. Each card carries its own industry's
 * accent, so the row reads as a spectrum rather than five identical chips —
 * reusing the per-industry theming that runs through the rest of the site.
 */
export function AppliesTo({ slugs }: { slugs: string[] }) {
  const industries = slugs
    .map((slug) => getIndustry(slug))
    .filter((industry): industry is NonNullable<typeof industry> =>
      Boolean(industry)
    );

  if (industries.length === 0) return null;

  return (
    <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((industry) => (
        <li key={industry.slug}>
          <Link
            href={`/industries/${industry.slug}`}
            style={industryAccentStyle(industry)}
            className="group flex h-full items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors duration-150 hover:border-accent/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <span
              aria-hidden
              className="h-8 w-1 shrink-0 rounded-full bg-accent/70 transition-all duration-200 group-hover:bg-accent"
            />
            <span className="text-sm font-medium text-ink">
              {industry.name}
            </span>
            <span
              aria-hidden
              className="ml-auto text-sm text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            >
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
