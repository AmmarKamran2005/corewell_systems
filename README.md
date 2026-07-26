# Corewell Systems Web

Product-experience website for Corewell Systems. The project's source of truth
is [docs/spec.md](docs/spec.md) — read it before building anything.

## Status

**Phase 5 — Demo environments** (spec Section 12): sandboxed interactive
demos live for Healthcare and Hospitality at `/industries/[slug]/demo` —
quick-access roles (no credentials), seeded sample data
(`lib/demo/*`), role-based navigation, in-memory interactions, always-visible
"Interactive Demo — sample data" labeling (spec Section 6). Education and
Retail demos keep the honest coming-soon state until built. Case studies run
on sample data with a visible "Illustrative scenario" label (owner
direction). Brand name and regional claims confirmed by owner (2026-07).
Site speaks in company voice only — no founder identity, no named or linked
real products anywhere (spec Sections 1, 5, 6).

All copy marked `[PLACEHOLDER: …]` needs real content before launch. Per spec
Section 7, never replace a placeholder with an invented metric, client name, or
testimonial.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS with a custom design-token
layer (`app/globals.css` + `tailwind.config.ts`).

## Develop

```bash
npm install
npm run dev
```

## Git identity

This repo's local git identity is `Corewell Systems
<dev@corewellsystems.placeholder>` — a placeholder address. Replace it once a
real domain/inbox exists:

```bash
git config user.email "dev@<real-domain>"
```
