# KodeSparc Web

Product-experience website for KodeSparc Technologies. The project's source of
truth is [docs/spec.md](docs/spec.md) — read it before building anything.

## Status

**Phase 1 — Foundation** (spec Section 12): scaffold, design tokens, base
components, static Home page. No animation, CMS, demos, or AI widget yet.

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
