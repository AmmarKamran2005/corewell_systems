# Owner Checklist — Everything Needed From You

Single source of truth for every key, link, and piece of content the site is
waiting on. The site runs fine without all of it — each missing item degrades
gracefully — but launch needs this list cleared.

## 1. API keys & environment values

Copy `.env.example` to `.env.local` (never commit `.env.local`), then fill in:

| Key | What it unlocks | Where to get it |
|---|---|---|
| ~~`GEMINI_API_KEY`~~ | ✅ **Received & tested locally** (2026-07-27) — add it in Vercel env vars + redeploy to go live. | — |
| `GEMINI_MODEL` *(optional)* | Model override. Defaults to `gemini-flash-latest` (auto-updating alias — pinned 2.5-era models are closed to this account). | — |
| ~~`RESEND_API_KEY`~~ | ✅ **Received & tested locally** (2026-07-27) — add it in Vercel env vars + redeploy. | — |
| `CONSULT_TO_EMAIL` | ⚠️ **Interim: kamran.ammar2005@gmail.com** — Resend only delivers to the account owner until the domain is verified. After verifying, switch to info@corewellsystems.com (Vercel + .env.local). | — |
| `CONSULT_FROM_EMAIL` *(optional)* | After domain verification: e.g. `Corewell Systems <forms@corewellsystems.com>`. Defaults to Resend's onboarding sender. | Resend → Domains |
| ~~`NEXT_PUBLIC_SITE_URL`~~ | ✅ **Done** — https://corewellsystems.com is the hardcoded fallback in `lib/site.ts`; only local dev overrides it. | — |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *(optional)* | Enables Plausible analytics (script only renders when set). | plausible.io → add site |

After adding keys locally: restart `npm run dev`. On Vercel: Project →
Settings → Environment Variables, then redeploy.

## 2. Accounts / links to provide

- [ ] **Verify corewellsystems.com in Resend** — resend.com/domains → Add
      Domain → add the DKIM/SPF records it shows at your registrar's DNS
      panel (same place as the Vercel records; touch nothing else). Unlocks
      delivery to info@ and a branded from-address.
- [ ] **Cal.com or Calendly booking link** — replaces the placeholder panel
      on `/book-consultation` so visitors can pick a time directly.
- [x] **Production domain purchased** — corewellsystems.com ✅ (2026-07-27).
      Still to do: add it to the Vercel project and point DNS (A/CNAME
      records at the registrar — keep registrar nameservers so the mailbox
      keeps working).
- [x] **Footer contact email** — info@corewellsystems.com wired ✅.
- [ ] **Social links** — for the footer and Organization JSON-LD `sameAs`.

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

- [x] **Git identity email** — now `info@corewellsystems.com` ✅
      (2026-07-27). Commits before this date carry earlier placeholder
      identities; say the word if you want history rewritten.
- [ ] **Post-launch audit** — run Lighthouse + accessibility checks against
      the production domain (ask for this once the site is deployed).

*Maintained by the build assistant — updated as items clear.*
