"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logoMark from "@/app/c_logo-withoutbg.png";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

// No Products item — capability lives inside Industries (spec Section 3).
const navLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

/**
 * Sticky nav with scroll-aware shrink (spec Section 4 component inventory).
 * Condenses and gains a backdrop once the page scrolls past the hero's top edge.
 */
export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-200",
        scrolled
          ? "border-line bg-canvas/85 backdrop-blur-md"
          : "border-transparent bg-canvas"
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-14" : "h-20"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-display text-ink-strong"
          >
            <Image
              src={logoMark}
              alt=""
              width={30}
              height={30}
              priority
              className="rounded-md"
            />
            Corewell Systems
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/book-consultation" size="md">
              Book a Consultation
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              aria-hidden
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              {menuOpen ? (
                <path d="M4 4l12 12M16 4L4 16" />
              ) : (
                <path d="M3 5.5h14M3 10h14M3 14.5h14" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-line bg-canvas lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-base text-ink hover:bg-canvas-subtle"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 pt-3">
              <Button
                href="/book-consultation"
                className="w-full"
                onClick={() => setMenuOpen(false)}
              >
                Book a Consultation
              </Button>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
