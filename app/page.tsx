import { Hero } from "@/components/home/Hero";
import { IndustryMorph } from "@/components/home/IndustryMorph";
import { ProcessSection } from "@/components/home/ProcessSection";
import { DemoStrip } from "@/components/home/DemoStrip";
import { ProofSection } from "@/components/home/ProofSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaBand } from "@/components/home/CtaBand";
import { Testimonials } from "@/components/Testimonials";

// Home page section order per docs/spec.md Section 5. The former named-products
// strip is now the generic industry-demo strip (spec v2, Sections 1 + 6).
export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustryMorph />
      <ProcessSection />
      <DemoStrip />
      <ProofSection />
      {/* Renders only once real, permissioned quotes exist. */}
      <Testimonials />
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
