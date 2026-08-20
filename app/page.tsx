import type { Metadata } from "next";
import { canonical } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { IndustryMorph } from "@/components/home/IndustryMorph";
import { ProcessSection } from "@/components/home/ProcessSection";
import { DemoStrip } from "@/components/home/DemoStrip";
import { ProofSection } from "@/components/home/ProofSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaBand } from "@/components/home/CtaBand";
import { Testimonials } from "@/components/Testimonials";

// Title and description are inherited from the root layout's defaults; only the
// canonical is declared here, since the layout no longer sets one.
export const metadata: Metadata = {
  ...canonical("/"),
};

// Home page section order per docs/spec.md Section 5. The former named-products
// strip is now the generic industry-demo strip (spec v2, Sections 1 + 6).
export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustryMorph />
      {/*
        Demos and proof sit above process deliberately. The demos are this
        site's actual argument — open it and look — while a four-step process
        is the least differentiated section on any agency homepage. Backgrounds
        alternate canvas → surface → canvas → canvas-subtle → surface → canvas
        → ink, so no two adjacent sections share a ground.
      */}
      <DemoStrip />
      <ProofSection />
      <ProcessSection />
      {/* Renders only once real, permissioned quotes exist. */}
      <Testimonials />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
