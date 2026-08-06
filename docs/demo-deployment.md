# Deploying the Corewell Trade demo

The public demo at `trade.corewellsystems.com` — Vercel for the app, Hostinger
for DNS. **Done**; this is kept as the record of how, and as the recipe for the
next demo.

| | |
|---|---|
| Repo | https://github.com/AmmarKamran2005/corewell-trade (public) |
| **Live** | **https://trade.corewellsystems.com** |
| Vercel URL | `corewelltrade.vercel.app` — still works, the subdomain is an alias |
| Host | Vercel (free Hobby tier is enough — it is a static-ish front end) |
| DNS | Stays at Hostinger |

**Current state:** deployed, on the branded subdomain, and linked from both the
main nav ("Demo") and the Retail demo page. Nothing outstanding.

> **Why not Hostinger hosting itself:** Corewell Trade is a Next.js app and
> needs a Node runtime. Hostinger's shared Web Hosting plans run PHP, so the
> app cannot run there. Hostinger keeps the domain and the DNS; Vercel runs
> the app. A Hostinger VPS would also work but costs money monthly and you
> would maintain Node, PM2, Nginx and the SSL renewal yourself.

---

## 1 · Deploy the app to Vercel

1. Sign in at [vercel.com](https://vercel.com) with the same GitHub account.
2. **Add New → Project**.
3. Find `corewell-trade` in the repository list → **Import**.
4. Leave everything at its default. Vercel detects Next.js, and the app needs
   no environment variables — there is no API or database behind it.
5. **Deploy**. It takes a couple of minutes and gives you a working URL like
   `corewell-trade-xxxx.vercel.app`.
6. Open that URL and check `/`, `/pos` and `/store` before going further.

Every later push to `main` redeploys automatically.

---

## 2 · Add the subdomain in Vercel

1. In the project: **Settings → Domains**.
2. Type `trade.corewellsystems.com` → **Add**.
3. Vercel now shows "Invalid Configuration" and tells you which DNS record to
   create. For a subdomain it asks for a **CNAME** pointing at
   `cname.vercel-dns.com`.

   Copy the exact target Vercel shows you — do not assume it, Vercel has
   changed this hostname before.

Leave this page open; you come back to it in step 4.

---

## 3 · Create the DNS record in Hostinger

1. Sign in to [hpanel.hostinger.com](https://hpanel.hostinger.com).
2. **Domains → corewellsystems.com → DNS / Nameservers**.
3. Under **Manage DNS records**, add a record:

   | Field | Value |
   |---|---|
   | Type | `CNAME` |
   | Name | `trade` |
   | Points to / Target | `cname.vercel-dns.com` (whatever Vercel showed) |
   | TTL | `3600` |

4. **Add Record** and save.

**If Hostinger will not let you add the subdomain**

The subdomain is not created under **Websites**; that section is for hosting a
separate site and will refuse if there is no hosting plan attached. What you
want is the **DNS zone editor** under **Domains → corewellsystems.com → DNS /
Nameservers**, which lets you add a CNAME regardless of where the site is
hosted. If that page shows a message about the domain using external
nameservers, the zone is being served elsewhere and the record has to be added
there instead — check where the nameservers actually point:

```bash
nslookup -type=ns corewellsystems.com
```

**Three things that go wrong here:**

- **Name is `trade`, not the full domain.** Hostinger appends
  `.corewellsystems.com` for you. Entering the full name gives you
  `trade.corewellsystems.com.corewellsystems.com`.
- **A conflicting record.** If a record already exists for `trade` (an A record,
  or a wildcard `*`), delete it first. Two records for the same name fight and
  DNS resolution becomes a coin toss.
- **Do not change the nameservers.** They must stay on Hostinger. The `info@`
  mailbox and the `support@` / `contact@` aliases run off Hostinger's MX
  records — moving nameservers to Vercel silently breaks email, and lead forms
  deliver into nothing.

---

## 4 · Let Vercel issue the certificate

1. Wait for DNS to propagate. Usually 5–30 minutes; occasionally a few hours.
   Check from your machine:

   ```bash
   nslookup trade.corewellsystems.com
   ```

   You want to see it resolving towards `vercel-dns.com`.

2. Back on the Vercel **Domains** page, press **Refresh**. It flips to **Valid
   Configuration** and issues an SSL certificate on its own — nothing to buy or
   upload.

3. Open `https://trade.corewellsystems.com`. Confirm the padlock, and that
   `/pos` and `/store` both load.

---

## 5 · Switch the link on the marketing site

The Retail demo page shows a link to the full system only when it knows the
URL, so the link cannot go live before the demo does.

1. Vercel → the **corewell_systems** project → **Settings → Environment
   Variables**.
2. Add, for the **Production** environment:

   | Key | Value |
   |---|---|
   | `NEXT_PUBLIC_DEMO_TRADE_URL` | only needed to point at a *different* URL — the subdomain is already the default in `lib/site.ts` |

3. **Deployments → ⋯ → Redeploy** on the latest production deployment.
   `NEXT_PUBLIC_*` values are baked in at build time, so a redeploy is required
   — restarting is not enough.
4. Visit `/industries/retail/demo`. A panel now sits above the built-in
   sandbox: *"Open the full system — Corewell Trade"*.

---

## 6 · Check afterwards

- `https://trade.corewellsystems.com/robots.txt` allows `/login` and disallows
  every application path. The sign-in page is meant to be found; the screens
  behind it carry invented customers and balances and must not be indexed.
  Confirm with `curl` that `/login` has no `noindex` meta tag and that
  `/dashboard`, `/pos` and `/store` all do.
- Send a test message through the contact form on corewellsystems.com and
  confirm it still arrives at `info@`. This proves the DNS edit left the mail
  records alone.

---

## If you would rather use a Hostinger VPS

Only worth it if you want everything under one bill.

1. hPanel → **VPS** → choose a plan → install **Ubuntu 22.04**.
2. SSH in, install Node 20+, then clone and build:

   ```bash
   git clone https://github.com/AmmarKamran2005/corewell-trade.git
   cd corewell-trade && npm ci && npm run build
   ```

3. Keep it alive with PM2: `npm i -g pm2 && pm2 start "npm start" --name trade`
   then `pm2 startup && pm2 save`.
4. Put Nginx in front, proxying port 80/443 to `localhost:3000`.
5. Certificate via `certbot --nginx -d trade.corewellsystems.com`.
6. DNS: an **A record** for `trade` pointing at the VPS IP, instead of the CNAME
   in step 3.

You then own the updates, the restarts and the certificate renewals. Vercel
does all three for nothing.
