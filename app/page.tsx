import { Hero } from "@/components/home/Hero";
import { IndustryMorph } from "@/components/home/IndustryMorph";
import { ProcessSection } from "@/components/home/ProcessSection";
import { DemoStrip } from "@/components/home/DemoStrip";
import { ProofSection } from "@/components/home/ProofSection";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { CtaBand } from "@/components/home/CtaBand";

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
      <InsightsPreview />
      <CtaBand />
    </>
  );
}
