import Link from "next/link";
import { Container } from "@/components/ui/Container";

const siteLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
];

const companyLinks = [
  { href: "/about", label: "About" },
  { href: "/pricing", label: "Pricing" },
  { href: "/book-consultation", label: "Book a Consultation" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas-subtle">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr]">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold tracking-display text-ink-strong">
              Corewell Systems
            </p>
            <p className="mt-3 text-sm leading-relaxed text-soft">
              We design and build business software that solves real
              operational problems.
            </p>
            <p className="mt-4 text-sm text-faint">
              [PLACEHOLDER: contact email + social links]
            </p>
          </div>

          <nav aria-label="Site">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              Company
            </p>
            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} Corewell Systems. All rights
            reserved. {/* Brand name confirmed final by owner 2026-07 */}
          </p>
        </div>
      </Container>
    </footer>
  );
}
