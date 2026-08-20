import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, clientIp } from "@/lib/rate-limit";

/**
 * Consultation-request delivery — spec Sections 5 + 11. Honeypot + rate
 * limiting; sends via Resend when RESEND_API_KEY + CONSULT_TO_EMAIL are
 * configured, otherwise returns 503 so the form can show its fallback.
 * Nothing is stored server-side.
 */

export const runtime = "nodejs";

const MAX_FIELD = 200;
const MAX_MESSAGE = 2000;

export async function POST(req: NextRequest) {
  if (!checkRateLimit(`consult:${clientIp(req.headers)}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const { name, email, company, industry, budget, message, website } =
    body as Record<string, unknown>;

  // Honeypot: real users never fill the hidden "website" field.
  if (typeof website === "string" && website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const str = (v: unknown, max: number) =>
    typeof v === "string" && v.trim().length > 0 && v.length <= max
      ? v.trim()
      : null;

  const cleanName = str(name, MAX_FIELD);
  const cleanEmail = str(email, MAX_FIELD);
  const cleanMessage = str(message, MAX_MESSAGE);
  if (
    !cleanName ||
    !cleanEmail ||
    !cleanMessage ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
  ) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONSULT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const lines = [
    `Name: ${cleanName}`,
    `Email: ${cleanEmail}`,
    `Company: ${str(company, MAX_FIELD) ?? "—"}`,
    `Industry: ${str(industry, MAX_FIELD) ?? "—"}`,
    `Budget band: ${str(budget, MAX_FIELD) ?? "—"}`,
    "",
    cleanMessage,
  ];

  const sent = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONSULT_FROM_EMAIL ??
        "Corewell Systems <onboarding@resend.dev>",
      to: [to],
      reply_to: cleanEmail,
      // Strip control characters from anything in a subject position. Resend
      // takes JSON and builds the MIME itself, so this is not an SMTP
      // header-injection vector — it is defence in depth, and it keeps the
      // subject on one line.
      subject: `Consultation request — ${cleanName.replace(/[\r\n]+/g, " ")}`,
      text: lines.join("\n"),
    }),
  }).catch(() => null);

  if (!sent || !sent.ok) {
    // A delivery failure used to lose the lead with no record anywhere. This
    // is not durable storage — it is the zero-dependency floor: the payload
    // lands in the platform's function logs, so a lost enquiry is at least
    // recoverable by hand. Durable capture (KV, a sheet, a second channel) is
    // an owner decision because it stores personal data.
    console.error(
      "[consult-request] delivery failed — lead recoverable from this log entry",
      {
        status: sent?.status ?? "network_error",
        name: cleanName,
        email: cleanEmail,
        company: str(company, MAX_FIELD),
        industry: str(industry, MAX_FIELD),
        budget: str(budget, MAX_FIELD),
        message: cleanMessage,
      }
    );
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
