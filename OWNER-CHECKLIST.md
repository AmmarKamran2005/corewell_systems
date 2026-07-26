# Owner Checklist — Everything Needed From You

Single source of truth for every key, link, and piece of content the site is
waiting on. The site runs fine without all of it — each missing item degrades
gracefully — but launch needs this list cleared.

## 1. API keys & environment values

Copy `.env.example` to `.env.local` (never commit `.env.local`), then fill in:

| Key | What it unlocks | Where to get it |
|---|---|---|
| `GEMINI_API_KEY` | Turns on the "Ask Our Software Architect" chat widget. Until set, the widget shows a polite unavailable message with the booking button. | Google AI Studio → API keys |
| `GEMINI_MODEL` *(optional)* | Model override. Defaults to `gemini-2.5-flash` if left empty. | — |
| `RESEND_API_KEY` | Turns on consultation-form email delivery. Until set, the form shows a "delivery being configured" fallback. | resend.com → API keys |
| `CONSULT_TO_EMAIL` | The inbox that receives consultation requests. | Your choice |
| `CONSULT_FROM_EMAIL` *(optional)* | Verified sender once you verify a domain in Resend. Defaults to Resend's onboarding sender. | Resend → Domains |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO metadata, sitemap, and social-share cards. Falls back to localhost until set. | Your production domain, e.g. `https://corewellsystems.com` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *(optional)* | Enables Plausible analytics (script only renders when set). | plausible.io → add site |

After adding keys locally: restart `npm run dev`. On Vercel: Project →
Settings → Environment Variables, then redeploy.

## 2. Accounts / links to provide

- [ ] **Cal.com or Calendly booking link** — replaces the placeholder panel
      on `/book-consultation` so visitors can pick a time directly.
- [ ] **Production domain purchased + pointed at Vercel** (SSL is automatic).
- [ ] **Footer contact email + social links** — currently a
      `[PLACEHOLDER]` in the footer; social URLs also feed the
      Organization JSON-LD `sameAs` for SEO.

## 3. Content still owed

- [ ] **Pricing sign-off** — `/pricing` shows indicative ranges drafted
      in-house: Starter $8k–$25k, Growth $25k–$80k, Enterprise scoped
      individually. Confirm or change before launch.
- [ ] **About page "How we think about software"** — 2–3 short paragraphs,
      company voice (marked `[PLACEHOLDER]` on `/about`).
- [ ] **Real anonymized case-study facts** — the three case studies run on
      sample data with a visible "Illustrative scenario" label. Provide real,
      non-identifying facts per study and the label comes off
      (`illustrative: false` in `content/case-studies/*.mdx`).
- [ ] **Industry problem narratives review** — drafted in-house under your
      "write at your own" license; skim `/industries/*` and flag anything
      you'd phrase differently.

## 4. Housekeeping

- [ ] **Git identity email** — commits use the placeholder
      `dev@corewellsystems.placeholder`. Once a real inbox exists:
      `git config user.email "dev@<real-domain>"`. The Phase 1 commit still
      bears the old pre-rename identity; say the word if you want history
      rewritten.
- [ ] **Post-launch audit** — run Lighthouse + accessibility checks against
      the production domain (ask for this once the site is deployed).

*Maintained by the build assistant — updated as items clear.*
