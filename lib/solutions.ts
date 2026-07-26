/**
 * Solutions catalog — docs/spec.md Section 3 (IA) and Section 5.
 * Framed as capabilities, not tech stack. Names come from the spec; the
 * descriptive copy has not been provided yet and stays [PLACEHOLDER] —
 * do not draft it here (owner instruction, Phase 2 kickoff).
 */

export type Solution = {
  slug: string;
  name: string;
  /** [PLACEHOLDER] until the owner provides final copy. */
  oneLiner: string;
};

export const solutions: Solution[] = [
  {
    slug: "custom-software-development",
    name: "Custom Software Development",
    oneLiner:
      "[PLACEHOLDER: one line — the operational problem custom builds solve.]",
  },
  {
    slug: "saas-platforms",
    name: "SaaS Platforms",
    oneLiner: "[PLACEHOLDER: one line — outcome-focused, no tech jargon.]",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    oneLiner: "[PLACEHOLDER: one line — outcome-focused, no tech jargon.]",
  },
  {
    slug: "cloud-deployment",
    name: "Cloud & Deployment",
    oneLiner:
      "[PLACEHOLDER: one line — e.g. reliability/security outcome, per spec Section 13 voice table.]",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    oneLiner: "[PLACEHOLDER: one line — outcome-focused, no hype.]",
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
