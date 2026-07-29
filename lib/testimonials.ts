/**
 * Client testimonials.
 *
 * ⚠️ THIS ARRAY MUST ONLY EVER CONTAIN REAL, PERMISSIONED QUOTES.
 *
 * Spec Section 7 is explicit: never publish fabricated testimonials. It is
 * also the single easiest claim on a website to disprove — a prospect can
 * check a name against LinkedIn in ten seconds, and for a brand whose whole
 * argument is "we label what is real", being caught inventing one would
 * cost more than the section could ever earn.
 *
 * The section renders nothing while this array is empty, so the site is
 * never worse for the wait. When a client gives permission, add the entry
 * and it appears — no other change required.
 *
 * `attribution` may be anonymised to match the site's policy on client
 * names, e.g. "Practice manager, multi-site clinic". A real person must
 * have said it and agreed to it being published.
 */

export type Testimonial = {
  /** The client's own words. Do not edit for polish beyond trimming. */
  quote: string;
  /** Role and organisation type. Real name only with explicit permission. */
  attribution: string;
  /** Optional context, e.g. "Clinic management system". */
  context?: string;
};

export const testimonials: Testimonial[] = [
  // Empty by design. See the note above before adding anything here.
];
