import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { contactEmail } from "@/lib/site";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  ...canonical("/privacy"),
  title: "Privacy",
  description:
    "What we collect when you contact us or use the assistant on this site, who it goes to, and how to ask us to remove it.",
};

/**
 * Plain-English privacy policy.
 *
 * Every factual statement here was checked against the code: the consultation
 * form posts to Resend and is stored nowhere, the assistant posts to Gemini
 * and is stored nowhere, and the only cookies on the site come from Google
 * Analytics. Keep it that way — if the data flows change, this page changes in
 * the same commit.
 *
 * Deliberately written the way the rest of the site is written: short
 * sentences, no legalese, nothing claimed that is not true. It is not a
 * substitute for legal review if the business ever needs one.
 */

const LAST_UPDATED = "20 August 2026";

const sections = [
  {
    heading: "The short version",
    body: [
      "We collect what you type into the consultation form or the assistant, and we use it to reply to you. We do not sell it, we do not use it for advertising, and we do not share it with anyone except the services that deliver it.",
      "If you want it removed, email us and we will remove it.",
    ],
  },
  {
    heading: "When you request a consultation",
    body: [
      "The form asks for your name, your email address and a description of the problem. Company, industry and budget range are optional.",
      "It reaches us as an email. We do not store it in a database on this website. We keep the email for as long as we are in contact with you, and for a reasonable period afterwards as a record of the conversation.",
    ],
  },
  {
    heading: "When you use the assistant",
    body: [
      "The messages you type are sent to Google's Gemini service so it can generate a reply. We do not record them.",
      "The conversation lives in your browser tab only. Close or refresh the page and it is gone.",
    ],
  },
  {
    heading: "When you book a call",
    body: [
      "The booking calendar on our consultation page is provided by Cal.com and is embedded in the page. What you enter into it goes to Cal.com directly, and is covered by their privacy policy as well as this one.",
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      "We use two analytics tools so we know which pages are useful.",
      "Plausible records aggregate page statistics only. It sets no cookies and collects no personal data.",
      "Google Analytics tells us more about how the site is used, and it does set cookies on your device. You can block or clear them in your browser at any time, and the site works normally without them. Most browsers also offer a global setting for this.",
      "We use no advertising cookies and we do not track you across other websites.",
    ],
  },
  {
    heading: "Who else receives data",
    body: [
      "Resend delivers the consultation form as email. Google provides the Gemini model behind the assistant and Google Analytics. Cal.com provides the booking calendar. Plausible provides cookieless analytics. Vercel hosts the site and keeps standard server logs.",
      "Each of them has its own privacy policy, and each only receives what it needs to do its job.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will deal with it promptly.",
      "You can also clear or block cookies in your browser, and use the site without them.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is for businesses. It is not directed at children and we do not knowingly collect information from them.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "If how we handle information changes, we will update this page and change the date at the top.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="pb-10 pt-16 sm:pt-24">
        <Container className="max-w-3xl">
          <Reveal mode="mount">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Privacy
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-soft">
              What we collect, why, and how to have it removed. In plain
              language, because a privacy policy nobody can read is not much of
              a policy.
            </p>
            <p className="mt-4 text-sm text-faint">
              Last updated {LAST_UPDATED}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 sm:pb-24">
        <Container className="max-w-3xl">
          <dl className="divide-y divide-line border-y border-line">
            {sections.map((section, index) => (
              <Reveal key={section.heading} delay={index * 0.03}>
                <div className="grid gap-3 py-8 lg:grid-cols-[14rem_1fr] lg:gap-x-10">
                  <dt className="text-base font-semibold text-ink-strong">
                    {section.heading}
                  </dt>
                  <dd className="space-y-4">
                    {section.body.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-sm leading-relaxed text-soft"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>

          <Reveal className="mt-10">
            <p className="text-sm leading-relaxed text-soft">
              Questions about any of this, or a request to remove your
              information:{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="font-medium text-accent hover:underline"
              >
                {contactEmail}
              </a>
              . Our{" "}
              <Link
                href="/terms"
                className="font-medium text-accent hover:underline"
              >
                terms of use
              </Link>{" "}
              cover how the rest of the site works.
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
