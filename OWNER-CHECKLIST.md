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
| ~~`CONSULT_TO_EMAIL`~~ | ✅ **Done** — info@corewellsystems.com, live-tested in production 2026-07-27. | — |
| ~~`CONSULT_FROM_EMAIL`~~ | ✅ **Done** — branded sender on the verified domain. | — |
| ~~`NEXT_PUBLIC_SITE_URL`~~ | ✅ **Done** — https://corewellsystems.com is the hardcoded fallback in `lib/site.ts`; only local dev overrides it. | — |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` *(optional)* | Enables Plausible analytics (script only renders when set). | plausible.io → add site |

After adding keys locally: restart `npm run dev`. On Vercel: Project →
Settings → Environment Variables, then redeploy.

## 2. Accounts / links to provide

- [x] **Verify corewellsystems.com in Resend** ✅ (2026-07-27) — form
      delivers to info@ with a branded sender; confirmed live in production.
      Aliases support@ and contact@ also active on the mailbox.
- [x] **Cal.com booking** ✅ (2026-07-27) — 30-minute consultation and
      15-minute quick call embedded on `/book-consultation`, with a direct
      link kept visible as a fallback. Handle: `corewell-systems-scv5vs`.
- [x] **Production domain purchased** — corewellsystems.com ✅ (2026-07-27).
      Still to do: add it to the Vercel project and point DNS (A/CNAME
      records at the registrar — keep registrar nameservers so the mailbox
      keeps working).
- [x] **Footer contact email** — info@corewellsystems.com wired ✅.
- [x] **Social links** ✅ (2026-07-27) — LinkedIn, Instagram, and Facebook
      wired into the footer, the Organization JSON-LD `sameAs`, and
      `llms.txt`.

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
- [x] **Google Search Console** ✅ (2026-07-27) — domain property verified
      via DNS TXT; sitemap submitted, Success, 31 pages discovered.
- [x] **Business email operational** ✅ (2026-07-27) — Google Business
      Profile created; Gmail (corewellsystems@gmail.com) fronts the
      info@ mailbox: Hostinger forwarder in (instant), send-as
      info@ via smtp.hostinger.com out (default sender). Full lead
      pipeline verified: form → Resend → info@ → Gmail.
- [ ] **Post-launch audit** — run Lighthouse + accessibility checks against
      the production domain (ask for this once the site is deployed).

*Maintained by the build assistant — updated as items clear.*
